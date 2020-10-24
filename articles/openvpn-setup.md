# Open VPN on my Raspberry PI

[Comparitech article with pfs](https://www.comparitech.com/blog/vpn-privacy/build-linux-vpn-server/#gref)
[Medium article with ln -s openssl1.0](https://medium.com/linode-cube/set-up-openvpn-on-ubuntu-16-04-for-safetys-sake-d73b7ec7e465)

## create new client - CA directory
on atle-server
./build-key newclient
copy files newclient.crt, newclient.key and ca.key

### Create ovpn file
client
;dev tap
dev tun
;dev-node MyTap
;proto tcp
proto udp
remote atle.mine.nu 1194
resolv-retry infinite
nobind
user nobody
group nogroup
persist-key
persist-tun
ca ca.crt
cert newclient.crt
key newclient.key
ns-cert-type server
comp-lzo
verb 3
