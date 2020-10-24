# Linux users and groups CRUD
<img src="https://storage.googleapis.com/backslash-project.appspot.com/static/tux.png" alt="linux logo tux" width="320">

Creating, deleting and updating users and groups is something I always struggle with remembering. After all I am not a sysadmin so I don't do it too often I guess. So I'm putting together a cheat sheet/article of my own.

## Create normal user
When I say normal user I mean as opposed to system user, which I will write some commands for as well.  
Typically for a normal user we would also set home folder and a default bash.

For adding users there are two of confusingly similar commands that are used. `useradd` being the "low level" command and `adduser` being the "high level" command, which is suppose to mean more user friendly. And well, of course, some distros have GUI as well :)

### useradd
[man page](https://linux.die.net/man/8/useradd)  
here you need specify:
- create home folder `-m`
- assign to a main group `-g`
- bash as default shell for user `-s` - or else it might be `/bin/sh`

and then set password in second command
```sh
$ useradd -m -g users -s /bin/bash testuser
$ passwd testuser
```

### adduser
[man page](https://linux.die.net/man/8/adduser)  
this command will prompt you for password and fullname and some other stuff  
it will create a group with same name as user and assign the OS default shell
```
$ adduser testuser
```

## Delete user
There is also a low level `userdel` and high level command `deluser` for deleting. But really the low level version is enough to know about, it's more than simple enough.
### userdel
[man page](https://linux.die.net/man/8/userdel)
specify `-r` to remove users home directory and mail spool
```sh
$ userdel -r testuser
```

## Create group
```sh
$ groupadd newgroup
```

## Add user to group
```sh
$ usermod -a -G newgroup testuser
```

## Create service user
