# Raspberry Pi and Xbox controllers

Ok this is typically a thing to do with a [RetroPie](https://retropie.org.uk/) setup right. But I name the article `Raspberry Pi and Xbox controllers` since you actually can use Xbox controllers without RetroPie as well for other stuff.

Credits:

-   [The Geek Pub - Using Xbox One controllers on a Raspberry Pi](https://www.thegeekpub.com/16265/using-xbox-one-controllers-on-a-raspberry-pi/)

## Xbox One S controller with bluetooth

First we need to disable Enhanced Re-Transmission Mode (ERTM) to be able to pair without error messages

```sh
$ sudo bash -c 'echo 1 > /sys/module/bluetooth/parameters/disable_ertm'
```

Then we open the famliar [bluez]() bluetooth config tool

```sh
$ sudo bluetoothctl
```
