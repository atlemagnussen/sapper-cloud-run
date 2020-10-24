# nmcli - network manager command line interface - how to
<div class="separator" style="clear: both; text-align: center;"><img border="0" src="https://4.bp.blogspot.com/-FQZf0vxPd0U/XctEMgG5oxI/AAAAAAABm6A/Jg9EzUZemEU5tmIX6ghIHzPrt3d__NFQACLcBGAsYHQ/s320/nmcli-examples.jpg" width="320" height="265" data-original-width="499" data-original-height="413" /></div>

Are you looking for a command line way of doing another typical graphical task? Well, here it is. [Network Manager](https://wiki.gnome.org/Projects/NetworkManager) is very well known in Linux as **the** GUI tool for wireless network management. Originally developed by Redhat.  
But, it also have a cli sibling that I like even better. Just because of the simple fact that when I have set it all up, I just need to search in my bash history or remember `nmcli connection up xxx`, with help of autocomplete, to reconnect. Since network manager also supports dbus, it also works with my home made [dwm status bar](https://github.com/atlemagnussen/dbus-bar) :)  

Anyhow, if you want the full documentation go to the official gnome page [here](https://developer.gnome.org/NetworkManager/stable/nmcli.html). I will write briefly on some of my favorite useful commands. And hey, network manager works for wired connections as well.
## Wireless

### Check if wifi is enabled
```sh
nmcli radio
```
Will respond like this if it's ok
```sh
WIFI-HW  WIFI     WWAN-HW  WWAN
enabled  enabled  enabled  enabled
```

### List devices to see wifi device name
```sh
nmcli device
```
Will respond something like this
```sh
DEVICE  TYPE      STATE         CONNECTION
wlp3s0  wifi      disconnected  --
lo      loopback  unmanaged     --
```
So wlp3s0 is the device name that we will use later


### List all wifi networks available
```sh
nmcli device wifi rescan
nmcli device wifi list
```

### Simple connect to wifi network
This option does not save the connection for later

```sh
nmcli device wifi connect MyVisibleSSID password MySuperSecretPassword
```

### Create a saved connection
This will save a connection that you can connect to later without prompting the password each time  
This will also work if you have hidden SSID
```sh
nmcli connection add type wifi con-name con1 ifname wlp3s0 ssid "MyHiddenOrNotSSID"
nmcli connection modify con1 wifi-sec.key-mgmt wpa-psk
nmcli connection modify con1 wifi-sec.psk "MySuperSecretPassword"
```

### Connect to a saved connection
```sh
nmcli connection up con1
```
