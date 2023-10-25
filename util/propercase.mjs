import {mkdir, readFile, rename, writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';

function hash(data) {
	return createHash('sha256').update(data).digest('hex');
}

export class Propercase extends Object {
	constructor(path, cacheDir = null) {
		super();
		this.path = path;
		this._cacheDir = cacheDir;
		this._map = null;
	}

	async init() {
		// Sorted shortest first, so shorter replaces are replaced by longer.
		// Skip lines that start with slash, a comment.
		this._map = new Map(
			(await readFile(this.path, 'ascii'))
				.split(/[\r\n]+/)
				.filter(s => s && !s.startsWith('/'))
				.sort((a, b) => a.length - b.length)
				.map(s => [s.toLowerCase(), s])
		);

		const cacheDir = this._cacheDir;
		if (cacheDir) {
			await mkdir(cacheDir, {recursive: true});
		}
	}

	name(str) {
		return this._map.get(str.toLowerCase()) || str;
	}

	data(data) {
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
				i = dataLower.indexOf(k, i, 'ascii');
				if (i < 0) {
					break;
				}
				data.write(v, i, 'ascii');
				i += k.length;
			}
		}
	}

	async dataCached(data) {
		const cacheDir = this._cacheDir;
		if (!cacheDir) {
			throw new Error('No cache dir set');
		}

		const file = `${cacheDir}/${hash(data)}`;
		try {
			return await readFile(file);
		}
		catch (err) {
			if (err.code !== 'ENOENT') {
				throw err;
			}
		}

		const d = Buffer.concat([data]);
		this.data(d);
		const tmp = `${file}.tmp`;
		await writeFile(tmp, d);
		await rename(tmp, file);
		return d;
	}

	static async init(path, cacheDir = null) {
		const r = new Propercase(path, cacheDir);
		await r.init();
		return r;
	}
}
