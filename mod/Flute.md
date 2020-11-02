# Workaround for Flash Player 19.0.0.245+ compatablility

The fix for CVE-2015-7659 breaks SWF4 `StringVariable:length` syntax.

> Parameters of primitive types are no longer coerced into the required type - Object.

## `scripts` -> `DefineSprite (33)` -> `frame 3`

Original:

```
if(SimonStart eq "1")
{
	if(SimonSays ne "none")
	{
		tellTarget(SimonSays)
		{
			gotoAndStop("play");
			play();
		}
		SimonStart = "0";
		SimonNotes = "";
	}
}
if(SimonSays ne "none")
{
	if(SimonNotes:length eq SongNotes:length)
	{
		CheckFailed = "0";
		count = "1";
		while(CheckFailed eq "0" and SongNotes:length >= count)
		{
			if(SimonNotes.substr(count,"1") ne SongNotes.substr(count,"1"))
			{
				CheckFailed = "1";
			}
			count = count + "1";
		}
		if(CheckFailed eq "0")
		{
			tellTarget("Correct")
			{
				gotoAndStop("play");
				play();
			}
			SimonNotes = "EMPTY";
		}
	}
}
```

Modified:

```
if(SimonStart eq "1")
{
	if(SimonSays ne "none")
	{
		tellTarget(SimonSays)
		{
			gotoAndStop("play");
			play();
		}
		SimonStart = "0";
		SimonNotes = "";
	}
}
if(SimonSays ne "none")
{
	if(SimonNotes.length eq SongNotes.length)
	{
		CheckFailed = "0";
		count = "1";
		while(CheckFailed eq "0" and SongNotes.length >= count)
		{
			if(SimonNotes.substr(count,"1") ne SongNotes.substr(count,"1"))
			{
				CheckFailed = "1";
			}
			count = count + "1";
		}
		if(CheckFailed eq "0")
		{
			tellTarget("Correct")
			{
				gotoAndStop("play");
				play();
			}
			SimonNotes = "EMPTY";
		}
	}
}
```




# Avoid reloading `KahuRestrictions.txt` constantly

## `scripts` -> `DefineSprite (6)` -> `frame 2`

Original:

```
loadVariables("KahuRestrictions.txt","../correct");
stop();
```

Modified:

```
if(KahuRestrictionsLoading ne "1")
{
	KahuRestrictionsLoading = "1";
	loadVariables("KahuRestrictions.txt","../correct","GET");
}
stop();
```
