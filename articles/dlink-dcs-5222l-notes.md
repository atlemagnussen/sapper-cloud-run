# D-Link DCS-5222L notes on how to upgrade and general usage

## Upgrade firmware

### Check current version

Log in to your camera locally, you need to know your camera's IP address on the local network. Mine is is `192.168.1.50` so I will go to `http://192.168.1.50` in my web browser. There you will be challenged to login. Username will be `admin` unless you configured something else. The password was hopefully set by you the initial setup of your camera.

Then navigate to `Maintenance` on the top navigation bar, then `Firmware upgrade` on the left navigation bar and you will see something like this screenshot:  
![dlink dcs-5222l maintenance](https://storage.googleapis.com/atle-static/pics/dlink-dcs5222l-firmware-upgrade-page.jpg)

The current version in this example is `2.03.01`.

### Find latest firmware

Go to [D-Link DCS-5222L technical support downloads](https://support.dlink.com/productinfo.aspx?m=DCS-5222L) and select your revision A or B. There you will find firmware among other downloads and you see which is the latest version, screenshot:  
![dlink dcs-5222l support downloads](https://storage.googleapis.com/atle-static/pics/dlink-support-dcs-5222l-downloads.jpg)

The latest available version in this example is `2.16.03`

If your current version is outdated, download the latest now and proceed.

### Execute the upgrade

When I wrote this the latest version was a file with the name `DCS-5222L_REVB_FIRMWARE_v2.16.03_HOTFIX.zip`  
Now you need to unzip this, because it's the **.bin** file we are interested in.

Select the file and hit **upload** in the maintenance/firmware upgrade window, same as where you found your current version.

Your camera will blink a red light and your browser will be loading while the updating takes place.

![dlink dcs 5222l upgrading](https://storage.googleapis.com/atle-static/pics/dlink-dcs-5222l-upgrading.jpg)

After a time your browser maybe reload to the main page, if not, just re-enter your ip url - in my case `http://192.168.1.50`  
And it should now say `Current Firmware Version: 2.16.03`
