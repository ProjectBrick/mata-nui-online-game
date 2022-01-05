'use strict';

const path = require('path');
const util = require('util');
const stream = require('stream');

const fse = require('fs-extra');
const {task} = require('gulp');
const slugify = require('slugify');
const Jimp = require('jimp');
const imageSize = require('image-size');
const marked = require('marked');
const archiver = require('archiver');
const tar = require('tar');
const innosetup = require('innosetup');
const {Manager} = require('@shockpkg/core');
const {
	Plist,
	ValueDict,
	ValueString,
	ValueBoolean
} = require('@shockpkg/plist-dom');
const {
	IconIco,
	IconIcns
} = require('@shockpkg/icon-encoder');
const {
	BundleWindows32,
	BundleMacApp,
	BundleLinux32,
	BundleLinux64,
	loader
} = require('@shockpkg/swf-projector');

const {Propercase} = require('./util/propercase');
const {
	SourceZip,
	SourceDir
} = require('./util/sources');
const {Server} = require('./util/server');
const swf = require('./util/swf');
const support = require('./support/generator');
const {
	version,
	author,
	copyright
} = require('./package.json');

const pipelineP = util.promisify(stream.pipeline);
const imageSizeP = util.promisify(imageSize);
const innosetupP = util.promisify(innosetup);

const appName = 'Mata Nui Online Game';
const appDomain = 'io.github.projectbrick.MataNuiOnlineGame';
const distName = slugify(`${appName} ${version}`);
const versionShort = version.split('.').slice(0, 2).join('.');
const serverPort = +process.env.SERVER_PORT;

// This was a Flash 4 game, and the maximum FPS in Flash Player 4 was 18.
// The FPS set in the SWF files is greater, leading to faster playback.
// http://www.macromedia.com/support/flash/releasenotes/player/releasenotes_player_5.htm
const correctFps = 18;

const sources = {
	'mod': () => new SourceDir(
		'mod'
	),
	'templar': () => new SourceZip(
		'original/templar/mnog.zip',
		'mnog/'
	),
	'lego-2001-03-15': () => new SourceZip(
		'original/lego/2001-03-15.zip',
		'2001-03-15/'
	),
	'lego-2002-02-20': () => new SourceZip(
		'original/lego/2002-02-20.zip',
		'2002-02-20/'
	),
	'lego-re-release-episodes': () => new SourceZip(
		'original/lego-re-release/episodes.zip',
		''
	)
};

async function shockpkgFile(pkg) {
	return (new Manager()).with(
		async manager => manager.packageInstallFile(pkg)
	);
}

function templateStrings(str, vars) {
	return str.replace(/\$\{([^\}]*?)\}/g, (_, p1) => {
		if (!vars.hasOwnProperty(p1)) {
			throw new Error(`Undefined template variable: ${p1}`);
		}
		return vars[p1];
	});
}

async function readIco(iconset) {
	const ico = new IconIco();
	for (const data of await Promise.all([
		'256x256',
		'128x128',
		'64x64',
		'48x48',
		'32x32',
		'24x24',
		'16x16'
	].map(f => fse.readFile(`${iconset}/${f}.png`)))) {
		ico.addFromPng(data);
	}
	return ico.encode();
}

async function readIcns(iconset) {
	const icns = new IconIcns();
	icns.toc = true;
	for (const [types, data] of await Promise.all([
		[['ic12'], '32x32@2x'],
		[['ic07'], '128x128'],
		[['ic13'], '128x128@2x'],
		[['ic08'], '256x256'],
		[['ic04'], '16x16'],
		[['ic14'], '256x256@2x'],
		[['ic09'], '512x512'],
		[['ic05'], '32x32'],
		[['ic10'], '512x512@2x'],
		[['ic11'], '16x16@2x']
	].map(
		([t, f]) => fse.readFile(`${iconset}/icon_${f}.png`).then(d => [t, d])
	))) {
		icns.addFromPng(data, types);
	}
	return icns.encode();
}

async function pngs2bmps(inDir, outDir) {
	await Promise.all((await fse.readdir(inDir))
		.filter(f => /^[^\.].*\.png$/i.test(f))
		.map(f => Jimp
			.read(`${inDir}/${f}`)
			.then(i => i.write(
				`${outDir}/${f}`.replace(/\.png$/i, '.bmp')
			))
		)
	);
}

