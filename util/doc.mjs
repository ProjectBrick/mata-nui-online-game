import {readdir, readFile, stat, writeFile} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';

import {marked} from 'marked';
import {gfmHeadingId} from 'marked-gfm-heading-id';

import {templateStrings} from './string.mjs';

async function readTokens(file) {
	const u = pathToFileURL(file);
	try {
		await stat(u);
	}
	catch (err) {
		if (err.code === 'ENOENT') {
			return [];
		}
		throw err;
	}
	return (await import(u)).default;
}

function firstHeader(body) {
	const m = body.match(/<h\d[^>]*>([\s\S]*?)<\/h\d>/);
	if (!m || !m[1]) {
		throw new Error('No title');
	}
	return m[1];
}

export async function docs(src, dst) {
	const template = await readFile(`${src}/template.html`, 'utf8');
	const tokens = await readTokens(`${src}/tokens.mjs`);
	const options = {
		gfm: true,
		breaks: true,
		smartypants: true
	};
	const ext = [gfmHeadingId({})];
	await Promise.all(
		(await readdir(src))
			.filter(f => /^[^\.].*\.md$/i.test(f))
			.sort()
			.map(f => readFile(`${src}/${f}`, 'utf8').then(md => {
				const body = marked.use(...ext)(md, options).trim();
				const title = firstHeader(body);
				return writeFile(
					`${dst}/${f}`.replace(/\.md$/i, '.html'),
					tokens.reduce(
						(html, [f, r]) => html.replaceAll(f, r),
						templateStrings(template, {
							title,
							body
						})
					)
				);
			}))
	);
}
