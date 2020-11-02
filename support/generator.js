'use strict';

const path = require('path');

const fse = require('fs-extra');
const fg = require('fast-glob');
const ejs = require('ejs');

const qa = require('./lib/qa');

const html = '.html';

function * enumerate(a, o = 0) {
	for (let i = 0; i < a.length; i++) {
		yield [i + o, a[i]];
	}
}

const route = {
	supportframe: (support = null) => {
		const p = support !== null ? `_${support}` : '';
		return `supportframe${p}${html}`;
	},
	globalnav: () => `globalnav${html}`,
	press: () => `press${html}`,
	supportnav: () => `supportnav${html}`,
	supportbottom: support => {
		const p = support !== null ? support : 1;
		return `supportbottom_${p}${html}`;
	},
	supportprint: support => {
		const p = support !== null ? support : 1;
		return `supportprint_${support}${html}`;
	},
	supportmain: (support, level = null, question = null, answer = null) => {
		const sup = support !== null ? support : 1;
		const p = [sup, level, question, answer].filter(v => v !== null);
		return `supportmain_${p.join('_')}${html}`;
	}
};

async function render(template, data = {}) {
	const tpl = path.join(__dirname, 'tpl', `${template}.ejs`);
	const d = {route, qa, ...data};
	const out = await ejs.renderFile(tpl, d, {async: true});
	return Buffer.from(out, 'utf8');
}

async function generateTpl(each) {
	for (const support of [null, 1, 2, 3, 4, 5, 7]) {
		await each(
			route.supportframe(support),
			await render('supportframe', {
				support
			})
		);
	}
	await each(
		route.globalnav(),
		await render('globalnav')
	);
	await each(
		route.press(),
		await render('press')
	);
	await each(
		route.supportnav(),
		await render('supportnav')
	);
	for (const support of [1, 2, 3, 4, 5, 7]) {
		await each(
			route.supportbottom(support),
			await render('supportbottom', {
				support
			})
		);
	}
	for (const support of [1, 2, 3, 4, 5]) {
		await each(
			route.supportprint(support),
			await render('supportprint', {
				support
			})
		);
	}
	for (const support of [1, 2, 3, 4, 5, 7]) {
		await each(
			route.supportmain(support),
			await render('supportmain', {
				support,
				level: null,
				question: null,
				answer: null
			})
		);
	}
	for (const [level, section] of enumerate(qa.sections, 1)) {
		const support = 2;
		await each(
			route.supportmain(support, level),
			await render('supportmain', {
				support,
				level,
				question: null,
				answer: null
			})
		);
		for (const [question, q] of enumerate(section.questions, 1)) {
			for (const [answer] of enumerate(q.answers, 1)) {
				await each(
					route.supportmain(support, level, question, answer),
					await render('supportmain', {
						support,
						level: level,
						question: question,
						answer: answer
					})
				);
			}
		}
	}
	await each(
		`index${html}`,
		await render('index')
	);
}

async function generateStatic(each) {
	const staticDir = path.join(__dirname, 'static');
	const files = await fg(['**/*'], {cwd: staticDir});
	for (const file of files) {
		await each(file, await fse.readFile(path.join(staticDir, file)));
	}
}

async function generate(each) {
	await generateTpl(each);
	await generateStatic(each);
}
exports.generate = generate;

async function main() {
	const args = process.argv.slice(2);
	if (!args.length) {
		throw new Error('Arguments: outdir');
	}
	const [outdir] = args;
	await generate(async (p, d) => {
		await fse.outputFile(path.join(outdir, p), d);
	});
}
if (!module.parent) {
	main().catch(err => {
		process.exitCode = 1;
		console.error(err);
	});
}
