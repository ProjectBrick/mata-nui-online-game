import {readFile} from 'fs/promises';

import {Manager} from '@shockpkg/core';
import {
	Plist,
	ValueDict,
	ValueString,
	ValueBoolean
} from '@shockpkg/plist-dom';
import {
	BundleWindows32,
	BundleMacApp,
	BundleLinux32,
	BundleLinux64,
	loader
} from '@shockpkg/swf-projector';

import {
	appName,
	appDomain,
	version,
	author,
	copyright,
	appFile,
	appDmgTitle,
	versionShort,
	distName
} from './util/meta.mjs';
import {docs} from './util/doc.mjs';
import {makeZip, makeTgz, makeExe, makeDmg} from './util/dist.mjs';
import {copyFile, outputFile, remove} from './util/fs.mjs';
import {templateStrings} from './util/string.mjs';
import {Propercase} from './util/propercase.mjs';
import {SourceZip, SourceDir, readSources} from './util/source.mjs';
import {flash4FpsCap, setFps} from './util/fps.mjs';
import {support} from './support/support.mjs';

async function * resources() {
	const pc = await Propercase.init('propercase.txt', '.cache/propercase');
	for await (const [file, read] of readSources([
		new SourceDir('mod'),
		new SourceZip('original/templar/mnog.zip', 'mnog/'),
		new SourceZip('original/lego/2001-03-15.zip', '2001-03-15/'),
		new SourceZip('original/lego/2002-02-20.zip', '2002-02-20/'),
		new SourceZip('original/lego-re-release/episodes.zip', '')
	])) {
		if (
			!/^(border\.jpg|Launcher(-full)?\.swf)$/i.test(file) &&
			/^[^.][^\\/]+\.(swf|txt|bin|zip|jpe?g)$/i.test(file)
		) {
			let data = await read();
			if (/\.(swf|txt)$/i.test(file)) {
				data = await pc.dataCached(data);
			}
			if (/\.swf$/i.test(file)) {
				setFps(data, flash4FpsCap);
			}
			yield [pc.name(file), data];
		}
	}
	for await (const [file, data] of support()) {
		yield [`support/${file}`, data];
	}
}

async function bundle(bundle, pkg, delay = false) {
	const swfv = 6;
	const [w, h] = [770, 475];
	const fps = 18;
	const bg = 0x000000;
	const url = 'matanuionlinegame.swf';
	await bundle.withData(
		await (new Manager()).with(m => m.packageInstallFile(pkg)),
		loader(swfv, w, h, fps, bg, url, delay ? Math.round(fps / 2) : 0),
		async b => {
			for await (const [file, data] of resources()) {
				await b.createResourceFile(file, data);
			}
			await b.copyResourceFile(
				'matanuionlinegame.swf',
				'src/projector/matanuionlinegame.swf'
			);
			await b.copyResourceFile(
				'matanuionlinegame-30fps.swf',
				'src/projector/matanuionlinegame-30fps.swf'
			);
			await b.copyResourceFile(
				'init.swf',
				'src/shared/init.swf'
			);
			await b.copyResourceFile(
				'overlay.swf',
				'src/shared/overlay.swf'
			);
		}
	);
}

async function browser(dest) {
	for await (const [file, data] of resources()) {
		await outputFile(`${dest}/${file}`, data);
	}
	await Promise.all([
		'matanuionlinegame.swf',
		'matanuionlinegame-30fps.swf',
		'main.js',
		'main.css'
	].map(f => copyFile(`src/browser/${f}`, `${dest}/${f}`)));
	await Promise.all([
		'init.swf',
		'overlay.swf'
	].map(f => copyFile(`src/shared/${f}`, `${dest}/${f}`)));
	const defaultPrefix = 'matanuionlinegame.';
	await outputFile(`${dest}/index.html`, templateStrings(
		await readFile('src/browser/index.html', 'utf8'),
		{
			LS_PREFIX: process.env.MNOG_LS_PREFIX || defaultPrefix,
			API_PREFIX: process.env.MNOG_API_PREFIX || defaultPrefix,
			API_URL: process.env.MNOG_API_URL || '',
			API_NAME: process.env.MNOG_API_NAME || '',
			API_LINK: process.env.MNOG_API_LINK || ''
		}
	));
}

const task = {};

task['clean'] = async () => {
	await remove('.cache', 'build', 'dist');
};

task['build:pages'] = async () => {
	const dest = 'build/pages';
	await remove(dest);
	await browser(dest);
	await docs('docs', dest);
};

task['build:browser'] = async () => {
	const dest = 'build/browser';
	await remove(dest);
	await browser(`${dest}/data`);
	await outputFile(
		`${dest}/${appFile}.html`,
		'<meta http-equiv="refresh" content="0;url=data/index.html">\n'
	);
	await docs('docs', dest);
};

task['build:windows'] = async () => {
	const dest = 'build/windows';
	await remove(dest);
	const file = `${appFile}.exe`;
	const b = new BundleWindows32(`${dest}/${file}`);
	b.projector.versionStrings = {
		FileVersion: version,
		ProductVersion: versionShort,
		CompanyName: author,
		FileDescription: appName,
		LegalCopyright: copyright,
		ProductName: appName,
		LegalTrademarks: '',
		OriginalFilename: file,
		InternalName: appFile,
		Comments: ''
	};
	b.projector.iconFile = 'res/app-icon-windows.ico';
	b.projector.patchWindowTitle = appName;
	b.projector.removeCodeSignature = true;
	await bundle(b, 'flash-player-32.0.0.465-windows-sa-debug');
	await docs('docs', dest);
};

