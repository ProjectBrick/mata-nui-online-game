import {createWriteStream} from 'fs';
import {readdir, mkdir, rm} from 'fs/promises';
import {dirname} from 'path';
import {promisify} from 'util';
import {pipeline} from 'stream';

import archiver from 'archiver';
import tar from 'tar';
import innosetup from 'innosetup';

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
	archive.finalize();
	await done;
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

export async function makeDmg(target, specification) {
	const {default: appdmg} = await import('appdmg');
	await rm(target, {force: true});
	await mkdir(dirname(target), {recursive: true});
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

export async function makeExe(iss, vars) {
	await new Promise((resolve, reject) => {
		innosetup(iss, {
			gui: false,
			verbose: false,
			...Object.fromEntries(
				Object.entries(vars).map(([k, v]) => ([`D${k}`, v]))
			)
		}, err => {
			if (err) {
				reject(err);
				return;
			}
			resolve();
		});
	})
}
