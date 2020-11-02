(function() {
'use strict';

function each(list, itter) {
	for (var i = 0; i < list.length; i++) {
		itter(list[i], i);
	}
}

function keys(obj, itter) {
	for (var k in obj) {
		if (obj.hasOwnProperty(k)) {
			itter(k, obj[k]);
		}
	}
}

function stringTrim(str) {
	return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
}

function findClass(name, parent) {
	parent = parent || document;
	var r = [];
	if (parent.getElementsByClassName) {
		each(parent.getElementsByClassName(name), function(element) {
			r.push(element);
		});
	}
	else {
		each(parent.getElementsByTagName('*'), function(element) {
			var names = element.className.split(/\s+/);
			for (var i = names.length; i--;) {
				if (names[i] === name) {
					r.push(element);
					break;
				}
			}
		});
	}
	return r;
}

function onClick(element, callback) {
	if (element.addEventListener) {
		element.addEventListener('click', function(e) {
			callback(e.target);
		});
	}
	else {
		element.attachEvent('onclick', function() {
			callback(window.event.srcElement);
		});
	}
}

function documentHead() {
	return document.head || document.getElementsByTagName('head')[0];
}

function textContentSet(element, text) {
	element['textContent' in element ? 'textContent' : 'innerText'] = text;
}

function escapeHtml(s) {
	return s.replace(/[&'"<>]/g, function(c) {
		return '&#' + c.charCodeAt(0) + ';';
	});
}

function addQueryArg(url, key, value) {
	var parts = url.split('#');
	parts[0] += (parts[0].indexOf('?') < 0 ? '?' : '&') +
		encodeURIComponent(key) + '=' + encodeURIComponent(value);
	return parts.join('#');
}

function checkContentType(value, check) {
	return value ? value.split(';')[0].toLowerCase() === check : false;
}

function fscommandApi(id, prefix, methods) {
	var func = id + '_DoFSCommand';
	var script = document.createElement('script');
	if (script.attachEvent) {
		func += '_ie';
		script.setAttribute('for', id);
		script.setAttribute('event', 'FSCommand(a,b)');
		script.text = func + '(a,b)';
		documentHead().appendChild(script);
	}
	window[func] = function(name, value) {
		if (prefix === name.substr(0, prefix.length)) {
			methods[name.substr(prefix.length)](value);
		}
	};
}

function Api(url) {
	this.url = url;
}
Api.prototype.call = function(data, cb) {
	var self = this;
	var reallySent = false;

	// Check if a CORS AJAX request is possible.
	if (!(
		typeof XMLHttpRequest !== 'undefined' &&
		XMLHttpRequest &&
		'withCredentials' in (new XMLHttpRequest())
	)) {
		cb(new Error('CORS AJAX requests unsupported'), null);
		return;
	}

	function preflight(cb) {
		var xhr = new XMLHttpRequest();
		xhr.onerror = function() {
			cb(new Error('AJAX error'));
		};
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4) {
				cb(null);
			}
		};
		xhr.open('POST', self.url, true);
		xhr.send(null);
	}

	function send(cb) {
		var xhr = new XMLHttpRequest();
		var loaded = function() {
			var contentType = xhr.getResponseHeader('Content-Type');
			var json = checkContentType(contentType, 'application/json');
			var data = null;
			if (json) {
				try {
					data = JSON.parse(xhr.responseText);
				}
				catch (err) {
					cb(err, null);
					return;
				}
			}
			if (xhr.status !== 200) {
				var error = data ? data.error : null;
				var msg = 'Status: ' + xhr.status + (error ? ': ' + error : '');
				cb(new Error(msg), null);
				return;
			}
			if (!json) {
				cb(new Error('Unexpected content type: ' + contentType), null);
				return;
			}
			cb(null, data);
		};
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 2 || xhr.readyState === 3) {
				reallySent = true;
			}
			else if (xhr.readyState === 4) {
				loaded();
			}
		};
		xhr.onerror = function() {
			cb(new Error('AJAX error'), null);
		};
		xhr.open('POST', self.url, true);
		xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
		xhr.withCredentials = true;
		xhr.send(JSON.stringify(data));
	}

	// Try to send without preflight request.
	send(function(err, data) {
		// If the request was really sent or did not error, done now.
		if (reallySent || !err) {
			cb(err, data);
			return;
		}

		// Else retry with preflight first before resend.
		preflight(function(e) {
			// If preflight also failed, use the original error.
			if (e) {
				cb(err, data);
				return;
			}
			send(cb);
		});
	});
};
Api.prototype.callUser = function(cb) {
	this.call({
		type: 'user'
	}, cb);
};
Api.prototype.callGet = function(user, values, cb) {
	// User validated server-size, including prevents account-switch.
	this.call({
		type: 'get',
		user: user,
		data: values
	}, cb);
};
Api.prototype.callSet = function(user, values, cb) {
	// User validated server-size, including prevents account-switch.
	this.call({
		type: 'set',
		user: user,
		data: values
	}, cb);
};

