import path from 'path';
import util from 'util';
import stream from 'stream';

import fse from 'fs-extra';
import archiver from 'archiver';
import tar from 'tar';
import _innosetup from 'innosetup';

const pipeline = util.promisify(stream.pipeline);
const innosetup = util.promisify(_innosetup);

export async function makeZip(target, source) {
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
	const done = pipeline(archive, fse.createWriteStream(target));
	archive.directory(source, false);
	archive.finalize();
	await done;
}

export async function makeTgz(target, source) {
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

export async function makeDmg(target, specification) {
	const {default: appdmg} = await import('appdmg');
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

export async function makeExe(iss, vars) {
	await innosetup(iss, {
		gui: false,
		verbose: false,
		...Object.fromEntries(
			Object.entries(vars).map(([k, v]) => ([`D${k}`, v]))
		)
	});
}
