var self = this;
var truthy = function(v) {
	return typeof(v) === "string" ? !!v.length : !!v;
};
var indexOf = function(a, v) {
	for (var i = 0; i < a.length; i++) {
		if (a[i] === v) {
			return i;
		}
	}
	return -1;
};
var forEach = function(a, f) {
	for (var i = 0, l = a.length; i < l; i++) {
		f(a[i], i);
	}
};
var encodeQuery = function(str) {
	var r = "";
	for (var i = 0; i < str.length; i++) {
		var c = str.charCodeAt(i);
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
			r += str.charAt(i);
		}
		else {
			r += (
				"%" +
				(c <= 0xF ? "0" : "") +
				(c.toString(16).toUpperCase())
			);
		}
	}
	return r;
};
var screenXY = function(mc, p) {
	var r = 0;
	for (var t = mc; t; t = t._parent) {
		r += t[p];
	}
	return r;
};
var screenX = function(mc) {
	return screenXY(mc, "_x");
};
var screenY = function(mc) {
	return screenXY(mc, "_y");
};
var colorRGB = function(c) {
	return c & 0xFFFFFF;
};
var colorA = function(c) {
	return ((c >>> 24) / 0xFF) * 100;
};
var drawCircle = function(mc, x, y, r, fC, sC, sW) {
	var t = Math.tan(Math.PI / 8) * r;
	var s = Math.sin(Math.PI / 4) * r;
	mc.lineStyle(sW, colorRGB(sC), colorA(sC));
	mc.beginFill(colorRGB(fC), colorA(fC));
	mc.moveTo(x + r, y);
	mc.curveTo(r + x, t + y, s + x, s + y);
	mc.curveTo(t + x, r + y, x, r + y);
	mc.curveTo(-t + x, r + y, -s + x, s + y);
	mc.curveTo(-r + x, t + y, -r + x, y);
	mc.curveTo(-r + x, -t + y, -s + x, -s + y);
	mc.curveTo(-t + x, -r + y, x, -r + y);
	mc.curveTo(t + x, -r + y, s + x, -s + y);
	mc.curveTo(r + x, -t + y, r + x, y);
	mc.endFill();
};
var drawRectangle = function(mc, x, y, w, h, r, fC, sC, sW) {
	mc.lineStyle(sW, colorRGB(sC), colorA(sC));
	mc.beginFill(colorRGB(fC), colorA(fC));
	if (r) {
		mc.moveTo(x + r, y);
		mc.lineTo(x + w - r, y);
		mc.curveTo(x + w, y, x + w, y + r);
		mc.lineTo(x + w, y + r);
		mc.lineTo(x + w, y + h - r);
		mc.curveTo(x + w, y + h, x + w - r, y + h);
		mc.lineTo(x + w - r, y + h);
		mc.lineTo(x + r, y + h);
		mc.curveTo(x, y + h, x, y + h - r);
		mc.lineTo(x, y + h - r);
		mc.lineTo(x, y + r);
		mc.curveTo(x, y, x + r, y);
		mc.lineTo(x + r, y);
	}
	else {
		mc.moveTo(x, y);
		mc.lineTo(x + w, y);
		mc.lineTo(x + w, y + h);
		mc.lineTo(x, y + h);
		mc.lineTo(x, y);
	}
	mc.endFill();
};
var multiEvents = function(o, e) {
	var handlers = [];
	o[e] = function() {
		for (var i = 0, il = handlers.length; i < il; i++) {
			var handler = handlers[i];
			if (handler && handler(o, e) === null) {
				handlers[i] = null;
			}
		}
		for (var j = handlers.length; j--;) {
			if (!handlers[j]) {
				handlers.splice(j, 1);
			}
		}
	};
	return {
		on: function(handler) {
			if (indexOf(handlers, handler) < 0) {
				handlers.push(handler);
			}
		},
		off: function(handler) {
			var i = indexOf(handlers, handler);
			if (!(i < 0)) {
				handlers[i] = null;
			}
		}
	};
};
var newTextField = function(mc, name, level, x, y, w, h, autoSize) {
	// If width or height are automatic, use 0 or high number respectively.
	// If a set width, use multiline, if no height set, automatic size.
	var high = 0xFFFFFF;
	mc.createTextField(name, level, x, y, w < 0 ? 0 : w, h < 0 ? high : h);
	var txt = mc[name];
	txt.autoSize = h < 0 ? autoSize || "left" : "none";
	txt.wordWrap = txt.multiline = !(w < 0);
	return txt;
};
var selectTextField = function(txt, a, b) {
	a = a < 0 ? txt.text.length + 1 - a : 0;
	b = b < 0 ? txt.text.length + 1 - b : 0;
	Selection.setFocus(txt);
	Selection.setSelection(a, b);
};
var whitespaceTable = [];
whitespaceTable[0] = true;
whitespaceTable[9] = true;
whitespaceTable[0xA] = true;
whitespaceTable[0xD] = true;
whitespaceTable[0x20] = true;
var trimStart = function(s) {
	var i = 0;
	for (; i < s.length && whitespaceTable[s.charCodeAt(i)]; i++);
	return s.substr(i);
};
var trimEnd = function(s) {
	var i = s.length;
	for (; i > 0 && whitespaceTable[s.charCodeAt(i - 1)]; i--);
	return s.substr(0, i);
};
var trim = function(s) {
	return trimEnd(trimStart(s));
};