function Saving(menu, element) {
	this.menu = menu;
	this.element = element;
	this.user = null;
	this.loginUrl = null;
	this.logoutUrl = null;
	this.lsPrefix = element.getAttribute('data-ls-prefix');
	this.apiPrefix = element.getAttribute('data-api-prefix');
	var apiUrl = element.getAttribute('data-api-url');
	this.api = apiUrl ? new Api(apiUrl) : null;
	var self = this;
	onClick(element, function(target) {
		var action = target.getAttribute('data-action');
		var method = action ? 'action' + action : null;
		if (method && self[method]) {
			self[method]();
		}
	});
}
Saving.prototype.show = function() {
	this.menu.activate(this);
	this.menu.setupSave(null);
};
Saving.prototype.setConnected = function(state) {
	this.element.className = this.element.className
		.replace(/data\-connected\-\S+/g, '') +
		' data-connected-' + state;
};
Saving.prototype.setupSavingLocal = function() {
	var prefix = this.lsPrefix;
	function prefixed(k) {
		return prefix + k;
	}
	if (typeof localStorage === 'undefined' || !localStorage) {
		this.menu.error(
			new Error('Local storage not supported'),
			'Cannot load or save your progress:'
		);
		return;
	}
	this.menu.setupSave({
		get: function(values, cb) {
			var e = null;
			var r = {};
			try {
				each(values, function(k) {
					r[k] = localStorage.getItem(prefixed(k)) || '';
				});
			}
			catch (err) {
				e = err;
				r = null;
			}
			cb(e, r);
		},
		set: function(values, cb) {
			var e = null;
			var r = {};
			try {
				keys(values, function(k, v) {
					localStorage.setItem(prefixed(k), v);
					if (localStorage.getItem(prefixed(k)) !== v) {
						throw new Error('Local storage set failed on: ' + k);
					}
				});
			}
			catch (err) {
				e = err;
				r = null;
			}
			cb(e, r);
		}
	});
};
Saving.prototype.actionSavingLocal = function() {
	this.setupSavingLocal();
	this.menu.player.init();
};
Saving.prototype.setupSavingUser = function() {
	var prefix = this.apiPrefix;
	function prefixed(k) {
		return prefix + k;
	}
	var self = this;
	this.menu.setupSave({
		get: function(values, cb) {
			var data = [];
			each(values, function(value) {
				data.push(prefixed(value));
			});
			self.api.callGet(self.user.id, data, function(err, data) {
				if (err) {
					cb(err, null);
					return;
				}
				var r = {};
				each(values, function(value) {
					r[value] = data.data[prefixed(value)] || '';
				});
				cb(null, r);
			});
		},
		set: function(values, cb) {
			var data = {};
			keys(values, function(k, v) {
				data[prefixed(k)] = v;
			});
			self.api.callSet(self.user.id, data, cb);
		}
	});
};
Saving.prototype.actionSavingUser = function() {
	this.setupSavingUser();
	this.menu.player.init();
};
Saving.prototype.actionLoginUser = function() {
	window.location = this.loginUrl;
};
Saving.prototype.actionLogout = function() {
	window.location = this.logoutUrl;
};
Saving.prototype.init = function() {
	this.user = null;
	this.loginUrl = null;
	this.logoutUrl = null;

	if (!this.api) {
		this.setupSavingLocal();
		this.menu.player.init();
		return;
	}

	this.setConnected('loading');
	this.show();
	var self = this;
	this.api.callUser(function(err, user) {
		if (err || !user) {
			self.setConnected('error');
			return;
		}
		self.user = user;

		if (user.guest) {
			self.loginUrl = addQueryArg(
				user.loginUrl,
				user.loginUrlRedirect,
				location.href
			);
			self.setConnected('guest');
			return;
		}

		self.logoutUrl = addQueryArg(
			user.logoutUrl,
			user.logoutUrlRedirect,
			location.href
		);

		var profile = findClass('profile', self.element)[0];
		profile.href = user.profile;
		findClass('avatar-img', profile)[0].src = user.avatar;
		textContentSet(findClass('name', profile)[0], user.name);
		self.setConnected('user');
	});
};

