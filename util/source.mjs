import {readFile, readdir} from 'node:fs/promises';

import yauzl from 'yauzl';

export class Source extends Object {
	constructor(path) {
		super();
		this.path = path;
	}
	async open() {
		throw new Error('Must subclass');
	}
	async close() {
		throw new Error('Must subclass');
	}
	* itter() {
		throw new Error('Must subclass');
	}
}

export class SourceZip extends Source {
	constructor(path, base) {
		super(path);
		this.base = base;
		this._zipfile = null;
		this._entries = null;
	}
	async open() {
		const zipfile = await new Promise((resolve, reject) => {
			yauzl.open(this.path, {autoClose: false}, (err, zipfile) => {
				if (err) {
					reject(err);
					return;
				}
				resolve(zipfile);
			});
		});
		const entries = [];
		await new Promise((resolve, reject) => {
			zipfile.on('error', reject);
			zipfile.on('end', resolve);
			zipfile.on('entry', entry => {
				entries.push(entry);
			});
		});
		this._zipfile = zipfile;
		this._entries = entries;
	}
	async close() {
		this._zipfile.close();
		this._zipfile = null;
		this._entries = null;
	}
	* itter() {
		const zipfile = this._zipfile;
		const {base} = this;
		for (const entry of this._entries) {
			const fileName = entry.fileName.replace(/\\/g, '/');
			if (!fileName.endsWith('/') && fileName.startsWith(base)) {
				yield [fileName.substr(base.length), async () => {
					const stream = await new Promise((resolve, reject) => {
						zipfile.openReadStream(entry, (err, stream) => {
							if (err) {
								reject(err);
								return;
							}
							resolve(stream);
						})
					});
					const datas = [];
					await new Promise((resolve, reject) => {
						stream.on('error', reject);
						stream.on('end', resolve);
						stream.on('data', data => {
							datas.push(data);
						});
					});
					return Buffer.concat(datas);
				}];
			}
		}
	}
}

export class SourceDir extends Source {
	constructor(path) {
		super(path);
		this._entries = null;
	}
	async open() {
		const entries = [];
		const dirs = [''];
		while (dirs.length) {
			const dir = dirs.shift();
			const list = (await readdir(`${this.path}/${dir}`, {
				withFileTypes: true
			})).sort((a, b) => {
				a = a.name;
				b = b.name;
				if (a < b) {
					return -1;
				}
				if (a > b) {
					return 1;
				}
				return 0;
			});
			for (const dirent of list) {
				const path = dir ? `${dir}/${dirent.name}` : dirent.name;
				entries.push({
					path,
					dirent
				});
				if (dirent.isDirectory()) {
					dirs.push(path);
				}
			}
		}
		this._entries = entries;
	}
	async close() {
		this._entries = null;
	}
	* itter() {
		for (const {path, dirent} of this._entries) {
			if (dirent.isFile()) {
				yield [path, async () => readFile(`${this.path}/${path}`)];
			}
		}
	}
}

export async function * readSources(sources) {
	await Promise.all(sources.map(s => s.open()));
	const m = new Map();
	for (const source of sources) {
		for (const [path, read] of source.itter()) {
			const id = path.toLowerCase();
			if (!m.has(id)) {
				m.set(id, [path, read]);
			}
		}
	}
	for (const id of [...m.keys()].sort()) {
		yield m.get(id);
	}
	await Promise.all(sources.map(s => s.close()));
}
