import {mkdir, readFile, rename, stat, writeFile} from 'fs/promises';
import {createHash} from 'crypto';

function hash(data) {
	return createHash('sha256').update(data).digest('hex');
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
			(await readFile(this.path, this.encoding))
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

		const file = `${cacheDir}/${hash(data)}`;
		if (await stat(file).catch(() => null)) {
			return readFile(file);
		}

		await mkdir(cacheDir, {recursive: true});
		const d = Buffer.concat([data]);
		this.data(d);
		const tmp = `${file}.tmp`;
		await writeFile(tmp, d);
		await rename(tmp, file);
		return d;
	}
}