// UI styles.
var colorHead = 0xFFFFFFFF;
var colorLink = 0xFFFF9900;
var colorText = 0xFF999999;
var colorEdit = 0xFFCCCCCC;
var colorBack = 0xFF333333;
var colorLine = 0xFF999999;
var boxStroke = 2;
var tipStroke = 1;

// UI layers.
var borderLayer = 1;
var dialogLayer = 2;
var tooltipLayer = 3;

// The layers for the player and overlay from this file.
var playerLayer = "_level1";
var overlayLayer = "_level10000";

// The root overlay container, and events.
var overlay = self.createEmptyMovieClip("matanui_overlay", 0);
var enterframe = multiEvents(overlay, "onEnterFrame");

// Save API.
var savePrefix = "matanui_";
var save = Array(function() {
	var setting = LSO ?
		Array(function() {
			// Get fresh each use, avoids stale object issues.
			var getSO = function() {
				return SharedObject.getLocal("mata-nui-online-game", "/");
			};
			return function(key, clean) {
				// Keep value in memory, only need to write.
				var stored = getSO().data[key];
				return {
					get: function() {
						return truthy(stored) ? stored : clean;
					},
					set: function(value) {
						var so = getSO();
						so.data[key] = stored = value;
						so.flush();
					},
					clear: function() {
						this.set(clean);
					},
					clean: function() {
						return clean;
					}
				};
			};
		})[0]() :
		Array(function() {
			var pre = savePrefix;
			var fsCmd = function(key, value) {
				// A fscommand function call is compiled to getURL.
				getURL("FSCommand:" + pre + key, value);
			};
			var swfVar = function(key) {
				return _root[pre + key];
			};
			return function(key, clean) {
				// Keep value in memory, only need to write.
				var stored = swfVar(key);
				return {
					get: function() {
						return truthy(stored) ? stored : clean;
					},
					set: function(value) {
						stored = value;
						fsCmd(key, stored);
					},
					clear: function() {
						this.set(clean);
					},
					clean: function() {
						return clean;
					}
				};
			};
		})[0]();
	return {
		// Date from LEGO offline and Templar online releases.
		date: setting("date", "1007406064"),
		language: setting("language", "eng"),
		fps: setting("fps", "18"),
		state: setting("state", "&nostate=1&")
	};
})[0]();

// Setup API exposed to the game.
var setupApi = function() {
	_level0.__matanui = Array(function(api) {
		// Messaging system because closure scope lost in call from SWF5.
		var messages = [];
		enterframe.on(function() {
			while (messages.length) {
				var m = messages.shift();
				api[m[0]](m[1]);
			}
		});
		return {
			_messages: messages,
			getdate: function(holder) {
				this._messages.push(["getdate", holder]);
			},
			getlanguage: function(holder) {
				this._messages.push(["getlanguage", holder]);
			},
			getstate: function(holder) {
				this._messages.push(["getstate", holder]);
			},
			setstate: function(holder) {
				this._messages.push(["setstate", holder]);
			}
		};
	})[0]({
		getdate: function(holder) {
			holder.ServerBasedDate = save.date.get();
		},
		getlanguage: function(holder) {
			holder.Language = save.language.get();
		},
		getstate: function(holder) {
			forEach(save.state.get().split("&"), function(s) {
				var pair = s.split("=");
				if (pair.length === 2) {
					holder[pair[0]] = pair[1];
				}
			});
		},
		setstate: function(holder) {
			var value = "&";
			for (var p in holder) {
				var v = holder[p];
				value += p + "=" + (typeof(v) === "undefined" ? "" : v) + "&";
			}
			save.state.set(value);
		}
	});
};

