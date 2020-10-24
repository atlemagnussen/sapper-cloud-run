# Scanners on Linux - Project SANE - Tested with Raspberry Pi as server sharing a Canon MG6150 over the LAN

<a href="https://4.bp.blogspot.com/-UBxvwe4jBow/Xax8scLQs3I/AAAAAAABmiI/gjOZXU1pozwBn-sOgfgK756lLO1chsVEQCLcBGAsYHQ/s1600/scanner2.jpg" imageanchor="1" ><img border="0" src="https://4.bp.blogspot.com/-UBxvwe4jBow/Xax8scLQs3I/AAAAAAABmiI/gjOZXU1pozwBn-sOgfgK756lLO1chsVEQCLcBGAsYHQ/s320/scanner2.jpg" width="320" height="305" data-original-width="1230" data-original-height="1173" /></a>

So you might have tried to install some 8 year old drivers from Canon on an up-to-date Linux distribution. It will not remotely work in any ways. Turns out we have great open source alternatives with a lot of support

### For printers you have [CUPS](https://www.cups.org/) and for scanners you have [SANE](http://www.sane-project.org/).

They pretty much saves the day if you don't want to have a dedicated Windows PC just for scanning or printing every once in a while. As the world shifts to the full digital age, it's less and less common to perform these tasks. Yet when you need the old hardware to work, you need it badly. Printers are not famous for being very trustworthy or stable. Because after all, the manufacturers make money on the ink and not on good hardware. It's a perfect usecase for a tiny Raspberry Pi, as these tasks don't require much horse power.

*Even though you have one device for both scanner and printer, they are separate things. Nowadays multi-function boxes like this is pretty common, but the software is still pretty different for scanning and printing. Also the official Windows drivers and software are separate*

## This article is for the scanning part

First and foremost, this is a setup that works both for LAN connection and USB connection as I figured out for this particular scanner, Canon MG6150. You should just try with LAN if you are doing this with a network enabled device, then try USB if it's doesn't work.

## Server - Raspberry Pi
So I won't cover setting up a Pi with Raspbian OS. You can go to [Raspberry PI](https://www.raspberrypi.org/downloads/raspbian/) homepages to find that  
*You can use any PC you want for this of course, old or new, big or small*
### Installing SANE
```terminal
sudo apt install sane-utils
```
Most distros have SANE in their main repositories. So this should install what you need.

### Detect the scanner
```terminal
scanimage -L
```

If you have a working LAN connection to your scanner it might look like this:  
`device pixma:MG6100_Canon6150-wired' is a CANON Canon PIXMA MG6100 multi-function peripheral`

For USB it might look like this:  
`device pixma:04A9174A_41A152' is a CANON Canon PIXMA MG6100 multi-function peripheral`

#### Troubleshooting LAN detection
I don't know excactly what makes my scanner work with LAN. Other than of course with the official Windows driver it also works and it's a network multi-function printer.
If you know your scanner's IP-address, type it into the browser and see if you can get a settings page.
Or go through your settings manually on the scanner's own screen and menu system -
and try to enable everything you can find. For Canon there are some stuff under "Other settings":  
`WSD - LLTD - Bonjour - LPR - all enabled`

#### Troubleshooting USB detection
If you have trouble finding anything, try with `lsusb` and see if there is anything like this  
`Bus 001 Device 004: ID 04a9:174a Canon, Inc.`

If this does not work, try `sudo sane-find-scanner`, it might return something like this  
`found USB scanner (vendor=0x04a9 [Canon], product=0x174a [MG6100 series]) at libusb:001:004`

### Testing the scanner on the server
So if *scanimage -L* returns something, it's time to test actual scanning, stick a picture in there and type:  
```terminal
scanimage > test.ppm
```  
the file will be an image that you can open in Gimp for verification. You can actually use this command line tool as your primary scanner client if you don't mind. See -h for options and you will see that you can controll all typical settings like resolution and colors and so on.

### Sharing the scanner over LAN
Once you have successfully test scanned from your Raspberry Pi scanner server, it's time to share.
```terminal
sudo nano /etc/sane.d/saned.conf
```
and uncomment `192.168.1.0/24` for enabling you typical LAN subnet, or just type a single or more IP addresses to enable access to saned from other computers

*If you have a firewall enabled you should open up for incoming connections on port 6566*

Then start the socket service (if you use systemd)
```terminal
sudo systemctl start saned.socket
```

#### Making it still share after reboot
Still systemd, enable saned.socket to start on boot by typing:
```terminal
sudo systemctl enable saned.socket
```

## The client
This should be the easy part if no network or firewall magic is playing its games with you. Installation command is the same as for the server:
```terminal
sudo apt install sane-utils
```
But this time you only need to edit this file:
`sudo nano /etc/sane.d/net.conf`and set the server's ip and a timeout
**connect_timeout = 60**  
**192.168.1.6**

### Test on the client
Familiar command:  
`scanimage -L` for listing, should look something like this  
`device net:192.168.1.6:pixma:MG6100_Canon6150-wired' is a CANON Canon PIXMA MG6100 multi-function peripheral`

Then `scanimage > test.ppm` to test scanning

If you got this far you might be good enough, as I said this is as good a client.

### Graphical client
Enter [gscan2pdf](http://gscan2pdf.sourceforge.net/)
The project is still pouring out new versions in 2018. Amazing, and it warms my heart when I see open source projects like this endure. To get the latest explore the official good old sourceforge page. Or just get whatever version apt has to offer
```terminal
sudo apt install gscan2pdf
```
This client is pretty much as good as it gets.

## A typical problem
If you have a problem on the client, try to see log files on the server, a quick way is asking systemd right after the error occours.
```terminal
sudo systemctl status saned.socket
```

If the error is this one:
>saned.socket: Too many incoming connections (1), dropping connection.

then I have a tip
It seems like the default socket file `/lib/systemd/system/saned.socket` always has a setting like this  
`MaxConnections=1`

So it only accepts one connection, which you will run into pretty fast:
Fix this by copying the file over to the etc/systemd file structure and edit it
```terminal
sudo cp /lib/systemd/system/saned.socket /etc/systemd/system/saned.socket
```
Change the MaxConnection to something higher like  
`MaxConnections=50`

Then reload and restart:
```terminal
sudo systemctl daemon-reload
sudo systemctl restart saned.socket
```
And you should be good
