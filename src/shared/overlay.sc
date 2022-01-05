.flash
	filename="overlay.swf"
	version=5
	fps=18
	bbox=770x475
	background=#000000

	.font Courier "fonts/courier.ttf"
	.font GillSans "fonts/gillsans.ttf"
	.font TradeMarkerLight "fonts/trademarker_light.ttf"

	.box matanui_dialog_startnewgame_box
		width=410
		height=170
		color=#999999
		fill=#333333
		line=3
	.box matanui_dialog_startnewgame_line
		width=410
		height=0
		color=#999999
		fill=#333333
		line=3
	.text matanui_dialog_startnewgame_title
		font=TradeMarkerLight
		size=30pt
		color=#FFFFFF
		text="Start New Game?"
	.text matanui_dialog_startnewgame_text_1
		font=GillSans
		size=20pt
		color=#999999
		text="Are you sure you want to start a new game?"
	.text matanui_dialog_startnewgame_text_2
		font=GillSans
		size=20pt
		color=#999999
		text="This action cannot be undone."

	.box matanui_dialog_startnewgame_button_box
		width=196
		height=30
		color=#999999
		fill=#333333
		line=3

	.text matanui_dialog_startnewgame_button_startnew_text
		font=TradeMarkerLight
		size=20pt
		color=#FF9900
		text="Start New"
	.sprite matanui_dialog_startnewgame_button_startnew_graphic
		.put matanui_dialog_startnewgame_button_box
			pin=center
			x=0
			y=0
		.put matanui_dialog_startnewgame_button_startnew_text
			pin=center
			x=0
			y=0
	.end
	.button matanui_dialog_startnewgame_button_startnew
		.show matanui_dialog_startnewgame_button_box
			as=area
			pin=center
			x=0
			y=0
		.show matanui_dialog_startnewgame_button_startnew_graphic
			as=shape,hover,pressed
			pin=center
			x=0
			y=0
		.on_release:
			_level0.__matanui.save.state.clear();
			_level0.__matanui.reload();
			this.removeMovieClip();
		.end
	.end

	.text matanui_dialog_startnewgame_button_cancel_text
		font=TradeMarkerLight
		size=20pt
		color=#FF9900
		text="Cancel"
	.sprite matanui_dialog_startnewgame_button_cancel_graphic
		.put matanui_dialog_startnewgame_button_box
			pin=center
			x=0
			y=0
		.put matanui_dialog_startnewgame_button_cancel_text
			pin=center
			x=0
			y=0
	.end
	.button matanui_dialog_startnewgame_button_cancel
		.show matanui_dialog_startnewgame_button_box
			as=area
			pin=center
			x=0
			y=0
		.show matanui_dialog_startnewgame_button_cancel_graphic
			as=shape,hover,pressed
			pin=center
			x=0
			y=0
		.on_release:
			this.removeMovieClip();
		.end
	.end

	.sprite matanui_dialog_startnewgame
		.put matanui_dialog_startnewgame_box
			pin=center
			x=0
			y=0
		.put matanui_dialog_startnewgame_line
			pin=center
			x=0
			y=-40
		.put matanui_dialog_startnewgame_title
			pin=center
			x=0
			y=-62
		.put matanui_dialog_startnewgame_text_1
			pin=top-left
			x=-196
			y=-30
		.put matanui_dialog_startnewgame_text_2
			pin=top-left
			x=-196
			y=15
		.put matanui_dialog_startnewgame_button_startnew
			pin=center
			x=-101
			y=64
		.put matanui_dialog_startnewgame_button_cancel
			pin=center
			x=101
			y=64
		.action:
			this._x = 385;
			this._y = 213;
		.end
	.end

	.box matanui_dialog_progress_box
		width=606
		height=346
		color=#999999
		fill=#333333
		line=3
	.box matanui_dialog_progress_line
		width=606
		height=0
		color=#999999
		fill=#333333
		line=3
	.text matanui_dialog_progress_title
		font=TradeMarkerLight
		size=30pt
		color=#FFFFFF
		text="Progress"

	.box matanui_dialog_progress_button_box
		width=144
		height=30
		color=#999999
		fill=#333333
		line=3

	.box matanui_dialog_progress_input_box
		width=594
		height=254
		color=#999999
		fill=#333333
		line=3

	.edittext matanui_dialog_progress_input_text
		font=Courier
		size=20pt
		wordwrap
		multiline
		width=592
		height=254
		color=#999999
		text=""
		variable=input

	.text matanui_dialog_progress_button_update_text
		font=TradeMarkerLight
		size=20pt
		color=#FF9900
		text="Update"
	.sprite matanui_dialog_progress_button_update_graphic
		.put matanui_dialog_progress_button_box
			pin=center
			x=0
			y=0
		.put matanui_dialog_progress_button_update_text
			pin=center
			x=0
			y=1.6
	.end
	.button matanui_dialog_progress_button_update
		.show matanui_dialog_progress_button_box
			as=area
			pin=center
			x=0
			y=0
		.show matanui_dialog_progress_button_update_graphic
			as=shape,hover,pressed
			pin=center
			x=0
			y=0
		.on_release:
			_level0.__matanui.save.state.set(_level0.__matanui.util.trim(input));
			_level0.__matanui.reload();
			this.removeMovieClip();
		.end
	.end

	.text matanui_dialog_progress_button_select_text
		font=TradeMarkerLight
		size=20pt
		color=#FF9900
		text="Select"
	.sprite matanui_dialog_progress_button_select_graphic
		.put matanui_dialog_progress_button_box
			pin=center
			x=0
			y=0
		.put matanui_dialog_progress_button_select_text
			pin=center
			x=0
			y=0
	.end
	.button matanui_dialog_progress_button_select
		.show matanui_dialog_progress_button_box
			as=area
			pin=center
			x=0
			y=0
		.show matanui_dialog_progress_button_select_graphic
			as=shape,hover,pressed
			pin=center
			x=0
			y=0
		.on_release:
			Selection.setFocus("input");
			Selection.setSelection(0, input.length);
		.end
	.end

	.text matanui_dialog_progress_button_copy_text
		font=TradeMarkerLight
		size=20pt
		color=#FF9900
		text="Copy"
	.sprite matanui_dialog_progress_button_copy_graphic
		.put matanui_dialog_progress_button_box
			pin=center
			x=0
			y=0
		.put matanui_dialog_progress_button_copy_text
			pin=center
			x=0
			y=0
	.end
	.button matanui_dialog_progress_button_copy
		.show matanui_dialog_progress_button_box
			as=area
			pin=center
			x=0
			y=0
		.show matanui_dialog_progress_button_copy_graphic
			as=shape,hover,pressed
			pin=center
			x=0
			y=0
		.on_release:
			Selection.setFocus("input");
			Selection.setSelection(0, input.length);
			_level0.__matanui.setClipboard(input);
		.end
	.end

	.text matanui_dialog_progress_button_cancel_text
		font=TradeMarkerLight
		size=20pt
		color=#FF9900
		text="Cancel"
	.sprite matanui_dialog_progress_button_cancel_graphic
		.put matanui_dialog_progress_button_box
			pin=center
			x=0
			y=0
		.put matanui_dialog_progress_button_cancel_text
			pin=center
			x=0
			y=0
	.end
	.button matanui_dialog_progress_button_cancel
		.show matanui_dialog_progress_button_box
			as=area
			pin=center
			x=0
			y=0
		.show matanui_dialog_progress_button_cancel_graphic
			as=shape,hover,pressed
			pin=center
			x=0
			y=0
		.on_release:
			this.removeMovieClip();
		.end
	.end

	.sprite matanui_dialog_progress
		.put matanui_dialog_progress_box
			pin=center
			x=0
			y=0
		.put matanui_dialog_progress_line
			pin=center
			x=0
			y=-129
		.put matanui_dialog_progress_title
			pin=center
			x=0
			y=-149
		.put matanui_dialog_progress_input_box
			pin=center
			x=0
			y=4
		.put matanui_dialog_progress_input_text
			pin=center
			x=0
			y=5
		.put matanui_dialog_progress_button_update
			pin=center
			x=-225
			y=152
		.put matanui_dialog_progress_button_select
			pin=center
			x=-75
			y=152
		.put matanui_dialog_progress_button_copy
			pin=center
			x=75
			y=152
		.put matanui_dialog_progress_button_cancel
			pin=center
			x=225
			y=152
		.action:
			this._x = 385;
			this._y = 213;
			input = _level0.__matanui.save.state.get();
		.end
	.end

	.box matanui_dialog_timestamp_box
		width=312
		height=122
		color=#999999
		fill=#333333
		line=3
	.box matanui_dialog_timestamp_line
		width=310
		height=0
		color=#999999
		fill=#333333
		line=3
	.text matanui_dialog_timestamp_title
		font=TradeMarkerLight
		size=30pt
		color=#FFFFFF
		text="Timestamp"

	.box matanui_dialog_timestamp_button_box
		width=96
		height=30
		color=#999999
		fill=#333333
		line=3

	.box matanui_dialog_timestamp_input_box
		width=300
		height=30
		color=#999999
		fill=#333333
		line=3

	.edittext matanui_dialog_timestamp_input_text
		font=Courier
		size=20pt
		width=296
		height=30
		color=#999999
		text=""
		variable=input

	.text matanui_dialog_timestamp_button_update_text
		font=TradeMarkerLight
		size=20pt
		color=#FF9900
		text="Update"
	.sprite matanui_dialog_timestamp_button_update_graphic
		.put matanui_dialog_timestamp_button_box
			pin=center
			x=0
			y=0
		.put matanui_dialog_timestamp_button_update_text
			pin=center
			x=0
			y=1.6
	.end
	.button matanui_dialog_timestamp_button_update
		.show matanui_dialog_timestamp_button_box
			as=area
			pin=center
			x=0
			y=0
		.show matanui_dialog_timestamp_button_update_graphic
			as=shape,hover,pressed
			pin=center
			x=0
			y=0
		.on_release:
			_level0.__matanui.save.date.set(_level0.__matanui.util.trim(input));
			_level0.__matanui.reload();
			this.removeMovieClip();
		.end
	.end

	.text matanui_dialog_timestamp_button_default_text
		font=TradeMarkerLight
		size=20pt
		color=#FF9900
		text="Default"
	.sprite matanui_dialog_timestamp_button_default_graphic
		.put matanui_dialog_timestamp_button_box
			pin=center
			x=0
			y=0
		.put matanui_dialog_timestamp_button_default_text
			pin=center
			x=0
			y=0
	.end
	.button matanui_dialog_timestamp_button_default
		.show matanui_dialog_timestamp_button_box
			as=area
			pin=center
			x=0
			y=0
		.show matanui_dialog_timestamp_button_default_graphic
			as=shape,hover,pressed
			pin=center
			x=0
			y=0
		.on_release:
			input = _level0.__matanui.save.date.clean();
		.end
	.end

	.text matanui_dialog_timestamp_button_cancel_text
		font=TradeMarkerLight
		size=20pt
		color=#FF9900
		text="Cancel"
	.sprite matanui_dialog_timestamp_button_cancel_graphic
		.put matanui_dialog_timestamp_button_box
			pin=center
			x=0
			y=0
		.put matanui_dialog_timestamp_button_cancel_text
			pin=center
			x=0
			y=0
	.end
	.button matanui_dialog_timestamp_button_cancel
		.show matanui_dialog_timestamp_button_box
			as=area
			pin=center
			x=0
			y=0
		.show matanui_dialog_timestamp_button_cancel_graphic
			as=shape,hover,pressed
			pin=center
			x=0
			y=0
		.on_release:
			this.removeMovieClip();
		.end
	.end

	.sprite matanui_dialog_timestamp
		.put matanui_dialog_timestamp_box
			pin=center
			x=0
			y=0
		.put matanui_dialog_timestamp_line
			pin=center
			x=0
			y=-17
		.put matanui_dialog_timestamp_title
			pin=center
			x=0
			y=-37
		.put matanui_dialog_timestamp_input_box
			pin=center
			x=0
			y=4
		.put matanui_dialog_timestamp_input_text
			pin=center
			x=0
			y=6
		.put matanui_dialog_timestamp_button_update
			pin=center
			x=-102
			y=40
		.put matanui_dialog_timestamp_button_default
			pin=center
			x=0
			y=40
		.put matanui_dialog_timestamp_button_cancel
			pin=center
			x=102
			y=40
		.action:
			this._x = 385;
			this._y = 213;
			input = _level0.__matanui.save.date.get();
		.end
	.end

	.box matanui_dialog_settings_box
		width=312
		height=302
		color=#999999
		fill=#333333
		line=3
	.box matanui_dialog_settings_line
		width=310
		height=0
		color=#999999
		fill=#333333
		line=3
	.text matanui_dialog_settings_title
		font=TradeMarkerLight
		size=30pt
		color=#FFFFFF
		text="Settings"

	.box matanui_dialog_settings_button_box
		width=300
		height=30
		color=#999999
		fill=#333333
		line=3

	.text matanui_dialog_settings_button_english_text
		font=TradeMarkerLight
		size=20pt
		color=#FF9900
		text="English"
	.sprite matanui_dialog_settings_button_english_graphic
		.put matanui_dialog_settings_button_box
			pin=center
			x=0
			y=0
		.put matanui_dialog_settings_button_english_text
			pin=center
			x=0
			y=1.6
	.end
	.button matanui_dialog_settings_button_english
		.show matanui_dialog_settings_button_box
			as=area
			pin=center
			x=0
			y=0
		.show matanui_dialog_settings_button_english_graphic
			as=shape,hover,pressed
			pin=center
			x=0
			y=0
		.on_release:
			_level0.__matanui.save.language.set("eng");
			_level0.__matanui.reload();
			this.removeMovieClip();
		.end
	.end

	.text matanui_dialog_settings_button_deutsche_text
		font=TradeMarkerLight
		size=20pt
		color=#FF9900
		text="Deutsche"
	.sprite matanui_dialog_settings_button_deutsche_graphic
		.put matanui_dialog_settings_button_box
			pin=center
			x=0
			y=0
		.put matanui_dialog_settings_button_deutsche_text
			pin=center
			x=0
			y=0
	.end
	.button matanui_dialog_settings_button_deutsche
		.show matanui_dialog_settings_button_box
			as=area
			pin=center
			x=0
			y=0
		.show matanui_dialog_settings_button_deutsche_graphic
			as=shape,hover,pressed
			pin=center
			x=0
			y=0
		.on_release:
			_level0.__matanui.save.language.set("deu");
			_level0.__matanui.reload();
			this.removeMovieClip();
		.end
	.end

	.text matanui_dialog_settings_button_timestamp_text
		font=TradeMarkerLight
		size=20pt
		color=#FF9900
		text="Timestamp"
	.sprite matanui_dialog_settings_button_timestamp_graphic
		.put matanui_dialog_settings_button_box
			pin=center
			x=0
			y=0
		.put matanui_dialog_settings_button_timestamp_text
			pin=center
			x=0
			y=1.6
	.end
	.button matanui_dialog_settings_button_timestamp
		.show matanui_dialog_settings_button_box
			as=area
			pin=center
			x=0
			y=0
		.show matanui_dialog_settings_button_timestamp_graphic
			as=shape,hover,pressed
			pin=center
			x=0
			y=0
		.on_release:
			_parent.attachMovie("matanui_dialog_timestamp", "matanui_dialog_timestamp", 1);
		.end
	.end

	.text matanui_dialog_settings_button_progress_text
		font=TradeMarkerLight
		size=20pt
		color=#FF9900
		text="Progress"
	.sprite matanui_dialog_settings_button_progress_graphic
		.put matanui_dialog_settings_button_box
			pin=center
			x=0
			y=0
		.put matanui_dialog_settings_button_progress_text
			pin=center
			x=0
			y=1.6
	.end
	.button matanui_dialog_settings_button_progress
		.show matanui_dialog_settings_button_box
			as=area
			pin=center
			x=0
			y=0
		.show matanui_dialog_settings_button_progress_graphic
			as=shape,hover,pressed
			pin=center
			x=0
			y=0
		.on_release:
			_parent.attachMovie("matanui_dialog_progress", "matanui_dialog_progress", 1);
		.end
	.end

	.text matanui_dialog_settings_button_18fps_text
		font=TradeMarkerLight
		size=20pt
		color=#FF9900
		text="18 FPS: Original"
	.sprite matanui_dialog_settings_button_18fps_graphic
		.put matanui_dialog_settings_button_box
			pin=center
			x=0
			y=0
		.put matanui_dialog_settings_button_18fps_text
			pin=center
			x=0
			y=0
	.end
	.button matanui_dialog_settings_button_18fps
		.show matanui_dialog_settings_button_box
			as=area
			pin=center
			x=0
			y=0
		.show matanui_dialog_settings_button_18fps_graphic
			as=shape,hover,pressed
			pin=center
			x=0
			y=0
		.on_release:
			_level0.__matanui.save.fps.set("18");
			_level0.__matanui.reinit();
			this.removeMovieClip();
		.end
	.end

	.text matanui_dialog_settings_button_30fps_text
		font=TradeMarkerLight
		size=20pt
		color=#FF9900
		text="30 FPS: Faster"
	.sprite matanui_dialog_settings_button_30fps_graphic
		.put matanui_dialog_settings_button_box
			pin=center
			x=0
			y=0
		.put matanui_dialog_settings_button_30fps_text
			pin=center
			x=0
			y=0
	.end
	.button matanui_dialog_settings_button_30fps
		.show matanui_dialog_settings_button_box
			as=area
			pin=center
			x=0
			y=0
		.show matanui_dialog_settings_button_30fps_graphic
			as=shape,hover,pressed
			pin=center
			x=0
			y=0
		.on_release:
			_level0.__matanui.save.fps.set("30");
			_level0.__matanui.reinit();
			this.removeMovieClip();
		.end
	.end

	.text matanui_dialog_settings_button_close_text
		font=TradeMarkerLight
		size=20pt
		color=#FF9900
		text="Close"
	.sprite matanui_dialog_settings_button_close_graphic
		.put matanui_dialog_settings_button_box
			pin=center
			x=0
			y=0
		.put matanui_dialog_settings_button_close_text
			pin=center
			x=0
			y=0
	.end
	.button matanui_dialog_settings_button_close
		.show matanui_dialog_settings_button_box
			as=area
			pin=center
			x=0
			y=0
		.show matanui_dialog_settings_button_close_graphic
			as=shape,hover,pressed
			pin=center
			x=0
			y=0
		.on_release:
			this.removeMovieClip();
		.end
	.end

	.sprite matanui_dialog_settings
		.put matanui_dialog_settings_box
			pin=center
			x=0
			y=0
		.put matanui_dialog_settings_line
			pin=center
			x=0
			y=-107
		.put matanui_dialog_settings_title
			pin=center
			x=0
			y=-127
		.put matanui_dialog_settings_button_english
			pin=center
			x=0
			y=-86
		.put matanui_dialog_settings_button_deutsche
			pin=center
			x=0
			y=-50
		.put matanui_dialog_settings_button_timestamp
			pin=center
			x=0
			y=-14
		.put matanui_dialog_settings_button_progress
			pin=center
			x=0
			y=22
		.put matanui_dialog_settings_button_18fps
			pin=center
			x=0
			y=58
		.put matanui_dialog_settings_button_30fps
			pin=center
			x=0
			y=94
		.put matanui_dialog_settings_button_close
			pin=center
			x=0
			y=130
		.action:
			this._x = 385;
			this._y = 213;
		.end
	.end

	.circle matanui_border_button_area
		r=18
		fill=#FFFFFF
		line=0

	.box matanui_border_button_startnewgame_tooltip_box
		width=112
		height=18
		color=#999999
		fill=#333333
		line=2
	.text matanui_border_button_startnewgame_tooltip_text
		font=TradeMarkerLight
		size=12pt
		color=#FF9900
		text="Start New Game"
	.sprite matanui_border_button_startnewgame_tooltip
		.put matanui_border_button_startnewgame_tooltip_box
			pin=center
			x=0
			y=0
		.put matanui_border_button_startnewgame_tooltip_text
			pin=center
			x=0
			y=0
	.end
	.button matanui_border_button_startnewgame
		.show matanui_border_button_area
			as=area
			pin=center
		.show matanui_border_button_startnewgame_tooltip
			as=hover,pressed
			pin=bottom-right
			x=-15
			y=-15
		.on_release:
			_parent.attachMovie("matanui_dialog_startnewgame", "matanui_dialog_startnewgame", 1);
		.end
	.end

	.box matanui_border_button_settings_tooltip_box
		width=59
		height=18
		color=#999999
		fill=#333333
		line=2
	.text matanui_border_button_settings_tooltip_text
		font=TradeMarkerLight
		size=12pt
		color=#FF9900
		text="Settings"
	.sprite matanui_border_button_settings_tooltip
		.put matanui_border_button_settings_tooltip_box
			pin=center
			x=0
			y=0
		.put matanui_border_button_settings_tooltip_text
			pin=center
			x=0
			y=1
	.end
	.button matanui_border_button_settings
		.show matanui_border_button_area
			as=area
			pin=center
		.show matanui_border_button_settings_tooltip
			as=hover,pressed
			pin=bottom-right
			x=-15
			y=-15
		.on_release:
			_parent.attachMovie("matanui_dialog_settings", "matanui_dialog_settings", 1);
		.end
	.end

	.box matanui_border_button_support_tooltip_box
		width=58
		height=18
		color=#999999
		fill=#333333
		line=2
	.text matanui_border_button_support_tooltip_text
		font=TradeMarkerLight
		size=12pt
		color=#FF9900
		text="Support"
	.sprite matanui_border_button_support_tooltip
		.put matanui_border_button_support_tooltip_box
			pin=center
			x=0
			y=0
		.put matanui_border_button_support_tooltip_text
			pin=center
			x=0
			y=1
	.end
	.button matanui_border_button_support
		.show matanui_border_button_area
			as=area
			pin=center
		.show matanui_border_button_support_tooltip
			as=hover,pressed
			pin=bottom-right
			x=-15
			y=-15
		.on_release:
			getURL("support/supportframe.html", "_blank");
		.end
	.end

	.box matanui_border_button_fullscreen_tooltip_box
		width=72
		height=18
		color=#999999
		fill=#333333
		line=2
	.text matanui_border_button_fullscreen_tooltip_text
		font=TradeMarkerLight
		size=12pt
		color=#FF9900
		text="Fullscreen"
	.sprite matanui_border_button_fullscreen_tooltip
		.put matanui_border_button_fullscreen_tooltip_box
			pin=center
			x=0
			y=0
		.put matanui_border_button_fullscreen_tooltip_text
			pin=center
			x=0
			y=0
	.end
	.button matanui_border_button_fullscreen
		.show matanui_border_button_area
			as=area
			pin=center
		.show matanui_border_button_fullscreen_tooltip
			as=hover,pressed
			pin=bottom-right
			x=-15
			y=-15
		.on_release:
			_level0.__matanui.toggleFullscreen();
		.end
	.end

	.box matanui_border_box
		width=20770
		height=10050
		fill=#000000
		line=0

	.sprite matanui_border_image
		.action:
			this.loadMovie("border02.jpg");
		.end
	.end

	.sprite matanui_border
		# Draw extra around border (no fullscreen overflow under).
		.put matanui_border_box
			x=-10000
			y=0

		# border image container and the buttons.
		.put matanui_border_image
			x=0
			y=0

		# alt="Start New Game" coords="557,25,17"
		.put matanui_border_button_startnewgame
			x=557
			y=25

		# alt="Login" coords="626,26,17"
		.put matanui_border_button_settings
			x=626
			y=25

		# alt="Support" coords="683,26,19"
		.put matanui_border_button_support
			x=683
			y=25

		# alt="Bionicle.com" coords="734,24,20"
		.put matanui_border_button_fullscreen
			x=736
			y=25
	.end

	.sprite matanui_overlay
		.put matanui_border
			x=0
			y=425
	.end

	.put matanui_overlay

	.action:
		_level0.__matanui.reload();
	.end
.end
