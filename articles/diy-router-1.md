# Raspberry Pi 3 Model B+ DIY basic router
Hello to you!  
Are you seeking out how to do a "Do It Yourself" router? You have come to the right place!

Your router is your gateway to the internet, which means the world today.  
This thing is a *completely underrated device* in a world of smart-this and smart-that.  
Think *security*. Does your cheap router have a backdoor? Outdated firmware with a lot of known vulnerabilities?  
Is your current router just a general pain that will not even do what you want?  
No way you can enable a VPN server on it?  
What about stability, usually rebooting it every week?

I can go on and on  
After 2 decades of experience it's all pretty clear to me: *Consumer market routers* is just a bunch of *crappy things* which are both too complex and too cheap. They usually are both router, switch and Wifi access points. If one of these components fail, you must go buy a whole new crappy device.  
And what's up with the space ship looks ?!  

![Asus spaceship](https://s3-eu-west-1.amazonaws.com/atle-static/Asus_spaceship.png)


The point being, you should separate the router from the wifi access point and regain control. Because the router includes a lot of setup, like static IP addresses and port forwardings and so on. And it should contain your firewall rules.
The setup of your router are things your should fully control, have full backup of and it should run on an always  updated system. The wireless part should just be an extension of the router's network, and provide little setup except the security password.  

Personally I now have a DIY router and a Netgear Orbi mesh network serving the wireless part of my home. If the Netgear Orbi where to be broken tomorrow, I go buy a new one


a DIY router will give you a lot of benefits:
- Control.
  * You will know excactly what is going on in your router
- Updated firmware, as it is based on an ordinary Linux distro
- Learning network


## Part 1

I will actually break this into parts. And I start with just getting **IPv4** working, with the following functions:

* routing
* dhcp server
* dns server
* basic firewall

And just to underline it

* No IPv6, will add this in a separate article
* No WiFi

![RaspberryPi3Bplus](https://s3-eu-west-1.amazonaws.com/atle-static/rasppi3.jpg)  

I am using latest Raspbian Stretch as of now, which is 25 september 2018.

You will need an additional USB Ethernet adapter. I use [D-Link DUB-1312](https://eu.dlink.com/uk/en/products/dub-1312-usb-3-gigabit-ethernet-adapter) just because it was the first one I found that works out of the box on Linux.

Big thanks to:

* [The Ars guide to building a Linux router from scratch](https://arstechnica.com/gadgets/2016/04/the-ars-guide-to-building-a-linux-router-from-scratch/) whom I basically copied a lot from, I just made it work for an up-to-date rPi


Through this guide I will use **eth0** for **WAN** interface and **eth1** for **LAN** interface  

Let's not get caught up in typos along the way folks!  

I will ask you to start out with connecting a keyboard to your rPi and work locally. Which means you will have to hook it up to a screen as well.  
I will tell you when you can safely board over to SSH and disconnect the screen and keyboard.  

### Disable IPv6 for now

Depending on your ISP, the rPi might fetch some IPv6 setup. It might work out of the box - or not.  
In my case I got IPv6 address but nothing works. So everytime I tried to do stuff on internet like `sudo apt update`  
it would just waste my time waiting...  

Ultimately in a follow-up article we want IPv6 to be running smoothly right alongside IPv4 in a dualstack setup.
I admit it, IPv4 feels simpler because it is so familiar. And when it comes to all the initial stuff you just don't want to bite off more than you can chew.  
Basically disable IPv6 for now and focus on IPv4 first.


For now, edit `/etc/sysctl.conf` and add:
```
net.ipv6.conf.all.autoconf=0
net.ipv6.conf.all.disable_ipv6=1
```

### Upgrade OS
If you haven't done it before, do it now:
```
sudo apt update
sudo apt upgrade
```
### Add initial interfaces setup

Debian/Raspbian seems to be shipping with an empty `/etc/network/interfaces` file nowadays and leaving us with a reference to `/etc/dhcpcd.conf`:
```
# interfaces(5) file used by ifup(8) and ifdown(8)

# Please note that this file is written to be used with dhcpcd
# For static IP, consult /etc/dhcpcd.conf and 'man dhcpcd.conf'
```

What this actually means is that dhcpcd is now default client i Raspbian. It's nice, it is zeroconf approach, but we will not use it here.  
The startup-script for dhcpcd will check if you have added anything important in the interfaces file.  
If it finds something, dhcpcd will not run, excactly what we want.


Now add to `/etc/network/interfaces`:

```
auto lo
iface lo inet loopback

#WAN
auto eth0
allow-hotplug eth0
iface eth0 inet dhcp

#LAN
auto eth1
iface eth1 inet static
        address 192.168.1.1
        netmask 255.255.255.0
```

### Reboot and see
Check if the new static ip address for LAN is set to 192.168.1.1 on bootup before proceeding. If not it will cause trouble, cause this will be the gateway for the other devices that hooks up to this router. See this as a checkpoint!  
WAN will get a IP address from your ISP.
### Enable routing IPv4

This sounds almost too easy, but edit a boolean to get routing for ipv4 going.

Again edit `/etc/sysctl.conf`:
```
# Uncomment the next line to enable packet forwarding for IPv4
net.ipv4.ip_forward=1
```

Now you officially have a router! But we need some more stuff to make it work like we're used to.

### DHCP server

Our DHCP server will be responsible for handing out the local IPv4 addresses.  
#### Install
```
sudo apt install isc-dhcp-server
```

#### Set only ipv4 at first

edit file `/etc/default/isc-dhcp-server` :
```
INTERFACESv4="eth1"
INTERFACESv6=""
```
#### Add config

Edit file `/etc/dhcp/dhcpd.conf`:
```
default-lease-time 600;
max-lease-time 7200;

ddns-update-style none;

subnet 192.168.1.0 netmask 255.255.255.0 {
        range 192.168.1.100 192.168.1.250;
        option routers 192.168.1.1;
        option domain-name-servers 192.168.1.1;
        option broadcast-address 192.168.1.255;
}
```
Enable new rules by restarting:
```
sudo systemctl restart isc-dhcp-server.service
```
if something fails, check status and see if the error message will help you out:
```
sudo systemctl status isc-dhcp-server.service
```
### DNS server

Just install and start this will not need any more configuration:
```
sudo apt install bind9
sudo systemctl start bind9.service
```

### IPtables
A router without a firewall is just not a good idea. But in your testing stage you can opt out of this and see if you get things working without it.
And you can also selected another firewall approach, like ufw instead of the barebone iptables,\.

**Initial Setup wil consist of**  

- Accept ICMP like ping, loopback, traceroute
- Accept DNS internally
- Accept SSH internally
- Accept DHCP internally
- Accept forwarding from LAN to WAN
- NAT example for port 80
- Drop everything else

#### init iptables script
Add a file in `/etc/network/if-pre-up.d/iptables-init`:
```
#!/bin/sh
/sbin/iptables-restore < /etc/network/iptables.rules.v4
```

Make the script executable:
```
sudo chmod +x /etc/network/if-pre-up.d/iptables-init.sh
```

Then add this into `/etc/network/iptables.rules.v4`:
```
*nat
:PREROUTING ACCEPT [0:0]
:INPUT ACCEPT [0:0]
:OUTPUT ACCEPT [0:0]
:POSTROUTING ACCEPT [0:0]

# eth0 is WAN interface, #eth1 is LAN interface
-A POSTROUTING -o eth0 -j MASQUERADE

# NAT pinhole: HTTP from WAN to LAN
-A PREROUTING -p tcp -m tcp -i eth0 --dport 80 -j DNAT --to-destination 192.168.1.100:80

COMMIT

*filter
:INPUT ACCEPT [0:0]
:FORWARD ACCEPT [0:0]
:OUTPUT ACCEPT [0:0]

# Service rules

# basic global accept rules - ICMP, loopback, traceroute, established all accepted
-A INPUT -s 127.0.0.0/8 -d 127.0.0.0/8 -i lo -j ACCEPT
-A INPUT -p icmp -j ACCEPT
-A INPUT -m state --state ESTABLISHED -j ACCEPT

# enable traceroute rejections to get sent out
-A INPUT -p udp -m udp --dport 33434:33523 -j REJECT --reject-with icmp-port-unreachable

# DNS - accept from LAN
-A INPUT -i eth1 -p tcp --dport 53 -j ACCEPT
-A INPUT -i eth1 -p udp --dport 53 -j ACCEPT

# SSH - accept from LAN
-A INPUT -i eth1 -p tcp --dport 22 -j ACCEPT

# DHCP client requests - accept from LAN
-A INPUT -i eth1 -p udp --dport 67:68 -j ACCEPT

# drop all other inbound traffic
-A INPUT -j DROP

# Forwarding rules

# forward packets along established/related connections
-A FORWARD -m conntrack --ctstate RELATED,ESTABLISHED -j ACCEPT

# forward from LAN (eth1) to WAN (eth0)
-A FORWARD -i eth1 -o eth0 -j ACCEPT

# allow traffic from our NAT pinhole
-A FORWARD -p tcp -d 192.168.1.100 --dport 80 -j ACCEPT

# drop all other forwarded traffic
-A FORWARD -j DROP

COMMIT
```

You can then reboot or just run the init script:
```
sudo /etc/network/if-pre-up.d/iptables-init
```

NOW is the time to connecting your laptop to your router and SSH in. Just make sure SSHD is enabled and started:
```
sudo systemctl enable sshd.service
sudo systemctl start sshd.service
```
Since you are the first one connecting to the new router the DHCP server should grant you 192.168.1.100.
Check if you can browse the internet through the router, that should be a good test.
