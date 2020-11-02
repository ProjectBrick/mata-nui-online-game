# Restore backpack collected state

## `scripts` -> `DefineButton2 (21)`

Original:

```
on(release){
	tellTarget("/")
	{
		Backpack = "1";
	}
}
```

Modified:

```
on(release){
	tellTarget("/")
	{
		Backpack = "1";
		ShowBackPack = "1";
	}
}
```
