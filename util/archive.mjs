import {createWriteStream} from 'node:fs';
import {readdir, mkdir, rm} from 'node:fs/promises';
import {dirname} from 'node:path';
import {pipeline} from 'node:stream/promises';

import archiver from 'archiver';
import tar from 'tar';

export async function zip(target, source) {
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
	const done = pipeline(archive, createWriteStream(target));
	archive.directory(source, false);
	await Promise.all([archive.finalize(), done]);
}

export async function tgz(target, source) {
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
