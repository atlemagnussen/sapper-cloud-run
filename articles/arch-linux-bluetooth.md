# Bluetooth Arch Linux

How to make the blueooth headphones work with Arch Linux

## Install

```sh
sudo pacman -S bluez bluez-utils
sudo pacman -S pulseaudio-alsa pulseaudio-bluetooth
```

## Start service
```sh
sudo systemctl start bluetooth
sudo systemctl enable bluetooth
```

## Pair and connect
Enter bluetoothctl
```sh
bluetoothctl
```

Will get you into a new command line interface  

Type `list` to see bluetooth controller is present on the computer  
If yes make your headphone ready for `pairing` and follow this:
```sh
[bluetooth]# power on
[bluetooth]# agent on
[bluetooth]# default-agent
[bluetooth]# scan on
[bluetooth]# devices 
```

The last command will start listing devices, you should see a MAC address and a name which will help you recognize the right device. Copy the MAC addres and then
```sh
[bluetooth]# pair 12:34:56:78:90:AB
[bluetooth]# trust 12:34:56:78:90:AB
[bluetooth]# connect 12:34:56:78:90:AB
```

## Power on at boot
Edit file `/etc/bluetooth/main.conf`

Set this to enable by default
```bash
[Policy]
AutoEnable=true

```