function Player(menu, element) {
	this.menu = menu;
	this.element = element;
	this.variablePrefix = element.getAttribute('data-variable-prefix');
	this.variableList = element.getAttribute('data-variable-list');
	this.swfcode = findClass('swfcode', element)[0].innerHTML;
	element.innerHTML = '';
}
Player.prototype.show = function() {
	this.menu.activate(this);
};
Player.prototype.getSwfCode = function(vars) {
	vars = vars || {};
	var varList = [];
	keys(vars, function(k, v) {
		varList.push(encodeURIComponent(k) + '=' + encodeURIComponent(v));
	});
	return this.swfcode.replace(/%FLASHVARS%/g, escapeHtml(varList.join('&')));
};
Player.prototype.init = function() {
	this.element.innerHTML = '';
	this.show();

	var prefix = this.variablePrefix;
	var variables = stringTrim(this.variableList).split(/\s+/);
	var self = this;

	// Use storage or a dummy shim if none.
	var storage = this.menu.storage || {
		get: function(_values, cb) {
			cb(null, null);
		},
		set: function(_values, cb) {
			cb(null);
		}
	};

	var fscApi = {};
	each(variables, function(name) {
		fscApi[name] = function(value) {
			var data = {};
			data[name] = value;
			storage.set(data, function(err) {
				if (err) {
					self.menu.error(err, 'Error saving progress:');
				}
			});
		}
	});
	fscommandApi('player', prefix, fscApi);

	storage.get(variables, function(err, value) {
		if (err) {
			self.menu.error(err, 'Error loading progress:');
		}
		var swfVars = {};
		if (value) {
			each(variables, function(name) {
				swfVars[prefix + name] = value[name];
			});
		}
		self.element.innerHTML = self.getSwfCode(swfVars);
	});
};

function Menu(element) {
	this.element = element;
	this.user = null;
	this.storage = null;
	this.saving = new Saving(this, findClass('saving', element)[0]);
	this.player = new Player(this, findClass('player', element)[0]);
}
Menu.prototype.error = function(err, intro) {
	intro = intro || 'Error';
	alert(intro + '\n\n' + (err ? err.message || err : err));
};
Menu.prototype.setupSave = function(storage) {
	this.storage = storage;
};
Menu.prototype.activate = function(to) {
	each(this.element.children, function(el) {
		el.style.display = el === to.element ? 'block' : '';
	});
};
Menu.prototype.init = function() {
	this.saving.init();
};

(new Menu(findClass('menu')[0])).init();

})();
