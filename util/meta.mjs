import {readFile} from 'node:fs/promises';

import {filename, slugify} from './string.mjs';

const pkg = JSON.parse(
	await readFile(new URL('../package.json', import.meta.url), 'utf8')
);

export const appName = pkg.appName;
export const appDomain = pkg.appDomain;
export const version = pkg.version;
export const author = pkg.author;
export const copyright = pkg.copyright;
export const appFile = filename(appName);
export const appDmgTitle = filename(pkg.appDmgTitle || appName);
export const versionShort = version.split('.').slice(0, 2).join('.');
export const distName = slugify(`${appName}-${version}`);
