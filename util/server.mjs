import http from 'http';
import path from 'path';
import {promisify} from 'util';
import {pipeline} from 'stream';

import fse from 'fs-extra';
import mime from 'mime-types';

const pipelineP = promisify(pipeline);

export class Server extends Object {
	constructor() {
		super();
		this.dir = '.';
		this.port = 5000;
		this.indexes = [
			'index.html',
			'index.htm'
		];
	}

	get base() {
		return `http://localhost:${this.port}/`;
	}

	getMime(file) {
		if (/\.asp$/i.test(file)) {
			return 'text/plain';
		}
		return mime.lookup(file) || 'application/octet-stream';
	}

	async dirContains(dir, name, isDir) {
		const list = await fse.readdir(dir);
		for (const n of list) {
			if (n === name) {
				const st = await fse.stat(path.join(dir, name));
				return st.isDirectory() === isDir;
			}
		}
		return false;
	}

	async resolve(url) {
		const {pathname} = new URL(url, this.base);
		const parts = pathname.split(/[\\/]/);
		const file = parts.pop();
		const dirs = parts.filter(s => s.length);
		let base = this.dir;
		for (const dir of dirs) {
			if (!await this.dirContains(base, dir, true)) {
				return null;
			}
			base = path.join(base, dir);
		}
		for (const f of file ? [file] : this.indexes) {
			if (await this.dirContains(base, f, false)) {
				return path.join(base, f);
			}
		}
		return null;
	}

	async request(req, res) {
		console.log(`< ${req.method}: ${req.url}`);
		const resolved = await this.resolve(req.url);
		if (!resolved) {
			console.log(`> 404: ${req.url}`);
			res.writeHead(404, {
				'Content-Type': 'text/html'
			});
			res.write('<html><body><h1>404</h1></body></html>');
			res.end();
			return;
		}
		const st = await fse.stat(resolved);
		const contentLength = st.size;
		console.log(`> 200: ${req.url}`);
		res.writeHead(200, {
			'Content-Type': this.getMime(resolved),
			'Content-Length': `${contentLength}`
		});
		await pipelineP(fse.createReadStream(resolved), res);
	}

	async run(started) {
		await new Promise(resolve => {
			const server = http.createServer((req, res) => {
				this.request(req, res).catch(err => {
					console.error(err);
					res.writeHead(500, {
						'Content-Type': 'text/html'
					});
					res.write('<html><body><h1>500</h1></body></html>');
					res.end();
				});
			});
			server.on('close', () => {
				resolve();
			});
			server.listen(this.port);
			started();
		});
	}
}
