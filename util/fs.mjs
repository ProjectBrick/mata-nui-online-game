import {copyFile as cf, mkdir, readdir, rm, writeFile} from 'fs/promises';
import {dirname} from 'path';

export async function copyFile(src, dst) {
	await mkdir(dirname(dst), {recursive: true});
	await cf(src, dst);
}

export async function outputFile(file, data) {
	await mkdir(dirname(file), {recursive: true});
	await writeFile(file, data);
}

export async function remove(...paths) {
	await Promise.all(paths.map(p => rm(p, {recursive: true, force: true})));
}

export async function * files(dir, recurse = true, dots = false) {
	const o = {
		withFileTypes: true
	};
	const q = [''];
	while (q.length) {
		const d = q.shift();
		const dirs = [];
		const files = [];
		for (const e of await readdir(`${dir}/${d}`, o)) {
			if (!dots && e.name[0] === '.') {
				continue;
			}
			if (e.isFile()) {
				files.push(e.name);
			}
			else if (recurse && e.isDirectory()) {
				dirs.push(d ? `${d}/${e.name}` : e.name);
			}
		}
		for (const f of files.sort()) {
			const rel = d ? `${d}/${f}` : f;
			yield [`${dir}/${rel}`, rel, f];
		}
		for (const d of dirs.sort()) {
			q.push(d);
		}
	}
}
