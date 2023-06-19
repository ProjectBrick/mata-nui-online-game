import {createRequire} from 'module';
import {createWriteStream} from 'fs';
import {readdir, mkdir, rm} from 'fs/promises';
import {basename, dirname} from 'path';
import {promisify} from 'util';
import {pipeline} from 'stream';
import {spawn} from 'child_process';

import archiver from 'archiver';
import tar from 'tar';

const pipe = promisify(pipeline);

export async function makeZip(target, source) {
	await rm(target, {force: true});
	await mkdir(dirname(target), {recursive: true});
	const archive = archiver('zip', {
		zlib: {
			level: 9
		}
	});
	archive.on('warning', err => {
		archive.emit('error', err);
	});
	const done = pipe(archive, createWriteStream(target));
	archive.directory(source, false);
	await Promise.all([archive.finalize(), done]);
}

export async function makeTgz(target, source) {
	await rm(target, {force: true});
	await mkdir(dirname(target), {recursive: true});
	await tar.create(
		{
			gzip: true,
			portable: true,
			file: target,
			cwd: source
		},
		(await readdir(source)).sort()
	);
}

export async function makeDmg(
	target,
	title,
	icon,
	background,
	size,
	iconSize,
	contents
) {
	await rm(target, {force: true});
	const {default: appdmg} = await import('appdmg');
	await mkdir(dirname(target), {recursive: true});
	await new Promise((resolve, reject) => {
		const dmg = appdmg({
			basepath: '.',
			target,
			specification: {
				format: 'UDBZ',
				title,
				'icon-size': iconSize,
				icon,
				background,
				window: {
					size: {
						width: size[0],
						height: size[1]
					}
				},
				contents: contents.map(([x, y, type, path]) => ({
					x: (size[0] / 2) + x,
					y: (size[1] / 2) + y,
					type,
					path
				}))
			}
		});
		dmg.on('error', reject);
		dmg.on('finish', resolve);
	});
}

function createIss(config) {
	return '\ufeff' + Object.entries(config).map(([s, p]) => {
		const rows = Array.isArray(p) ?
			p.map(o => Object.entries(o).map(a => a.join(': ')).join('; ')) :
			Object.entries(p).map(a => a.join('='));
		return `[${s}]\n${rows.join('\n')}\n`;
	}).join('\n');
}

export async function makeExe(
	target,
	arch,
	id,
	name,
	file,
	version,
	publisher,
	copyright,
	license,
	icon,
	header,
	sidebar,
	source,
	icons
) {
	const _ = (tpl, ...vars) => {
		const p = [tpl[0]];
		for (let i = 1; i < tpl.length; i++) {
			p.push(String(vars[i - 1]).replace(/["{]/g, s => s + s), tpl[i]);
		}
		return `"${p.join('')}"`;
	};
	const __ = s => s.replace(/[%,|}]/g, encodeURIComponent);
	const ___ = s => __(s.replaceAll('&', '&&'));
	await rm(target, {force: true});
	const iss = createIss({
		Setup: {
			AppId: _`${id}`,
			AppName: _`${name}`,
			AppVersion: _`${version}`,
			VersionInfoVersion: _`${version}`,
			AppPublisher: _`${publisher}`,
			AppCopyright: _`${copyright}`,
			DefaultDirName: _`{autopf}\\${file}`,
			DefaultGroupName: _`${file}`,
			AllowNoIcons: _`yes`,
			LicenseFile: _`${license}`,
			SetupIconFile: _`${icon}`,
			WizardSmallImageFile: _`${header}`,
			WizardImageFile: _`${sidebar}`,
			WizardImageAlphaFormat: _`none`,
			PrivilegesRequiredOverridesAllowed: _`dialog`,
			OutputDir: _`${dirname(target)}`,
			OutputBaseFilename: _`${basename(target).replace(/\.exe$/i, '')}`,
			Compression: _`lzma`,
			SolidCompression: _`yes`,
			WizardStyle: _`modern`,
			UninstallDisplayIcon: _`{uninstallexe}`,
			ArchitecturesInstallIn64BitMode: _`${arch}`,
			ArchitecturesAllowed: _`${arch}`
		},
		Languages: [
			{
				Name: _`english`,
				MessagesFile: _`compiler:Default.isl`
			}
		],
		Tasks: [
			{
				Name: _`desktopicon`,
				Description: _`{cm:CreateDesktopIcon}`,
				GroupDescription: _`{cm:AdditionalIcons}`
			}
		],
		Files: [
			{
				Source: _`${source}`,
				DestDir: _`{app}`,
				Flags: 'ignoreversion recursesubdirs createallsubdirs'
			}
		],
		Icons: [
			...icons.map(([file, name]) => ({
				Name: _`{group}\\${name}`,
				Filename: _`{app}\\${file}`
			})),
			...icons.filter(a => a[2]).map(([file, name]) => ({
				Name: _`{autodesktop}\\${name}`,
				Filename: _`{app}\\${file}`,
				Tasks: 'desktopicon'
			})),
			{
				Name: _`{group}\\{cm:UninstallProgram,${__(file)}}`,
				Filename: _`{uninstallexe}`
			}
		],
		Run: icons.filter(a => a[3]).map(([file, name]) => ({
			Filename: _`{app}\\${file}`,
			Description: _`{cm:LaunchProgram,${___(name)}}`,
			Flags: 'nowait postinstall skipifsilent'
		}))
	});
	const require = createRequire(import.meta.url);
	const argv = /^win/.test(process.platform) ? [] : ['wine'];
	const iscc = require.resolve('innosetup/bin/ISCC.exe');
	argv.push(iscc);
	argv.push('/q');
	argv.push('-');
	await new Promise((resolve, reject) => {
		const p = spawn(argv[0], argv.slice(1));
		const stderr = [];
		p.stderr.on('data', data => {
			stderr.push(data);
		});
		p.on('exit', code => {
			if (code) {
				const err = Buffer.concat(stderr).toString('utf8').trim();
				reject(new Error(`${basename(iscc)}: ${code}: ${err}`));
				return;
			}
			resolve();
		});
		p.stdin.end(Buffer.from(iss));
	});
}
