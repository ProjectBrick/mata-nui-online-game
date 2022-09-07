import {readdir, readFile, writeFile} from 'fs/promises';

import {marked} from 'marked';

import {templateStrings} from './string.mjs';

export async function docs(src, dst, replace = []) {
	const template = await readFile(`${src}/template.html`, 'utf8');
	await Promise.all(
		(await readdir(src))
			.filter(f => /^[^\.].*\.md$/i.test(f))
			.map(f => readFile(`${src}/${f}`, 'utf8').then(md => {
				const body = marked(md, {
					gfm: true,
					breaks: true,
					smartypants: true
				}).trim();
				const title = (
					body.match(/<h\d[^>]*>([\s\S]*?)<\/h\d>/) || []
				)[1] || '';
				let html = templateStrings(template, {
					title,
					body
				});
				for (const [f, r] of replace) {
					html = html.replace(f, r);
				}
				return writeFile(
					`${dst}/${f}`.replace(/\.md$/i, '.html'),
					html
				);
			}))
	);
}
