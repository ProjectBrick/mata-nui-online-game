# Backpack and I4W states, alternative saving

## `header`

Change SWF version from 4 to 5 (necessary to communicate via global objects).

## `scripts` -> `DefineSprite (24)` -> `frame 3`

Original:

```
AbrevState = "1";
mvn = /:MovieName;
vsh = /:VerticalShift;
hsh = /:HorizontalShift;
sho = /:ShiftOff;
s_bg = /:Sound_BackGround;
s_bg_v = /:Sound_BG_Volume;
s_fx = /:Sound_SFXMovie;
m_mv = /:Music_Movie;
if("0" < /:LetterA)
{
	ltA = /:LetterA;
}
if("0" < /:LetterB)
{
	ltB = /:LetterB;
}
if("0" < /:Gnomon)
{
	Gno = /:Gnomon;
}
if("0" < /:Item_LightStone)
{
	IltS = /:Item_LightStone;
}
TaB = /:TaBridge;
Gak = /:GaKoro;
Lek = /:LeKoro;
if(Gak eq "0")
{
	Ga_c = /:GaKoro_Cog;
	Ga_v = /:GaKoroVisited;
}
else
{
	Bk = /:Book;
}
Pok = ../:PoKoro;
q_k_u = ../:QuarryKeyUsed;
if(Pok eq "0")
{
	q_k = ../:QuarryKey;
	k_b = ../:KohliBall;
	k_b_u = ../:KohliBallUsed;
}
else
{
	Chi = ../:Chisel;
}
if(/:OnuKoroLava eq "1")
{
	Onu_L = /:OnukoroLava;
}
if(/:OnuKoroDoor eq "1")
{
	Onu_D = /:OnukoroDoor;
}
if(/:OnuKoroRats eq "1")
{
	Onu_R = /:OnukoroRats;
}
if(/:LavaBoard eq "1")
{
	Lv_b = /:LavaBoard;
}
if(/:Flute eq "1")
{
	Fl = /:Flute;
	Kr = /:KahuRide;
	Taipu = /:Taipu;
}
if(/:FireStaff eq "1")
{
	F_s = /:FireStaff;
}
if(/:Ensign eq "1")
{
	Ens = /:Ensign;
}
if("0" < /:KoKoro)
{
	Kok = /:KoKoro;
}
f_K = /:fKoKoro;
f_L = /:fLeKoro;
f_P = /:fPoKoro;
f_O = /:fOnuKoro;
f_T = /:fTaKoro;
f_G = /:fGaKoro;
cMa = /:cMaku;
cKa = /:cKapura;
cTa = /:cTamaru;
cKo = /:cKopeke;
cHa = /:cHafu;
cTu = /:cTaipu;
Quest = /:Quest;
cBarNum = /:cBarNum;
C1 = /:Comrade_1;
C2 = /:Comrade_2;
C3 = /:Comrade_3;
C4 = /:Comrade_4;
C5 = /:Comrade_5;
C6 = /:Comrade_6;
fgW = /:FightWins;
fgV = /:FightVisions;
fgS = /:FightScreen;
MaHlth = /:MakuHealth;
KaHlth = /:KapuraHealth;
TuHlth = /:TamaruHealth;
KoHlth = /:KopekeHealth;
HaHlth = /:HafuHealth;
TaHlth = /:TaipuHealth;
p8 = "1";
StateLoaded = "1";
vars = "1";
loadVariables("setstate.asp","/State-holder","GET");
```

Modified:

