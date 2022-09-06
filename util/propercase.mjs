import path from 'path';
import crypto from 'crypto';

import fse from 'fs-extra';

function hash(data) {
	return crypto
		.createHash('sha256')
		.update(data)
		.digest('hex')
		.toLowerCase();
}

export class Propercase extends Object {
	constructor(path, encoding = 'utf8') {
		super();
		this.path = path;
		this.encoding = encoding;
		this.cacheDir = null;
		this._map = null;
	}

	async init() {
		// Sorted shortest first, so shorter replaces are replaced by longer.
		// Skip lines that start with slash, a comment.
		this._map = new Map(
			(await fse.readFile(this.path, this.encoding))
				.split(/[\r\n]+/)
				.filter(s => s && !s.startsWith('/'))
				.sort((a, b) => a.length - b.length)
				.map(s => [s.toLowerCase(), s])
		);
	}

	name(str) {
		return this._map.get(str.toLowerCase()) || str;
	}

	data(data) {
		const {encoding} = this;

		// Make lowercase copy of the data to search.
		const dataLower = Buffer.concat([data]);
		for (let i = dataLower.length; i--;) {
			const b = dataLower[i];
			if (b <= 90 && b >= 65) {
				dataLower[i] += 32;
			}
		}

		// Search for matches and replace in original data.
		for (const [k, v] of this._map) {
			for (let i = 0; i < dataLower.length;) {
				i = dataLower.indexOf(k, i, encoding);
				if (i < 0) {
					break;
				}
				data.write(v, i, encoding);
				i += k.length;
			}
		}
	}

	async dataCached(data) {
		const {cacheDir} = this;
		if (!cacheDir) {
			throw new Error('Cache directory not set');
		}

		const file = path.join(cacheDir, hash(data));
		if (await fse.pathExists(file)) {
			return fse.readFile(file);
		}

		const d = Buffer.concat([data]);
		this.data(d);
		const tmp = `${file}.tmp`;
		await fse.outputFile(tmp, d);
		await fse.move(tmp, file);
		return d;
	}
}
