import {mkdir, rm} from 'node:fs/promises';
import {dirname} from 'node:path';
import {spawn} from 'node:child_process';

export const isMac = process.platform === 'darwin';

export async function codesign(app, identity = '-') {
	const argv = ['codesign', '-f', '-s', identity, app];
	await new Promise((resolve, reject) => {
		const p = spawn(argv[0], argv.slice(1));
		const stderr = [];
		p.stderr.on('data', data => {
			stderr.push(data);
		});
		p.on('exit', code => {
			if (code) {
				const err = Buffer.concat(stderr).toString('utf8').trim();
				reject(new Error(`${argv[0]}: ${code}: ${err}`));
				return;
			}
			resolve();
		});
	});
}

export async function dmg(
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