// Tooltip API.
var tooltip = Array(function() {
	var mc = null;
	var padX = 2;
	var padY = 1;
	var destroy = function() {
		if (!mc) {
			return;
		}
		mc.removeMovieClip();
		mc = null;
	};
	return {
		start: function(target, x, y, text) {
			destroy();
			mc = overlay.createEmptyMovieClip("tooltip", tooltipLayer);
			mc._visible = false;

			var txt = newTextField(mc, "text", 1, padX, padY, -1, -1, null);
			txt._alpha = colorA(colorLink);
			txt.selectable = false;
			txt.text = text;
			txt.embedFonts = true;
			var fmt = new TextFormat();
			fmt.font = "font_trademarker_light";
			fmt.size = 12;
			fmt.color = colorRGB(colorLink);
			txt.setTextFormat(fmt);

			var w = txt._width + (padX * 2);
			var h = txt._height + (padY * 2);
			drawRectangle(mc, 0, 0, w, h, 0, colorBack, colorLine, tipStroke);

			mc._x = (screenX(target) + x) - mc._width;
			mc._y = (screenY(target) + y) - mc._height;

			mc._visible = true;
		},
		stop: function() {
			destroy();
		}
	};
})[0]();

// Dialog API.
var dialog = Array(function() {
	var mc = null;
	var mcContent = null;
	var clean = null;
	var destroy = function() {
		if (!mc) {
			return;
		}
		if (clean) {
			clean(mcContent);
		}
		mc.removeMovieClip();
		mc = mcContent = clean = null;
	};
	return {
		open: function(
			wide,
			padding,
			vertical,
			title,
			buttons,
			createContent,
			cleanup
		) {
			destroy();
			clean = cleanup;
			mc = overlay.createEmptyMovieClip("dialog", dialogLayer);
			mc._visible = false;

			mcContent = mc.createEmptyMovieClip("content", 1);
			var mcTitle = mc.createEmptyMovieClip("title", 2);
			var mcButtons = mc.createEmptyMovieClip("buttons", 3);

			if (createContent) {
				createContent(mcContent, wide);
			}

			// Create title.
			var mcTitleText = newTextField(
				mcTitle, "text", 1, 0, 0, wide, -1, "center"
			);
			mcTitleText._alpha = colorA(colorHead);
			mcTitleText.selectable = false;
			mcTitleText.text = title;
			mcTitleText.embedFonts = true;
			var mcTitleTextFmt = new TextFormat();
			mcTitleTextFmt.font = "font_trademarker_light";
			mcTitleTextFmt.size = 30;
			mcTitleTextFmt.align = "center";
			mcTitleTextFmt.color = colorRGB(colorHead);
			mcTitleText.setTextFormat(mcTitleTextFmt);

			// Position title, content, and buttons.
			mcTitle._x = padding;
			mcTitle._y = padding;
			mcContent._x = padding;
			mcContent._y = mcTitle._y + mcTitle._height + (padding * 2);
			mcButtons._x = padding;
			mcButtons._y = mcContent._y;
			if (mcContent._height) {
				mcButtons._y += mcContent._height + (padding * 2);
			}

			var buttonW = vertical ? wide : ((
				wide - (buttons.length - 1) * padding
			) / buttons.length);
			var buttonY = 0;
			forEach(buttons, function(d, i) {
				var btn = mcButtons.createEmptyMovieClip(
					"btn_" + i,
					i + 1
				);
				var txtW = buttonW - (padding * 2);
				var txt = newTextField(
					btn, "text", 1, padding, padding, txtW, -1, "center"
				);
				txt.selectable = false;
				txt._alpha = colorA(colorLink);
				txt.text = d.title;
				txt.embedFonts = true;
				var fmt = new TextFormat();
				fmt.font = "font_trademarker_light";
				fmt.size = 20;
				fmt.align = "center";
				fmt.color = colorRGB(colorLink);
				txt.setTextFormat(fmt);

				var sW = boxStroke;
				var boxW = buttonW - (sW * 2);
				var boxH = txt._height + (padding * 2) - (sW * 2);
				drawRectangle(
					btn, sW, sW, boxW, boxH, 0, colorBack, colorLine, sW
				);

				if (vertical) {
					btn._y = buttonY;
					buttonY = btn._y + btn._height + padding;
				}
				else {
					btn._x = i * (buttonW + padding);
				}

				btn.onRelease = function() {
					d.action();
				};
			});

			// Draw background.
			var boxW = wide + (padding * 2);
			var boxH = mcButtons._y + mcButtons._height + padding;
			drawRectangle(
				mc, 0, 0, boxW, boxH, 0, colorBack, colorLine, boxStroke
			);

			// Draw line between title and content.
			var hrY = mcTitle._y + mcTitle._height + padding;
			var hrW = wide + (padding * 2);
			drawRectangle(mc, 0, hrY, hrW, 0, 0, 0, colorLine, boxStroke);

			// Center dialog.
			mc._x = (WIDTH - (mc._width - (boxStroke * 2))) * 0.5;
			mc._y = (HEIGHT - (mc._height - (boxStroke * 2))) * 0.5;

			mc._visible = true;
		},
		close: function() {
			destroy();
		}
	};
})[0]();