```
AbrevState = "1";
mvn = /:MovieName;
vsh = /:VerticalShift;
hsh = /:HorizontalShift;
sho = /:ShiftOff;
s_bg = /:Sound_BackGround;
s_bg_v = /:Sound_BG_Volume;
s_fx = /:Sound_SFXMovie;
m_mv = /:Music_Movie;
if("0" < /:LetterA)
{
	ltA = /:LetterA;
}
if("0" < /:LetterB)
{
	ltB = /:LetterB;
}
if("0" < /:Gnomon)
{
	Gno = /:Gnomon;
}
if("0" < /:Item_LightStone)
{
	IltS = /:Item_LightStone;
}
TaB = /:TaBridge;
Gak = /:GaKoro;
Lek = /:LeKoro;
if(Gak eq "0")
{
	Ga_c = /:GaKoro_Cog;
	Ga_v = /:GaKoroVisited;
}
else
{
	Bk = /:Book;
}
Pok = ../:PoKoro;
q_k_u = ../:QuarryKeyUsed;
if(Pok eq "0")
{
	q_k = ../:QuarryKey;
	k_b = ../:KohliBall;
	k_b_u = ../:KohliBallUsed;
}
else
{
	Chi = ../:Chisel;
}
if(/:OnuKoroLava eq "1")
{
	Onu_L = /:OnukoroLava;
}
if(/:OnuKoroDoor eq "1")
{
	Onu_D = /:OnukoroDoor;
}
if(/:OnuKoroRats eq "1")
{
	Onu_R = /:OnukoroRats;
}
if(/:LavaBoard eq "1")
{
	Lv_b = /:LavaBoard;
}
if(/:Flute eq "1")
{
	Fl = /:Flute;
	Kr = /:KahuRide;
	Taipu = /:Taipu;
}
if(/:FireStaff eq "1")
{
	F_s = /:FireStaff;
}
if(/:Ensign eq "1")
{
	Ens = /:Ensign;
}
if("0" < /:KoKoro)
{
	Kok = /:KoKoro;
}
f_K = /:fKoKoro;
f_L = /:fLeKoro;
f_P = /:fPoKoro;
f_O = /:fOnuKoro;
f_T = /:fTaKoro;
f_G = /:fGaKoro;
cMa = /:cMaku;
cKa = /:cKapura;
cTa = /:cTamaru;
cKo = /:cKopeke;
cHa = /:cHafu;
cTu = /:cTaipu;
Quest = /:Quest;
cBarNum = /:cBarNum;
C1 = /:Comrade_1;
C2 = /:Comrade_2;
C3 = /:Comrade_3;
C4 = /:Comrade_4;
C5 = /:Comrade_5;
C6 = /:Comrade_6;
fgW = /:FightWins;
fgV = /:FightVisions;
fgS = /:FightScreen;
MaHlth = /:MakuHealth;
KaHlth = /:KapuraHealth;
TuHlth = /:TamaruHealth;
KoHlth = /:KopekeHealth;
HaHlth = /:HafuHealth;
TaHlth = /:TaipuHealth;
p8 = "1";
StateLoaded = "1";
vars = "1";
Backpack = /:Backpack;
ShowBackPack = /:ShowBackPack;
I4WVisited = /:I4WVisited;
if(_level0 && _level0.__matanui)
{
	_level0.__matanui.setstate(this);
}
else if(_root && typeof _root.setstate_url == "string" && _root.setstate_url.length)
{
	loadVariables(_root.setstate_url,"/State-holder","GET");
}
else
{
	loadVariables("setstate.asp","/State-holder","GET");
}
```

## `scripts` -> `frame 1`

Original:

