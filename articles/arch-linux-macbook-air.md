# Arch Linux on Macbooc Air - 2013

<div class="separator" style="clear: both; text-align: center;"><img border="0" src="https://storage.googleapis.com/backslash-project.appspot.com/static/Macbook-linux-white.png"/></div>

## Resources
- [Github user pandeiro's arch on air guide](https://github.com/pandeiro/arch-on-air)
- [Medium user @philpl article on running Arch Linux on Macbook](https://medium.com/@philpl/arch-linux-running-on-my-macbook-2ea525ebefe3)

And as always have the official guide in the back of your head:  
[Arch Linux wiki installation guide](https://wiki.archlinux.org/index.php/Installation_guide)

## Boot USB installer
Hold alt-key while restarting the MBA, select UEFI device.

## Installation
### Keyboard layout
Use `loadkeys no-latin1` (or your language) here as well. DON' try any of those mac layouts, it will switch everything around.

### Formatting
Leave 128mb after apple partitions, they say:  
take default start sector and add 128*2*1024 = 262144
373478472 + 262144 = 373740616  
start sector first: 373740616  
~~Apple HFS+ filetype = af00~~ don't need to create one with the setup I chose  
Linux swap filetype = 8200  

### Use MacOS boot partition
Is probably `/dev/sda1`
[GRUB to EFI directly](https://wiki.archlinux.org/index.php/Mac#Installing_GRUB_to_EFI_partition_directly)

### Networking during install

You will not make the Wifi on MBA work during install. You have options:
#### USB wired adapter
[D-Link USB DUB-1312](https://eu.dlink.com/uk/en/products/dub-1312-usb-3-gigabit-ethernet-adapter) usually works out of the box on Linux.
Plug in and type `$ ip a` it probably already works, if not try too boot up USB with the adapter and network already connected.

### USB mobile tethering
An alternative from the guide in my sources:
[Android tethering](https://wiki.archlinux.org/index.php/Android_tethering)

## Remember broadcom wireless
Install Broadcom dkms drivers
```sh
$ pacman -S linux-headers
$ pacman -S broadcom-wl-dkms dkms
```

## After install and first boot
### Network

#### Wifi
##### Network Manager
network manager is a better choice but not preinstalled.  
How to set wifi up with cli, this even works with a hidden SSID:
```sh
$ nmcli connection add type wifi con-name con1 ifname wlp3s0 ssid "MyHiddenOrNotSSID"
$ nmcli connection modify con1 wifi-sec.key-mgmt wpa-psk
$ nmcli connection modify con1 wifi-sec.psk "greatestpasswordever"
# setup done, then connect
$ nmcli connection up con1
```

##### netctl
as root run this to make wifi persist
```sh
$ wifi-menu      # select network, enter pw to create profile
$ ls /etc/netctl # to see the name of the profile just created
$ netctl enable wlp3s0-MyHomeWifiNetworkName
```

#### Wired
If you have a adapter and no network automatically works, try this:
`$ ip link show` and see if there is another device in addition to loopback.  
if there is, try to start systemd-networkd:

config file `/etc/systemd/network/50-temp.network`
```bash
[Match]
Name=enp0s20u1

[Network]
DHCP=ipv4
```
Services:

```sh
$ systemctl start systemd-networkd.service // up the device
$ systemctl start systemd-resolved.service // for DNS
```

### Touchpad
Install `libinput` package

setup `/etc/X11/xorg.conf.d/99-libinput.conf` like this:
```bash
Section "InputClass"
    Identifier "libinput touchpad catchall"
    MatchIsTouchpad "on"
    MatchDevicePath "/dev/input/event*"
    Driver "libinput"
    Option "Tapping" "True"
    Option "DisableWhileTyping" "True"
    Option "NaturalScrolling" "true"
EndSection
```
Reference:  
[Arch article on MacBook and Trackpad](https://wiki.archlinux.org/index.php/MacBookPro11,x#Touchpad)

### Sound
First install alsamixer
```sh
$ sudo pacman -S alsa-utils
```
Then run `alsamixer` and unmute `HDA Intel PCH`, toggle with `m`  

Then install `pulseaudio`, `volumeicon` and `pavucontrol` to control stuff easier.

### Screen Display
To set your default backlight value, that will be set on reboot and resume  
Set something between 0 and 100
```sh
# get current
$ cat /sys/class/backlight/acpi_video0/brightness
# get max
$ cat /sys/class/backlight/acpi_video0/max_brightness
# only root can set
$ sudo su
$ echo 50 > /sys/class/backlight/acpi_video0/brightness
```

#### Xbacklight
This will temporarily set backlight, resets on reboot and resume  
Can be used for hotkeys, see [Functionkeys](#functionkeyssetbacklightandvolume)
```sh
$ sudo pacman -S xorg-xbacklight
$ xbacklight -set 50 # is %
```

### Keyboard
[Arch Linux Apple keyboard article](https://wiki.archlinux.org/index.php/Apple_Keyboard)  

#### Function keys setup
Need to use fn-key to get F[num] function  
edit file `/etc/modprobe.d/hid_apple.conf` and add this:  
```bash
options hid_apple fnmode=2
```

#### Function keys set backlight and volume
Add this to config:
```bash
# Screen brightness controls 
bindsym XF86MonBrightnessUp exec xbacklight -inc 10
bindsym XF86MonBrightnessDown exec xbacklight -dec 10

# Pulse Audio controls
bindsym XF86AudioRaiseVolume exec --no-startup-id pactl set-sink-volume 0 +5%
bindsym XF86AudioLowerVolume exec --no-startup-id pactl set-sink-volume 0 -5%
bindsym XF86AudioMute exec --no-startup-id pactl set-sink-mute 0 toggle
```
#### < and | is switched
Create .Xmodmap in home folder containing this:  
```bash
keycode  94 = bar section grave asciitilde brokenbar paragraph
keycode  49 = less greater less greater onehalf threequarters onehalf threequarters
```
Put this in your shells startup file somehow, i.e for i3 `.config/i3/config`, after eventual setxkbmap commands:  
```bash
exec "xmodmap $HOME/.Xmodmap"
```

If others keys are wrong, look at all current bindings with this command and then change accordingly in .Xmodmap:  
```sh
$ xmodmap -pke
```