// Function to maybe reload into a different FPS.
var fpsMaybeReload = function() {
	var switchTo = null;
	var savedFps = save.fps.get();
	if (savedFps === "30" && FPS !== 30) {
		switchTo = "matanuionlinegame-30fps.swf";
	}
	else if (savedFps !== "30" && FPS === 30) {
		switchTo = "matanuionlinegame.swf";
	}
	if (switchTo !== null) {
		if (!LSO) {
			var vars = [];
			for (var p in save) {
				if (save[p] && save[p].get) {
					vars.push(
						encodeQuery(savePrefix + p) +
						"=" +
						encodeQuery(save[p].get())
					);
				}
			}
			switchTo += "?" + vars.join("&");
		}
		if (self[overlayLayer]) {
			// Swap back the ugly hack so replacing the root movie will work.
			self.swapDepths(overlayLayer);
		}
		loadMovie(switchTo, "_level0");
		return true;
	}
	return false;
};

// Function to reload player.
var reload = function() {
	loadMovie("player.swf", playerLayer);
};

// Setup the overlay and call function when done.
var setupOverlay = function(cb) {
	var buttonStartNewGame = function() {
		var buttonCancel = function() {
			return {
				title: "Cancel",
				action: function() {
					dialog.close();
				}
			};
		};
		var buttonStartNew = function() {
			return {
				title: "Start New",
				action: function() {
					dialog.close();
					save.state.clear();
					reload();
				}
			};
		};
		return {
			// alt="Start New Game" coords="557,25,17"
			title: "Start New Game",
			coords: [557, 25, 18],
			action: function() {
				dialog.open(
					400,
					4,
					false,
					"Start New Game?",
					[
						buttonCancel(),
						buttonStartNew()
					],
					function(content, wide) {
						var txt = newTextField(
							content, "text", 1, 0, 0, wide, -1, null
						);
						txt.selectable = false;
						txt._alpha = colorA(colorText);
						txt.text = Array(
							"Are you sure you want to start a new game?",
							"",
							"This action cannot be undone."
						).join("\n");
						txt.embedFonts = true;
						var fmt = new TextFormat();
						fmt.font = "font_gillsans";
						fmt.size = 20;
						fmt.color = colorRGB(colorText);
						txt.setTextFormat(fmt);
					},
					null
				);
			}
		};
	};
	var buttonSettings = function() {
		var buttonEnglish = function() {
			return {
				title: "English",
				action: function() {
					dialog.close();
					save.language.set("eng");
					reload();
				}
			};
		};
		var buttonDeutsche = function() {
			return {
				title: "Deutsche",
				action: function() {
					dialog.close();
					save.language.set("deu");
					reload();
				}
			};
		};
		var buttonTimestamp = function() {
			var box = null;
			var txt = null;
			var fmt = new TextFormat();
			fmt.font = "_typewriter";
			fmt.size = 16;
			fmt.color = colorRGB(colorEdit);
			var getInput = function() {
				return trim(txt.text);
			};
			var setFormat = function() {
				// Empty text fields can lose format, keep space.
				if (!txt.text.length) {
					txt.text = " ";
				}
				txt.setTextFormat(fmt);
			};
			var buttonCancel = function() {
				return {
					title: "Cancel",
					action: function() {
						dialog.close();
					}
				};
			};
			var buttonDefault = function() {
				return {
					title: "Default",
					action: function() {
						txt.text = save.date.clean();
						setFormat();
						selectTextField(txt, -1, -1);
					}
				};
			};
			var buttonUpdate = function() {
				return {
					title: "Update",
					action: function() {
						var input = getInput();
						dialog.close();
						save.date.set(input);
						reload();
					}
				};
			};
			return {
				title: "Timestamp",
				action: function() {
					dialog.open(
						300,
						4,
						false,
						"Timestamp",
						[
							buttonCancel(),
							buttonDefault(),
							buttonUpdate()
						],
						function(content, wide) {
							var l = boxStroke;
							var pad = l * 2;
							var bW = wide;
							var bH = fmt.size * 2;
							box = content.createEmptyMovieClip("box", 1);
							var oX = pad * 0.5;
							var oY = pad * 0.5;
							var oW = bW - pad;
							var oH = bH - pad;
							drawRectangle(
								box, oX, oY, oW, oH, 0, colorBack, colorLine, l
							);
							var tW = bW - (pad * 2);
							var tH = bH - (pad * 2);
							txt = newTextField(
								box, "text", 1, pad, pad, tW, tH, null
							);
							txt.type = "input";
							txt._alpha = colorA(colorEdit);
							txt.text = save.date.get();
							txt.embedFonts = false;
							setFormat();
							box.onEnterFrame = setFormat;
							selectTextField(txt, -1, -1);
						},
						function() {
							box.onEnterFrame = null;
						}
					);
				}
			};
		};
		var buttonProgress = function() {
			var box = null;
			var txt = null;
			var fmt = new TextFormat();
			fmt.font = "_typewriter";
			fmt.size = 16;
			fmt.color = colorRGB(colorEdit);
			var selectAll = function() {
				selectTextField(txt, 0, -1);
			};
			var getInput = function() {
				return trim(txt.text);
			};
			var setFormat = function() {
				// Empty text fields can lose format, keep space.
				if (!txt.text.length) {
					txt.text = " ";
				}
				txt.setTextFormat(fmt);
			};
			var buttonCancel = function() {
				return {
					title: "Cancel",
					action: function() {
						dialog.close();
					}
				};
			};
			var buttonSelect = function() {
				return {
					title: "Select",
					action: function() {
						selectAll();
					}
				};
			};
			var buttonCopy = function() {
				return {
					title: "Copy",
					action: function() {
						selectAll();
						System.setClipboard(getInput());
					}
				};
			};
			var buttonUpdate = function() {
				return {
					title: "Update",
					action: function() {
						var input = getInput();
						dialog.close();
						save.state.set(input);
						reload();
					}
				};
			};
			return {
				title: "Progress",
				action: function() {
					dialog.close();
					dialog.open(
						600,
						4,
						false,
						"Progress",
						[
							buttonCancel(),
							buttonSelect(),
							buttonCopy(),
							buttonUpdate()
						],
						function(content, wide) {
							var l = boxStroke;
							var pad = l * 2;
							var bW = wide;
							var bH = 260;
							box = content.createEmptyMovieClip("box", 1);
							var oX = pad * 0.5;
							var oY = pad * 0.5;
							var oW = bW - pad;
							var oH = bH - pad;
							drawRectangle(
								box, oX, oY, oW, oH, 0, colorBack, colorLine, l
							);
							var tW = bW - (pad * 2);
							var tH = bH - (pad * 2);
							txt = newTextField(
								box, "text", 1, pad, pad, tW, tH, null
							);
							txt.type = "input";
							txt._alpha = colorA(colorEdit);
							txt.text = save.state.get();
							txt.embedFonts = false;
							setFormat();
							box.onEnterFrame = setFormat;
							selectTextField(txt, -1, -1);
						},
						function() {
							box.onEnterFrame = null;
						}
					);
				}
			};
		};
		var button18FPS = function() {
			return {
				title: "18 FPS: Original",
				action: function() {
					dialog.close();
					save.fps.set("18");
					fpsMaybeReload();
				}
			};
		};
		var button30FPS = function() {
			return {
				title: "30 FPS: Faster",
				action: function() {
					dialog.close();
					save.fps.set("30");
					fpsMaybeReload();
				}
			};
		};
		var buttonClose = function() {
			return {
				title: "Close",
				action: function() {
					dialog.close();
				}
			};
		};
		return {
			// alt="Login" coords="626,26,17"
			title: "Settings",
			coords: [626, 25, 18],
			action: function() {
				dialog.open(
					300,
					4,
					true,
					"Settings",
					[
						buttonEnglish(),
						buttonDeutsche(),
						buttonTimestamp(),
						buttonProgress(),
						button18FPS(),
						button30FPS(),
						buttonClose()
					],
					null,
					null
				);
			}
		};
	};
	var buttonSupport = function() {
		return {
			// alt="Support" coords="683,26,19"
			title: "Support",
			coords: [683, 25, 18],
			action: function() {
				getURL("support/supportframe.html", "_blank");
			}
		};
	};
	var buttonFullscreen = function() {
		return {
			// alt="Bionicle.com" coords="734,24,20"
			title: "Fullscreen",
			coords: [736, 25, 18],
			action: function() {
				// Stage property more reliable than FSCommand:fullscreen.
				var isNormal = Stage.displayState === "normal";
				Stage.displayState = isNormal ? "fullScreen" : "normal";
			}
		};
	};

	var border = overlay.createEmptyMovieClip("border", borderLayer);
	border._y = HEIGHT - 50;

	// Draw extra around border (avoid any fullscreen overflow under it).
	var overflow = 10000;
	drawRectangle(
		border,
		-overflow,
		0,
		WIDTH + (overflow * 2),
		50 + overflow,
		0,
		0xFF000000,
		0,
		0
	);

	// Load the image, create buttons, then start loading the game.
	var borderImage = border.createEmptyMovieClip("image", 1);
	borderImage.loadMovie("border02.jpg");
	enterframe.on(function() {
		// A height means loaded.
		if (!borderImage._height) {
			return;
		}
		forEach(
			[
				buttonStartNewGame(),
				buttonSettings(),
				buttonSupport(),
				buttonFullscreen()
			],
			function(d, i) {
				var btn = border.createEmptyMovieClip("btn_" + i, 2 + i);
				var r = d.coords[2];
				var off = r * -0.75;
				drawCircle(btn, 0, 0, r, 0, 0, 0);
				btn._x = d.coords[0];
				btn._y = d.coords[1];
				btn.onRelease = function() {
					d.action();
				};
				btn.onRollOver = function() {
					tooltip.start(btn, off, off, d.title);
				};
				btn.onRollOut = function() {
					tooltip.stop();
				};
			}
		);
		cb();
		return null;
	});
};

