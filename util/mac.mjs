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
