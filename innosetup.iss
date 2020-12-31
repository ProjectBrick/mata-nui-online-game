[Setup]
AppId="{#VarId}"
AppName="{#VarName}"
AppVersion="{#VarVersion}"
VersionInfoVersion="{#VarVersion}"
AppCopyright="{#VarCopyright}"
AppPublisher="{#VarPublisher}"
DefaultDirName="{autopf}\{#VarNameFile}"
DefaultGroupName="{#VarNameFile}"
AllowNoIcons="yes"
LicenseFile="{#VarLicense}"
SetupIconFile="{#VarIcon}"
WizardSmallImageFile="{#VarWizardImageHeader}"
WizardImageFile="{#VarWizardImageSidebar}"
WizardImageAlphaFormat="{#VarWizardImageAlphaFormat}"
PrivilegesRequiredOverridesAllowed="dialog"
OutputDir="{#VarOutDir}"
OutputBaseFilename="{#VarOutFile}"
Compression="lzma"
SolidCompression="yes"
WizardStyle="modern"
ArchitecturesInstallIn64BitMode="{#VarArchitecturesInstallIn64BitMode}"
ArchitecturesAllowed="{#VarArchitecturesAllowed}"

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"

[Files]
Source: "{#VarSource}"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs

[Icons]
Name: "{group}\{#VarNameFile}"; Filename: "{app}\{#VarExeName}"
Name: "{group}\{#VarReadMeName}"; Filename: "{app}\{#VarReadMeFile}"
Name: "{group}\{cm:UninstallProgram,{#VarNameFile}}"; Filename: "{uninstallexe}"
Name: "{autodesktop}\{#VarNameFile}"; Filename: "{app}\{#VarExeName}"; Tasks: desktopicon

[Run]
Filename: "{app}\{#VarExeName}"; Description: "{cm:LaunchProgram,{#StringChange(VarName, '&', '&&')}}"; Flags: nowait postinstall skipifsilent