// Init API and optionally the overlay, then load the game.
var init = function(withOverlay) {
	setupApi();
	if (withOverlay) {
		setupOverlay(function() {
			reload();
		});
	}
	else {
		reload();
	}
};

// Main entrypoints.
var mainOverlay = function() {
	// An ugly hack to make objects from this file overlay the player.
	// The player needs to be loaded into a root layer to function.
	// By default things from this movie will all be children of _layer0.
	// Cannot load player into _layer0 without replacing the whole movie.
	// However can swap _level0 with another level containing a movie.
	loadMovie("blank.swf", overlayLayer);
	enterframe.on(function() {
		if (!self[overlayLayer]) {
			return;
		}
		self.swapDepths(overlayLayer);
		init(true);
		return null;
	});

	// Unfortunately dynamic text can be slow to initialize on first use.
	// While we wait for overlay layer to load force init on a temp field.
	// Then it will not lag the overlay interface elements on first use.
	Array(function() {
		var txt = newTextField(overlay, "_", 0, 0, 0, 0, 0, null);
		txt._visible = false;
		txt.text = ".";
		txt.removeTextField();
	})[0]();
};
var mainNoOverlay = function() {
	init(false);
};
var main = function() {
	if (fpsMaybeReload()) {
		return;
	}

	if (OVERLAY) {
		mainOverlay();
	}
	else {
		mainNoOverlay();
	}
};

main();
