# FreeBSD install notes
<div class="separator" style="clear: both; text-align: center;"><img border="0" src="https://storage.googleapis.com/atle-static/pics/freebsdgreen.png"/></div>
## U2F / Yubikey
Install this package:
```sh
https://www.freshports.org/security/u2f-devd
```

## Xorg

Just install
```sh
pkg install xorg
```
Make sure that `/etc/xorg.conf` and `/usr/local/etc/X11/xorg.conf` does not exists

### Nvidia drivers
[Nvidia article forum](https://forums.freebsd.org/threads/howto-setup-xorg-with-nvidias-driver.52311/)

#### Enable Linux
Edit `/boot/loader.conf` and add text:
```sh
linux_load="YES"
```

#### Install driver
```sh
pkg install nvidia-driver
sysrc kld_list+="nvidia-modeset # adds to /etc/rc.conf
```
Then add `/usr/local/etc/X11/xorg.conf.d/driver-nvidia.conf` and type
```sh
Section "Device"
    Identifier "NVIDIA Card"
    VendorName "NVIDIA Corporation"
    Driver "nvidia"
EndSection
```
## Font
```sh
sudo pkg install dejavu liberation-fonts-ttf droid-fonts-ttf ubuntu-font roboto-fonts-ttf noto
```
## Bash
```sh
sudo pkg install bash
chsh -s /usr/local/bin/bash
```
