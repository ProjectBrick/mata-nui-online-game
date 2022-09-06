import fse from 'fs-extra';
import {marked} from 'marked';

import {templateStrings} from './string.mjs';

export async function docs(src, dst, replace = []) {
	const template = await fse.readFile(`${src}/template.html`, 'utf8');
	await Promise.all(
		(await fse.readdir(src))
			.filter(f => /^[^\.].*\.md$/i.test(f))
			.map(f => fse.readFile(`${src}/${f}`, 'utf8').then(md => {
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
				return fse.writeFile(
					`${dst}/${f}`.replace(/\.md$/i, '.html'),
					html
				);
			}))
	);
}
