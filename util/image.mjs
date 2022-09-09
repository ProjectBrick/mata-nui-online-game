import {readdir, readFile} from 'fs/promises';

import {IconIco, IconIcns} from '@shockpkg/icon-encoder';

export async function readIco(iconset) {
	const ico = new IconIco();
	for (const data of await Promise.all([
		'256x256',
		'128x128',
		'64x64',
		'48x48',
		'32x32',
		'24x24',
		'16x16'
	].map(f => readFile(`${iconset}/${f}.png`)))) {
		ico.addFromPng(data);
	}
	return ico.encode();
}

export async function readIcns(iconset) {
	const icns = new IconIcns();
	icns.toc = true;
	for (const [types, data] of await Promise.all([
		[['ic12'], '32x32@2x'],
		[['ic07'], '128x128'],
		[['ic13'], '128x128@2x'],
		[['ic08'], '256x256'],
		[['ic04'], '16x16'],
		[['ic14'], '256x256@2x'],
		[['ic09'], '512x512'],
		[['ic05'], '32x32'],
		[['ic10'], '512x512@2x'],
		[['ic11'], '16x16@2x']
	].map(
		([t, f]) => readFile(`${iconset}/icon_${f}.png`).then(d => [t, d])
	))) {
		icns.addFromPng(data, types);
	}
	return icns.encode();
}
