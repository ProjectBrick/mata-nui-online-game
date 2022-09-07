function findFps(data) {
	const sig = data.toString('ascii', 0, 3);
	if (sig !== 'FWS') {
		throw new Error(`Unexpected SWF signature: ${JSON.stringify(sig)}`);
	}
	const rectOff = 8;
	const rectDimBits = data.readUInt8(rectOff) >> 3;
	const rectBytes = Math.ceil(((rectDimBits * 4) + 5) / 8);
	return rectOff + rectBytes
}

export function getFps(data, fps) {
	return data.readUInt16BE(findFps(data));
}

export function setFps(data, fps) {
	data.writeUInt16BE(fps, findFps(data));
}
