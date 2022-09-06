export function templateStrings(str, vars) {
	return str.replace(/\$\{([^\}]*?)\}/g, (_, p1) => {
		if (!vars.hasOwnProperty(p1)) {
			throw new Error(`Undefined template variable: ${p1}`);
		}
		return vars[p1];
	});
}

export function filename(str) {
	return str
		.replace(/: /g, ' - ')
		.replace(/[^a-z0-9 ._-]+/ig, '-')
		.replace(/^[ -]+/, '')
		.replace(/[ -]+$/, '');
}

export function slugify(str) {
	return str
		.replace(/[^a-z0-9._]+/ig, '-')
		.replace(/^-+/, '')
		.replace(/-+$/, '');
}
