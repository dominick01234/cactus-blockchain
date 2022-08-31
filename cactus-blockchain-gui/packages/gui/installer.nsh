!include "nsDialogs.nsh"

; Add our customizations to the finish page
!macro customFinishPage
XPStyle on

Var DetectDlg
Var FinishDlg
Var CactusSquirrelInstallLocation
Var CactusSquirrelInstallVersion
Var CactusSquirrelUninstaller
Var CheckboxUninstall
Var UninstallCactusSquirrelInstall
Var BackButton
Var NextButton

Page custom detectOldCactusVersion detectOldCactusVersionPageLeave
Page custom finish finishLeave

; Add a page offering to uninstall an older build installed into the cactus-blockchain dir
Function detectOldCactusVersion
  ; Check the registry for old cactus-blockchain installer keys
  ReadRegStr $CactusSquirrelInstallLocation HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\cactus-blockchain" "InstallLocation"
  ReadRegStr $CactusSquirrelInstallVersion HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\cactus-blockchain" "DisplayVersion"
  ReadRegStr $CactusSquirrelUninstaller HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\cactus-blockchain" "QuietUninstallString"

  StrCpy $UninstallCactusSquirrelInstall ${BST_UNCHECKED} ; Initialize to unchecked so that a silent install skips uninstalling

  ; If registry keys aren't found, skip (Abort) this page and move forward
  ${If} CactusSquirrelInstallVersion == error
  ${OrIf} CactusSquirrelInstallLocation == error
  ${OrIf} $CactusSquirrelUninstaller == error
  ${OrIf} $CactusSquirrelInstallVersion == ""
  ${OrIf} $CactusSquirrelInstallLocation == ""
  ${OrIf} $CactusSquirrelUninstaller == ""
  ${OrIf} ${Silent}
    Abort
  ${EndIf}

  ; Check the uninstall checkbox by default
  StrCpy $UninstallCactusSquirrelInstall ${BST_CHECKED}

  ; Magic create dialog incantation
  nsDialogs::Create 1018
  Pop $DetectDlg

  ${If} $DetectDlg == error
    Abort
  ${EndIf}

  !insertmacro MUI_HEADER_TEXT "Uninstall Old Version" "Would you like to uninstall the old version of Cactus Blockchain?"

  ${NSD_CreateLabel} 0 35 100% 12u "Found Cactus Blockchain $CactusSquirrelInstallVersion installed in an old location:"
  ${NSD_CreateLabel} 12 57 100% 12u "$CactusSquirrelInstallLocation"

  ${NSD_CreateCheckBox} 12 81 100% 12u "Uninstall Cactus Blockchain $CactusSquirrelInstallVersion"
  Pop $CheckboxUninstall
  ${NSD_SetState} $CheckboxUninstall $UninstallCactusSquirrelInstall
  ${NSD_OnClick} $CheckboxUninstall SetUninstall

  nsDialogs::Show

FunctionEnd

Function SetUninstall
  ; Set UninstallCactusSquirrelInstall accordingly
  ${NSD_GetState} $CheckboxUninstall $UninstallCactusSquirrelInstall
FunctionEnd

Function detectOldCactusVersionPageLeave
  ${If} $UninstallCactusSquirrelInstall == 1
    ; This could be improved... Experiments with adding an indeterminate progress bar (PBM_SETMARQUEE)
    ; were unsatisfactory.
    ExecWait $CactusSquirrelUninstaller ; Blocks until complete (doesn't take long though)
  ${EndIf}
FunctionEnd

Function finish

  ; Magic create dialog incantation
  nsDialogs::Create 1018
  Pop $FinishDlg

  ${If} $FinishDlg == error
    Abort
  ${EndIf}

  GetDlgItem $NextButton $HWNDPARENT 1 ; 1 = Next button
  GetDlgItem $BackButton $HWNDPARENT 3 ; 3 = Back button

  ${NSD_CreateLabel} 0 35 100% 12u "Cactus has been installed successfully!"
  EnableWindow $BackButton 0 ; Disable the Back button
  SendMessage $NextButton ${WM_SETTEXT} 0 "STR:Let's Farm!" ; Button title is "Close" by default. Update it here.

  nsDialogs::Show

FunctionEnd

; Copied from electron-builder NSIS templates
Function StartApp
  ${if} ${isUpdated}
    StrCpy $1 "--updated"
  ${else}
    StrCpy $1 ""
  ${endif}
  ${StdUtils.ExecShellAsUser} $0 "$launchLink" "open" "$1"
FunctionEnd

Function finishLeave
  ; Launch the app at exit
  Call StartApp
FunctionEnd

; Section
; SectionEnd
!macroend
