# Samsung Galaxy S9 bloatware removal without rooting

<div class="separator" style="clear: both; text-align: center;"><img width="400" border="0" src="https://storage.googleapis.com/atle-static/pics/android_robot.png"/></div>

## Introduction

<details>
<summary>
<span class="closed">Click to read intro</span>
<span class="open">close</span>
</summary>
The background for this article is the fact that Samsung contains an infamous number of preinstalled apps on their phones which you cannot remove easily because they are installed as "system apps". Among them is Facebook and many more...

So I had to find a way to remove some of the apps I **never ever use** and see if my battery life will improve. As of before this guide was written it will not last a full day. But I would not take the risk of rooting the phone and/or install custom ROM.

In other words this article contains a list of packages/bloatware I have tested removing on my Galaxy S9 and verified that the phone still works.  
I have connected the phone to a computer and used the [adb](https://developer.android.com/studio/command-line/adb) command line tool to remove the packages without rooting the phone.  

To learn how to connect phone and remove packages using `adb` see [XDA developers debloat guide](https://www.xda-developers.com/uninstall-carrier-oem-bloatware-without-root-access/)  

Inspiration to which packages to remove I got from [XDA Developers Forum S10 bloatware list](https://forum.xda-developers.com/galaxy-s10/how-to/galaxy-s10-s10-debloat-bloatware-t3912073)
</details>


## TLDR adb connection guide
<details>
<summary>
<span class="closed">Click to read quick connection guide</span>
<span class="open">close</span>
</summary>
Once you have `adb`, set allow `USB debugging` on your phone and connected the phone to your computer with USB, enter this in your terminal
```
adb devices
```
If you get some output like this
```bash
List of devices attached
2cd02add38057ece        device
```
You are good to go, enter the shell
```sh
adb shell
```
Should look like this
```bash
starlte:/ $
```
</details>

## Android Package Manager
<details>
<summary>
<span class="closed">Click to read general info on the package manager</span>
<span class="open">close</span>
</summary>
Once you are inside `adb shell` you can do the following operations using [Android Package manager pm](http://adbcommand.com/adbshell/pm)

List all packages
```sh
pm list packages
```

List limited set of packages i.e containing `facebook`
```sh
pm list packages | grep facebook
```

Should output
```bash
package:com.facebook.katana
package:com.facebook.system
package:com.facebook.services
package:com.facebook.appmanager
```

To uninstall a package
```sh
pm uninstall -k --user 0 com.facebook.katana
```
Should output
```bash
Success
```
</details>

## Tested and verified uninstalls

### Facebook
```sh
pm uninstall -k --user 0 com.facebook.katana
pm uninstall -k --user 0 com.facebook.system
pm uninstall -k --user 0 com.facebook.appmanager
pm uninstall -k --user 0 com.facebook.services
```

### Samsung Pass / Pay
```sh
pm uninstall -k --user 0 com.samsung.android.samsungpassautofill
pm uninstall -k --user 0 com.samsung.android.authfw
pm uninstall -k --user 0 com.samsung.android.samsungpass
pm uninstall -k --user 0 com.samsung.android.spay
pm uninstall -k --user 0 com.samsung.android.spayfw
```

### Samsung Game launcher
```sh
pm uninstall -k --user 0 com.samsung.android.game.gamehome
pm uninstall -k --user 0 com.enhance.gameservice
pm uninstall -k --user 0 com.samsung.android.game.gametools
pm uninstall -k --user 0 com.samsung.android.game.gos
```

### Bixby
```sh
pm uninstall -k --user 0 com.samsung.android.bixby.wakeup
pm uninstall -k --user 0 com.samsung.android.app.spage
pm uninstall -k --user 0 com.samsung.android.bixby.service
pm uninstall -k --user 0 com.samsung.android.visionintelligence
pm uninstall -k --user 0 com.samsung.android.bixby.agent
pm uninstall -k --user 0 com.samsung.android.bixby.agent.dummy
pm uninstall -k --user 0 com.samsung.android.bixbyvision.framework # keep this for barcode-scanning in stock camera app
pm uninstall -k --user 0 com.samsung.android.app.settings.bixby
pm uninstall -k --user 0 com.samsung.systemui.bixby2
```

### Gimmicky apps
```sh
pm uninstall -k --user 0 com.samsung.android.aremoji
pm uninstall -k --user 0 com.google.ar.core
pm uninstall -k --user 0 com.samsung.android.da.daagent
```

### Microsoft apps
```sh
pm uninstall -k --user 0 com.microsoft.office.excel
pm uninstall -k --user 0 com.microsoft.skydrive
pm uninstall -k --user 0 com.microsoft.office.outlook
pm uninstall -k --user 0 com.microsoft.office.word
pm uninstall -k --user 0 com.microsoft.office.powerpoint
```

### Gear VR
```sh
pm uninstall -k --user 0 com.samsung.android.hmt.vrsvc
pm uninstall -k --user 0 com.google.vr.vrcore
```

### Samsung DEX (desktop docking stuff)
```sh
pm uninstall -k --user 0 com.sec.android.desktopmode.uiservice
pm uninstall -k --user 0 com.samsung.desktopsystemui
pm uninstall -k --user 0 com.sec.android.app.desktoplauncher
```

### Printing
```sh
pm uninstall -k --user 0 com.android.bips
pm uninstall -k --user 0 com.google.android.printservice.recommendation
pm uninstall -k --user 0 com.android.printspooler
```

### Samsung Mail
```sh
pm uninstall -k --user 0 com.samsung.android.email.provider
pm uninstall -k --user 0 com.wsomacp
```

### Samsung Internet (browser)
```sh
pm uninstall -k --user 0 com.sec.android.app.sbrowser
pm uninstall -k --user 0 com.samsung.android.app.sbrowseredge
```

### Samsung LED cover
```sh
pm uninstall -k --user 0 com.samsung.android.app.ledcoverdream
pm uninstall -k --user 0 com.sec.android.cover.ledcover

```

### Samsung Kids
```sh
pm uninstall -k --user 0 com.samsung.android.kidsinstaller
pm uninstall -k --user 0 com.samsung.android.app.camera.sticker.facearavatar.preload
```

### Samsung Edge
```sh
pm uninstall -k --user 0 com.samsung.android.service.peoplestripe
```

### Car mode
```sh
pm uninstall -k --user 0 com.samsung.android.drivelink.stub
```

## More Uninstalls I have not tested yet
- General System apps