```
ServerBasedDate = "0";
currenttime = getTimer();
startDrag("/mousedrag","1");
MovieName = "I.1-S.swf";
MoveDirection = "none";
VerticalShift = "0";
HorizontalShift = "1";
ShiftOff = "0";
Sound_ChangeBackgroundMovie = "0";
Sound_ChangeSFXMovie = "0";
Sound_Background = "Sound_Waves.swf";
Sound_BG_Volume = "High";
Sound_ChangeBackgroundVolume = "0";
Sound_SilenceLength = "1000";
Sound_SFXMovie = "Sound_Beach.swf";
Music_ChangeMusic = "0";
Music_Movie = "blank.swf";
Movieisloaded = "0";
SFX_Length = "0";
BeginLoadMovie = "0";
ScreenPositionChangeH = "0";
ScreenPositionChangeV = "0";
ScreenPositionFGH = "385";
ScreenPositionMGH = "385";
ScreenPositionBGH = "385";
ScreenPositionFGV = "212.5";
ScreenPositionMGV = "212.5";
ScreenPositionBGV = "212.5";
TimeOfLaunch = "0";
Launch0 = "978325200";
Launch1 = "981054000";
Launch2 = "984682800";
Launch3 = "989953200";
Launch4 = "995223600";
Launch5 = "999370800";
Launch6 = "1000148401";
Launch7 = "1004036401";
Launch8 = "1007406063";
Launch9 = "10099254240";
TimeOfLaunch = "978000000";
BackPack = "1";
GaKoro = "0";
GaKoroVisited = "0";
GaKoro_Cog = "0";
BookOpen = "0";
BookMovieName = "book.swf";
ShowBackPack = "1";
Book = "0";
PoKoro = "0";
KohliBall = "0";
QuarryKey = "0";
KohliBallUsed = "0";
QuarryKeyUsed = "0";
Chisel = "0";
Biodermis = "0";
Comrade_1 = "blank.swf";
Comrade_2 = "blank.swf";
Comrade_3 = "blank.swf";
pBook_goat = "0";
OnukoroLava = "0";
OnukoroDoor = "0";
OnukoroRats = "0";
LavaBoard = "0";
LetterA = "0";
Gnomon = "0";
LeKoro = "0";
Flute = "0";
LoadedFlute = "0";
KahuRide = "0";
Language = "eng";
AllowTextSub = "1";
Ensign = "0";
KoKoro = "0";
FireStaff = "0";
Quest = "0";
cBarNum = "0";
Comrade_1 = "";
Comrade_2 = "";
Comrade_3 = "";
Comrade_4 = "";
Comrade_5 = "";
Comrade_6 = "";
cMaku = "0";
cKapura = "0";
cTamaru = "0";
cKopeke = "0";
cHafu = "0";
cTaipu = "0";
TaipuCanGo = "0";
FightWins = "0";
FightVisions = "0";
FightScreen = "1";
MakuHealth = "150";
KapuraHealth = "250";
TamaruHealth = "200";
KopekeHealth = "250";
HafuHealth = "300";
TaipuHealth = "400";
p8 = "0";
ltA = "0";
ltB = "0";
ltS = "0";
IltS = "0";
Gno = "0";
Ga_c = "0";
Ga_v = "0";
Bk = "0";
q_k = "0";
k_b = "0";
k_b_u = "0";
Chi = "0";
Onu_L = "0";
Onu_D = "0";
Onu_R = "0";
Lv_b = "0";
Fl = "0";
Kr = "0";
Taipu = "Free";
F_s = "0";
Ens = "0";
Kok = "0";
```

Modified:

