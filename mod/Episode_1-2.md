# Return to `I.4-W.swf` after playing animation

## `scripts` -> `frame 387`

Original:

```
tellTarget("/")
{
	BookMovieName = "book.swf";
	BeginLoadMovie = "1";
}
stop();
```

Modified:

```
tellTarget("/")
{
	MovieName = "I.4-W.swf";
	Sound_ChangeBackgroundMovie = "1";
	Sound_BackGround = "Sound_SteamCooling.swf";
	Sound_ChangeSFXMovie = "1";
	Sound_SFXMovie = "blank.swf";
	Sound_ChangeBackgroundVolume = "1";
	Sound_BG_Volume = "Low";
	ScreenPositionChangeH = "1";
	ScreenPositionFGH = "181";
	ScreenPositionMGH = "295";
	ScreenPositionBGH = "340";
	BeginLoadMovie = "1";
	VerticalShift = "0";
	HorizontalShift = "1";
	ShiftOff = "0";
	BookMovieName = "book.swf";
	BeginLoadMovie = "1";
}
stop();
```