async function readSources(order, each) {
	const propercase = new Propercase('propercase.txt');
	propercase.cacheDir = '.cache/propercase';
	await propercase.init();

	const ordered = order.map(id => ({
		id,
		source: sources[id]()
	}));
	for (const {source} of ordered) {
		await source.open();
	}

	const mapped = new Map();
	for (const {id, source} of ordered) {
		await source.each(async entry => {
			const p = entry.path.toLowerCase();
			if (p.endsWith('/') || mapped.has(p)) {
				return;
			}
			mapped.set(p, {
				source: id,
				path: propercase.name(entry.path),
				read: async () => {
					let data = await entry.read();
					if (/\.(swf|txt)$/i.test(p)) {
						data = await propercase.dataCached(data);
					}
					if (/\.swf$/i.test(p)) {
						swf.setFps(data, correctFps);
					}
					return data;
				}
			});
		});
	}
	for (const id of [...mapped.keys()].sort()) {
		await each(mapped.get(id));
	}

	for (const {source} of ordered) {
		await source.close();
	}
}

async function readSourcesFiltered(each) {
	const ignored = new Set([
		'border.jpg',
		'Launcher.swf',
		'Launcher-full.swf'
	]);
	const sources = [
		'mod',
		'templar',
		'lego-2001-03-15',
		'lego-2002-02-20',
		'lego-re-release-episodes'
	];
	await readSources(sources, async entry => {
		if (
			ignored.has(entry.path) ||
			!/^[^.][^\\/]+\.(swf|txt|bin|zip|jpe?g)$/i.test(entry.path)
		) {
			return;
		}
		await each(entry);
	});
}

async function addDocs(dir) {
	const template = await fse.readFile('docs/template.html', 'utf8');
	await Promise.all((await fse.readdir('docs'))
		.filter(f => /^[^\.].*\.md$/i.test(f))
		.map(f => fse.readFile(`docs/${f}`, 'utf8').then(src => {
			const body = marked(src, {
				gfm: true,
				breaks: true,
				smartypants: true
			}).trim();
			const title = (
				body.match(/<h\d[^>]*>([\s\S]*?)<\/h\d>/) || []
			)[1] || '';
			return fse.writeFile(
				`${dir}/${f}`.replace(/\.md$/i, '.html'),
				templateStrings(template, {
					title,
					body
				})
			);
		}))
	);
}

async function makeZip(target, source) {
	await fse.remove(target);
	await fse.ensureDir(path.dirname(target));
	const archive = archiver('zip', {
		zlib: {
			level: 9
		}
	});
	archive.on('warning', err => {
		archive.emit('error', err);
	});
	const done = pipelineP(archive, fse.createWriteStream(target));
	archive.directory(source, false);
	archive.finalize();
	await done;
}

async function makeTgz(target, source) {
	await fse.remove(target);
	await fse.ensureDir(path.dirname(target));
	await tar.create(
		{
			gzip: true,
			portable: true,
			file: target,
			cwd: source
		},
		(await fse.readdir(source)).sort()
	);
}

async function makeExe(target, source, id, name, file, exe) {
	await fse.remove(target);
	const res = `${target}.res`;
	const resIcon = `${res}/icon.ico`;
	const resHeaders = `${res}/headers`;
	const resSidebars = `${res}/sidebars`;
	await fse.remove(res);
	await Promise.all([
		readIco('res/inno-icon').then(d => fse.outputFile(resIcon, d)),
		pngs2bmps('res/inno-header', resHeaders),
		pngs2bmps('res/inno-sidebar', resSidebars),
	]);
	const vars = {
		Id: id,
		Name: name,
		NameFile: file,
		Version: version,
		Publisher: author,
		Copyright: copyright,
		License: 'LICENSE.txt',
		Icon: resIcon,
		WizardImageHeader: `${resHeaders}/*.bmp`,
		WizardImageSidebar: `${resSidebars}/*.bmp`,
		WizardImageAlphaFormat: 'none',
		ExeName: exe,
		OutDir: path.dirname(target),
		OutFile: path.basename(target).replace(/\.exe$/i, ''),
		Source: `${source}/*`,
		ArchitecturesInstallIn64BitMode: '',
		ArchitecturesAllowed: '',
		ReadMeName: `${name} - README`,
		ReadMeFile: 'README.html'
	};
	await innosetupP('innosetup.iss', {
		gui: false,
		verbose: false,
		...Object.fromEntries(
			Object.entries(vars).map(([k, v]) => ([`DVar${k}`, v]))
		)
	});
	await fse.remove(res);
}

async function makeDmg(target, specification) {
	const appdmg = require('appdmg');
	await fse.remove(target);
	await fse.ensureDir(path.dirname(target));
	await new Promise((resolve, reject) => {
		const dmg = appdmg({
			basepath: '.',
			target,
			specification
		});
		dmg.on('error', reject);
		dmg.on('finish', resolve);
	});
}