```
ServerBasedDate = "0";
currenttime = getTimer();
startDrag("/mousedrag","1");
MovieName = "I.1-S.swf";
MoveDirection = "none";
VerticalShift = "0";
HorizontalShift = "1";
ShiftOff = "0";
Sound_ChangeBackgroundMovie = "0";
Sound_ChangeSFXMovie = "0";
Sound_Background = "Sound_Waves.swf";
Sound_BG_Volume = "High";
Sound_ChangeBackgroundVolume = "0";
Sound_SilenceLength = "1000";
Sound_SFXMovie = "Sound_Beach.swf";
Music_ChangeMusic = "0";
Music_Movie = "blank.swf";
Movieisloaded = "0";
SFX_Length = "0";
BeginLoadMovie = "0";
ScreenPositionChangeH = "0";
ScreenPositionChangeV = "0";
ScreenPositionFGH = "385";
ScreenPositionMGH = "385";
ScreenPositionBGH = "385";
ScreenPositionFGV = "212.5";
ScreenPositionMGV = "212.5";
ScreenPositionBGV = "212.5";
TimeOfLaunch = "0";
Launch0 = "978325200";
Launch1 = "981054000";
Launch2 = "984682800";
Launch3 = "989953200";
Launch4 = "995223600";
Launch5 = "999370800";
Launch6 = "1000148401";
Launch7 = "1004036401";
Launch8 = "1007406063";
Launch9 = "10099254240";
TimeOfLaunch = "978000000";
GaKoro = "0";
GaKoroVisited = "0";
GaKoro_Cog = "0";
BookOpen = "0";
BookMovieName = "book.swf";
if(Backpack eq "1")
{
	ShowBackPack = "1";
}
else
{
	ShowBackPack = "0";
	Backpack = "0";
}
Book = "0";
PoKoro = "0";
KohliBall = "0";
QuarryKey = "0";
KohliBallUsed = "0";
QuarryKeyUsed = "0";
Chisel = "0";
Biodermis = "0";
Comrade_1 = "blank.swf";
Comrade_2 = "blank.swf";
Comrade_3 = "blank.swf";
pBook_goat = "0";
OnukoroLava = "0";
OnukoroDoor = "0";
OnukoroRats = "0";
LavaBoard = "0";
LetterA = "0";
Gnomon = "0";
LeKoro = "0";
Flute = "0";
LoadedFlute = "0";
KahuRide = "0";
Language = "eng";
AllowTextSub = "1";
Ensign = "0";
KoKoro = "0";
FireStaff = "0";
Quest = "0";
cBarNum = "0";
Comrade_1 = "";
Comrade_2 = "";
Comrade_3 = "";
Comrade_4 = "";
Comrade_5 = "";
Comrade_6 = "";
cMaku = "0";
cKapura = "0";
cTamaru = "0";
cKopeke = "0";
cHafu = "0";
cTaipu = "0";
TaipuCanGo = "0";
FightWins = "0";
FightVisions = "0";
FightScreen = "1";
MakuHealth = "150";
KapuraHealth = "250";
TamaruHealth = "200";
KopekeHealth = "250";
HafuHealth = "300";
TaipuHealth = "400";
p8 = "0";
ltA = "0";
ltB = "0";
ltS = "0";
IltS = "0";
Gno = "0";
Ga_c = "0";
Ga_v = "0";
Bk = "0";
q_k = "0";
k_b = "0";
k_b_u = "0";
Chi = "0";
Onu_L = "0";
Onu_D = "0";
Onu_R = "0";
Lv_b = "0";
Fl = "0";
Kr = "0";
Taipu = "Free";
F_s = "0";
Ens = "0";
Kok = "0";
```

## `scripts` -> `frame 2`

Original:

```
StateLoaded = "0";
vars = "0";
notloggedin = "0";
nostate = "0";
servererror = "0";
loadVariables("getstate.asp","/");
```

```
loadVariables("getlanguage.asp","/");
loadVariables("getdate.asp","/");
loadMovie("blank.swf","Backpack");
```

Modified:

```
StateLoaded = "0";
vars = "0";
notloggedin = "0";
nostate = "0";
servererror = "0";
if(_level0 && _level0.__matanui)
{
	_level0.__matanui.getstate(eval("/"));
}
else if(_root && typeof _root.getstate_url == "string" && _root.getstate_url.length)
{
	loadVariables(_root.getstate_url,"/");
}
else
{
	loadVariables("getstate.asp","/");
}
```

```
if(_level0 && _level0.__matanui)
{
	_level0.__matanui.getlanguage(eval("/"));
}
else if(_root && typeof _root.getlanguage_url == "string" && _root.getlanguage_url.length)
{
	loadVariables(_root.getlanguage_url,"/");
}
else
{
	loadVariables("getlanguage.asp","/");
}
if(_level0 && _level0.__matanui)
{
	_level0.__matanui.getdate(eval("/"));
}
else if(_root && typeof _root.getdate_url == "string" && _root.getdate_url.length)
{
	loadVariables(_root.getdate_url,"/");
}
else
{
	loadVariables("getdate.asp","/");
}
loadMovie("blank.swf","Backpack");
```
