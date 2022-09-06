#!/usr/bin/env node

import path from 'path';

import fse from 'fs-extra';

import {generate} from './generator.mjs';

async function main() {
	const args = process.argv.slice(2);
	if (!args.length) {
		throw new Error('Arguments: outdir');
	}
	const [outdir] = args;
	await generate(async (p, d) => {
		await fse.outputFile(path.join(outdir, p), d);
	});
}
main().catch(err => {
	process.exitCode = 1;
	console.error(err);
});