async function bundle(bundle, pkg, delay = false) {
	await bundle.withData(
		await shockpkgFile(pkg),
		loader(
			6,
			770,
			475,
			18,
			0x000000,
			'matanuionlinegame.swf',
			delay ? 18 / 2 : 0
		),
		async b => {
			await readSourcesFiltered(async entry => {
				await b.createResourceFile(entry.path, await entry.read());
			});
			await support.generate(async (path, data) => {
				await b.createResourceFile(`support/${path}`, data);
			});
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

async function createBundleMac(path) {
	const pkgInfo = 'APPL????';
	const infoPlist = new Plist(new ValueDict(new Map(Object.entries({
		CFBundleInfoDictionaryVersion: new ValueString('6.0'),
		CFBundleDevelopmentRegion: new ValueString('en-US'),
		CFBundleExecutable: new ValueString(''),
		CFBundleIconFile: new ValueString(''),
		CFBundleName: new ValueString(appName),
		NSHumanReadableCopyright: new ValueString(copyright),
		CFBundleGetInfoString: new ValueString(copyright),
		CFBundleIdentifier: new ValueString(appDomain),
		CFBundleVersion: new ValueString(version),
		CFBundleLongVersionString: new ValueString(version),
		CFBundleShortVersionString: new ValueString(versionShort),
		CFBundlePackageType: new ValueString(pkgInfo.substr(0, 4)),
		CFBundleSignature: new ValueString(pkgInfo.substr(4)),
		NSAppTransportSecurity: new ValueDict(new Map(Object.entries({
			NSAllowsArbitraryLoads: new ValueBoolean(true)
		}))),
		NSSupportsAutomaticGraphicsSwitching: new ValueBoolean(true),
		NSHighResolutionCapable: new ValueBoolean(true),
		CSResourcesFileMapped: new ValueBoolean(true),
		LSPrefersCarbon: new ValueString('YES'),
		NSAppleScriptEnabled: new ValueString('YES'),
		NSMainNibFile: new ValueString('MainMenu'),
		NSPrincipalClass: new ValueString('NSApplication')
	}))));

	const bundle = new BundleMacApp(path);
	const {projector} = bundle;
	projector.binaryName = appName;
	projector.pkgInfoData = pkgInfo;
	projector.infoPlistDocument = infoPlist;
	projector.iconData = await readIcns('res/app-icon-mac.iconset');
	projector.patchWindowTitle = appName;
	projector.removeInfoPlistStrings = true;
	projector.removeCodeSignature = true;
	return bundle;
}

async function createBundleWindows(path) {
	const file = path.split(/[/\\]/).pop();
	const fileName = file.replace(/\.exe$/i, '');
	const versionStrings = {
		FileVersion: version,
		ProductVersion: versionShort,
		CompanyName: author,
		FileDescription: appName,
		LegalCopyright: copyright,
		ProductName: appName,
		LegalTrademarks: '',
		OriginalFilename: file,
		InternalName: fileName,
		Comments: ''
	};

	const bundle = new BundleWindows32(path);
	const {projector} = bundle;
	projector.versionStrings = versionStrings;
	projector.iconData = await readIco('res/app-icon-windows');
	projector.patchWindowTitle = appName;
	projector.removeCodeSignature = true;
	return bundle;
}

async function createBundleLinux32(path) {
	const bundle = new BundleLinux32(path);
	const {projector} = bundle;
	projector.patchProjectorPath = true;
	projector.patchWindowTitle = appName;
	return bundle;
}

async function createBundleLinux64(path) {
	const bundle = new BundleLinux64(path);
	const {projector} = bundle;
	projector.patchProjectorPath = true;
	projector.patchProjectorOffset = true;
	projector.patchWindowTitle = appName;
	return bundle;
}

async function buildBrowser(dir, nested) {
	const dest = `build/${dir}`;
	const destData = nested ? `${dest}/data` : dest;
	await fse.remove(dest);
	await readSourcesFiltered(async entry => {
		const data = await entry.read();
		await fse.outputFile(`${destData}/${entry.path}`, data);
	});
	await support.generate(async (path, data) => {
		await fse.outputFile(`${destData}/support/${path}`, data);
	});
	await Promise.all([
		'matanuionlinegame.swf',
		'matanuionlinegame-30fps.swf',
		'main.js',
		'main.css'
	].map(f => fse.copy(`src/browser/${f}`, `${destData}/${f}`)));
	await Promise.all([
		'init.swf',
		'overlay.swf'
	].map(f => fse.copy(`src/shared/${f}`, `${destData}/${f}`)));
	const defaultPrefix = 'matanuionlinegame.';
	await fse.outputFile(`${destData}/index.html`, templateStrings(
		await fse.readFile('src/browser/index.html', 'utf8'),
		{
			LS_PREFIX: process.env.MNOG_LS_PREFIX || defaultPrefix,
			API_PREFIX: process.env.MNOG_API_PREFIX || defaultPrefix,
			API_URL: process.env.MNOG_API_URL || '',
			API_NAME: process.env.MNOG_API_NAME || '',
			API_LINK: process.env.MNOG_API_LINK || ''
		}
	));
	if (nested) {
		await fse.outputFile(
			`${dest}/${appName}.html`,
			'<meta http-equiv="refresh" content="0;url=data/index.html">\n'
		);
	}
	await addDocs(dest);
}

async function buildWindows(dir, pkg) {
	const dest = `build/${dir}`;
	await fse.remove(dest);
	await bundle(await createBundleWindows(`${dest}/${appName}.exe`), pkg);
	await addDocs(dest);
}

async function buildMac(dir, pkg) {
	const dest = `build/${dir}`;
	await fse.remove(dest);
	await bundle(await createBundleMac(`${dest}/${appName}.app`), pkg);
	await addDocs(dest);
}

async function buildLinux32(dir, pkg) {
	const dest = `build/${dir}`;
	await fse.remove(dest);
	await bundle(await createBundleLinux32(`${dest}/${appName}`), pkg, true);
	await addDocs(dest);
}

async function buildLinux64(dir, pkg) {
	const dest = `build/${dir}`;
	await fse.remove(dest);
	await bundle(await createBundleLinux64(`${dest}/${appName}`), pkg, true);
	await addDocs(dest);
}

async function server(dir) {
	const server = new Server();
	server.dir = dir;
	if (serverPort) {
		server.port = serverPort;
	}
	await server.run(() => {
		console.log(`Server running at: ${server.base}`);
	});
}

task('clean', async () => {
	await fse.remove('.cache');
	await fse.remove('build');
	await fse.remove('dist');
});

task('build:pages', async () => {
	await buildBrowser('pages', false);
});

task('build:browser', async () => {
	await buildBrowser('browser', true);
});

task('build:windows', async () => {
	await buildWindows(
		'windows',
		'flash-player-32.0.0.465-windows-sa-debug'
	);
});

task('build:mac', async () => {
	// Release versions on Mac have slow performance when resized larger.
	// Debug versions do not have this performance issue.
	await buildMac(
		'mac',
		'flash-player-32.0.0.465-mac-sa-debug-zip'
	);
});

task('build:linux-i386', async () => {
	await buildLinux32(
		'linux-i386',
		'flash-player-11.2.202.644-linux-i386-sa-debug'
	);
});

task('build:linux-x86_64', async () => {
	await buildLinux64(
		'linux-x86_64',
		'flash-player-32.0.0.465-linux-x86_64-sa-debug'
	);
});

task('dist:browser:zip', async () => {
	await makeZip(`dist/${distName}-Browser.zip`, 'build/browser');
});

task('dist:browser:tgz', async () => {
	await makeTgz(`dist/${distName}-Browser.tgz`, 'build/browser');
});

task('dist:windows:zip', async () => {
	await makeZip(`dist/${distName}-Windows.zip`, 'build/windows');
});

task('dist:windows:exe', async () => {
	const name = `${distName}-Windows`;
	await makeExe(
		`dist/${name}.exe`,
		'build/windows',
		appDomain,
		appName,
		appName,
		`${appName}.exe`
	);
});

task('dist:mac:tgz', async () => {
	await makeTgz(`dist/${distName}-Mac.tgz`, 'build/mac');
});

task('dist:mac:dmg', async () => {
	const background = 'res/dmg-background/dmg-background.png';
	const {width, height} = await imageSizeP(background);
	const output = `dist/${distName}-Mac.dmg`;
	const icon = `${output}.icns`;
	await fse.outputFile(icon, await readIcns('res/dmg-icon.iconset'));
	await makeDmg(output, {
		format: 'UDBZ',
		title: appName,
		'icon-size': 128,
		icon,
		background,
		window: {
			size: {
				width,
				height
			}
		},
		contents: [
			{
				x: (width / 2) - 160,
				y: 108,
				type: 'file',
				path: `build/mac/${appName}.app`
			},
			{
				x: (width / 2) + 160,
				y: 108,
				type: 'link',
				path: '/Applications'
			},
			{
				x: (width / 2),
				y: 364,
				type: 'file',
				path: 'build/mac/README.html'
			}
		]
	});
	await fse.remove(icon);
});

task('dist:linux-i386:tgz', async () => {
	await makeTgz(`dist/${distName}-Linux-i386.tgz`, 'build/linux-i386');
});

task('dist:linux-x86_64:tgz', async () => {
	await makeTgz(`dist/${distName}-Linux-x86_64.tgz`, 'build/linux-x86_64');
});

task('run:browser', async () => {
	await server('build/browser/data');
});
