# Linux disk management

## Use UUID in fstab file

### Find disks UUID

```sh
$ ls /dev/disk/by-uuid -la
```

Output:

```bash
0E8F-D420 -> ../../sdd1
0f43a799-68a1-412f-9d63-67c78375262e -> ../../sdd2
2afcf0ee-f07e-4309-8ea9-76898c5a87ff -> ../../sdd4
a7e287a2-9ada-44cf-b6ce-f32c23e0ebf3 -> ../../sdd3
a9f7fcb5-108a-4210-bc14-1a59cd1f7133 -> ../../md0
e04e6c4d-aea5-4465-8a06-c7163196db27 -> ../../sde1
```

### Use them in fstab

```sh
UUID=e04e6c4d-aea5-4465-8a06-c7163196db27       /mnt/ssd1       ext4    defaults        0       3
```

### Create new partition with parted

Start parted on the disk

```sh
$ parted /dev/sdc
```

Create GPT disk label

```sh
(parted) mklabel gpt
```

Create one partition of all available space

```sh
(parted) mkpart primary 0% 100%
```

Print to see current partition table

```sh
(parted) print
```

Output for this example looks like

```bash
Model: ATA WDC WD100EFAX-68 (scsi)
Disk /dev/sdc: 10.0TB
Sector size (logical/physical): 512B/4096B
Partition Table: gpt
Disk Flags:

Number  Start   End     Size    File system  Name     Flags
 1      0.00TB  10.0TB  10.0TB               primary
```

Save and quit

```sh
(parted) quit
```

### Format partition

```sh
$ mkfs.ext4 /dev/sdc1
```

Output

```bash
mke2fs 1.43.4 (31-Jan-2017)
Creating filesystem with 2441608704 4k blocks and 305201152 inodes
Filesystem UUID: c1692a98-9c4a-4127-9bed-f86e5fcab9dc
Superblock backups stored on blocks:
        32768, 98304, 163840, 229376, 294912, 819200, 884736, 1605632, 2654208,
        4096000, 7962624, 11239424, 20480000, 23887872, 71663616, 78675968,
        102400000, 214990848, 512000000, 550731776, 644972544, 1934917632

Allocating group tables: done
Writing inode tables: done
Creating journal (262144 blocks): done
Writing superblocks and filesystem accounting information: done
```

Mount

```sh
$ mount /dev/sdc1 /mnt/disk1
```

## Linux software RAID setup with mdadm

[Manpage](https://linux.die.net/man/8/mdadm)

### Create new array

Raid 1 (mirror) with 2 devices

```sh
$ sudo mdadm --create --verbose /dev/md0 --level=1 --raid-devices=2 /dev/sdc /dev/sdd
```

### check status

```sh
$ cat /proc/mdstat
```

While creating it could look like this:

```bash
Personalities : [raid1] [linear] [multipath] [raid0] [raid6] [raid5] [raid4] [raid10]
md1 : active raid1 sdd[1] sdc[0]
      9766305792 blocks super 1.2 [2/2] [UU]
      [===>.................]  resync = 18.5% (1811232960/9766305792) finish=686.7min speed=193056K/sec
      bitmap: 60/73 pages [240KB], 65536KB chunk
```

Healthy output when everything is up and running looks something like this:

```bash
md0 : active raid1 sda1[1] sdb1[2]
      3906886272 blocks super 1.2 [2/2] [UU]

unused devices: <none>
```

### scan and find existing

Add to the config, config file location might vary depending on distro

```sh
$ sudo mdadm --detail --scan | sudo tee -a /etc/mdadm/mdadm.conf
```

### md127

If your new raid device appears as `/dev/md127` you should try and update initramfs then reboot

```sh
$ sudo update-initramfs -u
```

### Create filesystem on RAID device

```sh
$ sudo mkfs.ext4 -F /dev/md0
```

### fstab config for mdadm devices

```sh
/dev/md0        /mnt/md0                        ext4    defaults        0       2
#### mount bind dev
/mnt/md0/development/ /home/atle/development        none    bind
```
