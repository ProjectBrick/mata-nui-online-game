// No closure scope, lost when called from SWF<6, this keyword is fine.

// Utility functions.
_level0.__matanui.util = {_: _level0.__matanui};
_level0.__matanui.util._whitespace = [];
_level0.__matanui.util._whitespace[0] = true;
_level0.__matanui.util._whitespace[9] = true;
_level0.__matanui.util._whitespace[0xA] = true;
_level0.__matanui.util._whitespace[0xD] = true;
_level0.__matanui.util._whitespace[0x20] = true;
_level0.__matanui.util.trimStart = function(s) {
	var w = this._whitespace;
	var i = 0;
	for (; i < s.length && w[s.charCodeAt(i)]; i++);
	return s.substr(i);
};
_level0.__matanui.util.trimEnd = function(s) {
	var w = this._whitespace;
	var i = s.length;
	for (; i > 0 && w[s.charCodeAt(i - 1)]; i--);
	return s.substr(0, i);
};
_level0.__matanui.util.trim = function(s) {
	return this.trimEnd(this.trimStart(s));
};
_level0.__matanui.util.truthy = function(v) {
	return typeof(v) == "string" ? !!v.length : !!v;
};
_level0.__matanui.util.encodeQuery = function(s) {
	var r = "";
	for (var i = 0; i < s.length; i++) {
		var c = s.charCodeAt(i);
		if (
			(97 <= c && c <= 122) ||
			(65 <= c && c <= 90) ||
			(48 <= c && c <= 57) ||
			(c == 33) ||
			(39 <= c && c <= 42) ||
			(45 <= c && c <= 46) ||
			(c == 95) ||
			(c == 126)
		) {
			r += s.charAt(i);
		}
		else {
			r += "%" + (c <= 0xF ? "0" : "") + c.toString(16).toUpperCase();
		}
	}
	return r;
};
_level0.__matanui.util.fscommand = function(k, v) {
	// FSCommand function calls compile to getURL.
	getURL("FSCommand:" + k, v);
};

// Save variable settings API.
_level0.__matanui.save = {_: _level0.__matanui};
_level0.__matanui.save._prefix = "matanui_";
_level0.__matanui.save._lso = function() {
	// Get fresh each use, avoids stale object issues.
	return SharedObject.getLocal("mata-nui-online-game", "/");
};
_level0.__matanui.save._settings = [];
_level0.__matanui.save._setting = function(key, clean) {
	var r = {
		_: this,
		_key: key,
		_clean: clean,
		_value: this._.LSO ?
			this._lso().data[key] :
			_level0[this._prefix + key],
		get: function() {
			return this._._.util.truthy(this._value) ?
				this._value :
				this._clean;
		},
		set: function(value) {
			this._value = value;
			if (this._._.LSO) {
				var so = this._._lso();
				so.data[this._key] = value;
				so.flush();
			}
			else {
				this._._.util.fscommand(this._._prefix + this._key, value);
			}
		},
		clear: function() {
			this.set(this._clean);
		},
		clean: function() {
			return this._clean;
		}
	};
	this._settings.push([key, r]);
	return r;
};
_level0.__matanui.save.query = function() {
	var params = [];
	for (var i = 0; i < this._settings.length; i++) {
		var setting = this._settings[i];
		params.push(
			this._.util.encodeQuery(this._prefix + setting[0]) +
			"=" +
			this._.util.encodeQuery(setting[1].get())
		);
	}
	return params.join("&");
};
// Date from LEGO offline and Templar online releases.
_level0.__matanui.save.date = _level0.__matanui.save._setting(
	"date",
	"1007406064"
);
_level0.__matanui.save.language = _level0.__matanui.save._setting(
	"language",
	"eng"
);
_level0.__matanui.save.fps = _level0.__matanui.save._setting(
	"fps",
	"18"
);
_level0.__matanui.save.state = _level0.__matanui.save._setting(
	"state",
	"&nostate=1&"
);

// API use in the game files.
_level0.__matanui.getdate = function(holder) {
	holder.ServerBasedDate = this.save.date.get();
};
_level0.__matanui.getlanguage = function(holder) {
	holder.Language = this.save.language.get();
};
_level0.__matanui.getstate = function(holder) {
	var params = this.save.state.get().split("&");
	for (var i = 0; i < params.length; i++) {
		var param = params[i].split("=");
		holder[param[0]] = param[1];
	}
};
_level0.__matanui.setstate = function(holder) {
	var value = "&";
	for (var p in holder) {
		var v = holder[p];
		value += p + "=" + (typeof(v) == "undefined" ? "" : v) + "&";
	}
	this.save.state.set(value);
};

// General functions.
_level0.__matanui.setClipboard = function(str) {
	System.setClipboard(str);
};
_level0.__matanui.toggleFullscreen = function() {
	// Stage property more reliable than FSCommand:fullscreen.
	Stage.displayState = (Stage.displayState == "normal") ?
		"fullScreen" :
		"normal";
};
_level0.__matanui.reload = function() {
	loadMovie("player.swf", "_level1");
};
_level0.__matanui.reinit = function() {
	var url = this.save.fps.get() == "30" ?
		"matanuionlinegame-30fps.swf" :
		"matanuionlinegame.swf";
	if (!this.LSO) {
		url += "?" + this.save.query();
	}
	loadMovie(url, "_level0");
};
_level0.__matanui.main = function() {
	// If the current FPS is not what was saved, reinit with that FPS.
	if (this.FPS != this.save.fps.get()) {
		this.reinit();
		return;
	}

	// Load the overlay which will setup the menus then call reload function.
	loadMovie("overlay.swf", "_level10001");
};

// Call the main function.
_level0.__matanui.main();
