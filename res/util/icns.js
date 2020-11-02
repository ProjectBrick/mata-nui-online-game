#!/usr/bin/env node

'use strict';

const {readFile, writeFile} = require('fs').promises;

// The same order as iconutil on macOS 10.14.
const icons = [
	['ic12', 'icon_32x32@2x.png'],
	['ic07', 'icon_128x128.png'],
	['ic13', 'icon_128x128@2x.png'],
	['ic08', 'icon_256x256.png'],
	['icp4', 'icon_16x16.png'],
	['ic14', 'icon_256x256@2x.png'],
	['ic09', 'icon_512x512.png'],
	['icp5', 'icon_32x32.png'],
	['ic10', 'icon_512x512@2x.png'],
	['ic11', 'icon_16x16@2x.png']
];

async function main() {
	const args = process.argv.slice(2);
	if (args.length < 2) {
		throw new Error('Required arguments: dir.iconset file.icns');
	}
	const [iconset, icns] = args;
	const head = Buffer.alloc(8);
	head.write('icns', 0);
	let size = 8;
	const pieces = [head];
	for (const [type, file] of icons) {
		const data = await readFile(`${iconset}/${file}`);
		const tagType = Buffer.alloc(4);
		tagType.write(type);
		const tagSize = Buffer.alloc(4);
		const tagSizeValue = data.length + 8;
		tagSize.writeUInt32BE(tagSizeValue, 0);
		pieces.push(tagType, tagSize, data);
		size += tagSizeValue;
	}
	head.writeUInt32BE(size, 4);
	await writeFile(icns, Buffer.concat(pieces, size));
}
main().catch(err => {
	process.exitCode = 1;
	console.error(err);
});
