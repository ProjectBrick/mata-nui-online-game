import path from 'path';
import {promisify} from 'util';

import fse from 'fs-extra';
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
	async each(each) {
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
		const zipfile = await promisify(yauzl.open)(this.path, {
			autoClose: false
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
	async each(each) {
		const zipfile = this._zipfile;
		const {base} = this;
		for (const entry of this._entries) {
			const {fileName} = entry;
			if (/[\\\/]$/.test(fileName)) {
				continue;
			}
			if (fileName.startsWith(base)) {
				await each({
					path: fileName.substr(base.length),
					read: async () => {
						const stream = await promisify(
							zipfile.openReadStream.bind(zipfile)
						)(entry);
						const datas = [];
						await new Promise((resolve, reject) => {
							stream.on('error', reject);
							stream.on('end', resolve);
							stream.on('data', data => {
								datas.push(data);
							});
						});
						return Buffer.concat(datas);
					}
				});
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
			const list = (await fse.readdir(`${this.path}/${dir}`, {
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
	async each(each) {
		for (const entry of this._entries) {
			if (entry.dirent.isFile()) {
				await each({
					path: entry.path,
					read: async () => fse.readFile(
						path.join(this.path, entry.path)
					)
				});
			}
			else if (entry.dirent.isDirectory()) {
				await each({
					path: `${entry.path}/`,
					read: null
				});
			}
		}
	}
}
