#!/usr/bin/env node

import {mkdir, writeFile} from 'fs/promises';
import {dirname} from 'path';

import {support} from './support.mjs';

async function main() {
	const args = process.argv.slice(2);
	if (!args.length) {
		throw new Error('Arguments: outdir');
	}
	const [outdir] = args;
	for await (const [f, d] of support()) {
		const o = `${outdir}/${f}`;
		await mkdir(dirname(o), {recursive: true});
		await writeFile(o, d);
	}
}
main().catch(err => {
	console.error(err);
	process.exitCode = 1;
});
