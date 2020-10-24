# FreeBSD dual boot EFI Samsung Cronos
<div class="separator" style="clear: both; text-align: center;"><img border="0" src="https://storage.googleapis.com/atle-static/pics/freebsdgreen.png"/></div>
How to install FreeBSD alongside Linux and dual boot from GRUB with EFI enabled on a Samsung Cronos.  
The knowledge does not only apply to Samsung Cronos of course.  

So I used a GPT (Guid Partition Table) and installed Arch Linux first and left some free space on the end of the disk.  

## Start installer in "mode 2"
When I tried to boot FreeBSD installer from an USB stick the screen was just jumble after the initial boot screen.  
After searching through forums I find a way to set the resolution  
When you see the initial FreeBSD bootloader menu, hit escape befoer the timer is up, this will give you a sort of command line
```sh
mode 2
boot
```

This did the trick for me, if you just type `mode` it will show you other options

## Partitioning
When you are inside the installer and hit the partition section you should choose Manual UFS, unless you want ZFS for some reason.  
From the manual menu you select `Create` new on your disk and set the `mount point` to `/`.  
When you use EFI you will be prompted to create a boot efi partition, just agree to this.

## Reboot into Linux and configure grub
When inside Linux you want to edit `/etc/grub.d/40_custom` and insert the following item:
```bash
menuentry "FreeBSD" {
    insmod part_gpt
    insmod fat
    set root=(hd0,gpt5) # 5 because FreeBSD EFI partition is sda5 in my setup
    chainloader /efi/boot/BOOTx64.efi # look up this by mounting the FreeBSD EFI partition, the name might be different
}
```

Then just re-create grub config:
```sh
$ grub-mkconfig -o /boot/grub/grub.cfg
```