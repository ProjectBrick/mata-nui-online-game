import {fileURLToPath} from 'url';
import {dirname} from 'path';
import {readdir, readFile} from 'fs/promises';

import ejs from 'ejs';

import qa from './lib/qa.mjs';

const basedir = dirname(fileURLToPath(import.meta.url));

function * enumerate(a, o = 0) {
	for (let i = 0; i < a.length; i++) {
		yield [i + o, a[i]];
	}
}

const route = {
	supportframe: (support = null) => {
		const p = support !== null ? `_${support}` : '';
		return `supportframe${p}.html`;
	},
	globalnav: () => 'globalnav.html',
	press: () => 'press.html',
	supportnav: () => 'supportnav.html',
	supportbottom: support => {
		const p = support !== null ? support : 1;
		return `supportbottom_${p}.html`;
	},
	supportprint: support => `supportprint_${support}.html`,
	supportmain: (support, level = null, question = null, answer = null) => {
		const sup = support !== null ? support : 1;
		const p = [sup, level, question, answer].filter(v => v !== null);
		return `supportmain_${p.join('_')}.html`;
	}
};

async function render(template, data = {}) {
	const tpl = `${basedir}/tpl/${template}.ejs`;
	const d = {route, qa, ...data};
	const out = await ejs.renderFile(tpl, d, {async: true});
	return Buffer.from(out, 'utf8');
}

async function * generateTpl() {
	for (const support of [null, 1, 2, 3, 4, 5, 7]) {
		yield [route.supportframe(support), await render('supportframe', {
			support
		})];
	}
	yield [route.globalnav(), await render('globalnav')];
	yield [route.press(), await render('press')];
	yield [route.supportnav(), await render('supportnav')];
	for (const support of [1, 2, 3, 4, 5, 7]) {
		yield [route.supportbottom(support), await render('supportbottom', {
			support
		})];
	}
	for (const support of [1, 2, 3, 4, 5]) {
		yield [route.supportprint(support), await render('supportprint', {
			support
		})];
	}
	for (const support of [1, 2, 3, 4, 5, 7]) {
		yield [route.supportmain(support), await render('supportmain', {
			support,
			level: null,
			question: null,
			answer: null
		})];
	}
	for (const [level, section] of enumerate(qa.sections, 1)) {
		const support = 2;
		yield [route.supportmain(support, level), await render('supportmain', {
			support,
			level,
			question: null,
			answer: null
		})];
		for (const [question, q] of enumerate(section.questions, 1)) {
			for (const [answer] of enumerate(q.answers, 1)) {
				yield [
					route.supportmain(support, level, question, answer),
					await render('supportmain', {
						support,
						level: level,
						question: question,
						answer: answer
					})
				];
			}
		}
	}
	yield ['index.html', await render('index')];
}

async function * generateStatic() {
	const staticDir = `${basedir}/static`;
	const o = {withFileTypes: true};
	const q = [''];
	const files = [];
	while (q.length) {
		const d = q.shift();
		const dir = d ? `${staticDir}/${d}` : staticDir;
		for (const e of await readdir(dir, o)) {
			if (e.name.startsWith('.')) {
				continue;
			}
			const p = d ? `${d}/${e.name}` : e.name;
			if (e.isDirectory()) {
				q.push(p);
				continue;
			}
			files.push(p);
		}
	}
	files.sort();
	for (const file of files) {
		yield [file, await readFile(`${staticDir}/${file}`)];
	}
}

export async function * support() {
	for await (const e of generateTpl()) {
		yield e;
	}
	for await (const e of generateStatic()) {
		yield e;
	}
}
