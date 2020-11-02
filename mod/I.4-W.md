# Restore `Episode_1-2.swf` visited state

## `scripts` -> `DefineButton2 (14)`

Original:

```
on(release){
	tellTarget("/")
	{
		MovieName = "Episode_1-2.swf";
		VerticalShift = "0";
		HorizontalShift = "1";
		ShiftOff = "1";
		Sound_ChangeSFXMovie = "1";
		Sound_SFXMovie = "blank.swf";
		Sound_ChangeBackgroundMovie = "1";
		Sound_BackGround = "blank.swf";
		Music_ChangeMusic = "1";
		Music_Movie = "Music_Episode1-2.swf";
		BeginLoadMovie = "1";
	}
}
```

Modified:

```
on(release){
	tellTarget("/")
	{
		I4WVisited = "1";
		MovieName = "Episode_1-2.swf";
		VerticalShift = "0";
		HorizontalShift = "1";
		ShiftOff = "1";
		Sound_ChangeSFXMovie = "1";
		Sound_SFXMovie = "blank.swf";
		Sound_ChangeBackgroundMovie = "1";
		Sound_BackGround = "blank.swf";
		Music_ChangeMusic = "1";
		Music_Movie = "Music_Episode1-2.swf";
		BeginLoadMovie = "1";
	}
}
```

## `scripts` -> `frame 1`

Original:

```
loadMovie("sky1.swf","/holder/Back-Ground/Sky-holder");
I4WVisited = /:I4WVisited;
I4WVisited = "1";
if(I4WVisited eq "1")
{
	/holder/Middle-Ground/Button-Tahu:_Y = "2000";
}
else
{
	/holder/Middle-Ground/Button_Forward:_Y = "2000";
}
tellTarget("/")
{
	Startedloading = "1";
}
```

Modified:

```
loadMovie("sky1.swf","/holder/Back-Ground/Sky-holder");
I4WVisited = /:I4WVisited;
if(I4WVisited eq "1")
{
	/holder/Middle-Ground/Button-Tahu:_Y = "2000";
}
else
{
	/holder/Middle-Ground/Button_Forward:_Y = "2000";
}
tellTarget("/")
{
	Startedloading = "1";
}
```
