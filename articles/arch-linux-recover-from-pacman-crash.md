# Recover from Arch Linux pacman update crash

[From Arch Wiki](https://wiki.archlinux.org/index.php/pacman#Pacman_crashes_during_an_upgrade)

- remember refresh keys
- pacman -Qqen > pkglist.txt
- pacman --force -S $(< pkglist.txt)