task['build:mac'] = async () => {
	// Release projectors on Mac have slow performance when resized larger.
	// Debug projectors do not have this performance issue.
	const dest = 'build/mac';
	await remove(dest);
	const pkgInfo = 'APPL????';
	const b = new BundleMacApp(`${dest}/${appFile}.app`);
	b.projector.binaryName = appFile;
	b.projector.pkgInfoData = pkgInfo;
	b.projector.infoPlistData = (new Plist(new ValueDict(new Map([
		['CFBundleInfoDictionaryVersion', new ValueString('6.0')],
		['CFBundleDevelopmentRegion', new ValueString('en-US')],
		['CFBundleExecutable', new ValueString('')],
		['CFBundleIconFile', new ValueString('')],
		['CFBundleName', new ValueString(appName)],
		['NSHumanReadableCopyright', new ValueString(copyright)],
		['CFBundleGetInfoString', new ValueString(copyright)],
		['CFBundleIdentifier', new ValueString(appDomain)],
		['CFBundleVersion', new ValueString(version)],
		['CFBundleLongVersionString', new ValueString(version)],
		['CFBundleShortVersionString', new ValueString(versionShort)],
		['CFBundlePackageType', new ValueString(pkgInfo.substring(0, 4))],
		['CFBundleSignature', new ValueString(pkgInfo.substring(4))],
		['NSAppTransportSecurity', new ValueDict(new Map([
			['NSAllowsArbitraryLoads', new ValueBoolean(true)]
		]))],
		['NSSupportsAutomaticGraphicsSwitching', new ValueBoolean(true)],
		['NSHighResolutionCapable', new ValueBoolean(true)],
		['CSResourcesFileMapped', new ValueBoolean(true)],
		['LSPrefersCarbon', new ValueString('YES')],
		['NSAppleScriptEnabled', new ValueString('YES')],
		['NSMainNibFile', new ValueString('MainMenu')],
		['NSPrincipalClass', new ValueString('NSApplication')]
	])))).toXml();
	b.projector.iconFile = 'res/app-icon-mac.icns';
	b.projector.patchWindowTitle = appName;
	b.projector.removeInfoPlistStrings = true;
	b.projector.removeCodeSignature = true;
	await bundle(b, 'flash-player-32.0.0.465-mac-sa-debug-zip');
	await docs('docs', dest);
};

task['build:linux-i386'] = async () => {
	const dest = 'build/linux-i386';
	await remove(dest);
	const b = new BundleLinux32(`${dest}/${appFile}`);
	b.projector.patchProjectorPath = true;
	b.projector.patchWindowTitle = appName;
	await bundle(b, 'flash-player-11.2.202.644-linux-i386-sa-debug', true);
	await docs('docs', dest);
};

task['build:linux-x86_64'] = async () => {
	const dest = 'build/linux-x86_64';
	await remove(dest);
	const b = new BundleLinux64(`${dest}/${appFile}`);
	b.projector.patchProjectorPath = true;
	b.projector.patchProjectorOffset = true;
	b.projector.patchWindowTitle = appName;
	await bundle(b, 'flash-player-32.0.0.465-linux-x86_64-sa-debug', true);
	await docs('docs', dest);
};

task['dist:browser:zip'] = async () => {
	await makeZip(`dist/${distName}-Browser.zip`, 'build/browser');
};

task['dist:browser:tgz'] = async () => {
	await makeTgz(`dist/${distName}-Browser.tgz`, 'build/browser');
};

task['dist:windows:zip'] = async () => {
	await makeZip(`dist/${distName}-Windows.zip`, 'build/windows');
};

task['dist:windows:exe'] = async () => {
	const outDir = 'dist';
	const outFile = `${distName}-Windows`;
	await remove(`${outDir}/${outFile}.exe`);
	await makeExe('innosetup.iss', {
		VarId: appDomain,
		VarName: appName,
		VarNameFile: appFile,
		VarVersion: version,
		VarPublisher: author,
		VarCopyright: copyright,
		VarLicense: 'LICENSE.txt',
		VarIcon: 'res/inno-icon.ico',
		VarWizardImageHeader: 'res/inno-header/*.bmp',
		VarWizardImageSidebar: 'res/inno-sidebar/*.bmp',
		VarWizardImageAlphaFormat: 'none',
		VarExeName: `${appFile}.exe`,
		VarOutDir: outDir,
		VarOutFile: outFile,
		VarSource: 'build/windows/*',
		VarArchitecturesInstallIn64BitMode: '',
		VarArchitecturesAllowed: '',
		VarReadMeName: `${appFile} - README`,
		VarReadMeFile: 'README.html'
	});
};

task['dist:mac:tgz'] = async () => {
	await makeTgz(`dist/${distName}-Mac.tgz`, 'build/mac');
};

task['dist:mac:dmg'] = async () => {
	await makeDmg(
		`dist/${distName}-Mac.dmg`,
		appDmgTitle,
		'res/dmg-icon.icns',
		'res/dmg-background/dmg-background.png',
		[640, 512],
		128,
		[
			[160, 108, 'file', `build/mac/${appFile}.app`],
			[480, 108, 'link', '/Applications'],
			[320, 364, 'file', 'build/mac/README.html']
		]
	);
};

task['dist:linux-i386:tgz'] = async () => {
	await makeTgz(`dist/${distName}-Linux-i386.tgz`, 'build/linux-i386');
};

task['dist:linux-x86_64:tgz'] = async () => {
	await makeTgz(`dist/${distName}-Linux-x86_64.tgz`, 'build/linux-x86_64');
};

await task[process.argv[2]]();
