# SSH best practices

Start using the secure shell as it was meant to be, secure.  
**TLDR;**

-   Use public key authentication and disable login with password in sshd_config `PasswordAuthenctication no`
-   Use ed25519 for your SSH keys `$ ssh-keygen -a 100 -t ed25519`
-   Don't ignore the fingerprint changed messages if you get one

<div class="separator" style="clear: both; text-align: center;"><img border="0" src="https://storage.googleapis.com/atle-static/pics/ssh_danger_zone.jpg" /></div>

If you're _ssh'ing_ home to your open port 22, you're done. Internet hacker factories continuously crawl the web for open SSH ports.

You can easily prove it yourself, as I've done in my illustration picture above.  
Try this: `$ grep "Failed pass" /var/log/auth.log` and see if there's any occurrences.  
See [this blogpost on tecmint.com](https://www.tecmint.com/find-failed-ssh-login-attempts-in-linux/) to check out other ways, as it depends on your distro where you find the auth log.

Now you see them hackers usually trying to log in with the root user. Luckily the option of logging in as root over ssh is disabled by default. You can enable that, but I will not speak of how.  
So the hackers first obstacle would be guessing your user name in addition to guessing your password. It's not trivial to hack you, but it's not impossible either. If you're not convinced; at least dont want your log to be full just because of failed login attempts. Also you don't want to spend CPU and bandwith fending off the bad guys. So lets make it many magnitudes more difficult. In fact they will just give up if you do this.

## Disable password over ssh

The problem with passwords is that it can be either guessed or too complex to walk around and remember. Of course you have clients that will store the passwords for you, like password managers or putty.  
You can even program your router to block multiple failed ssh attempts, and maybe you should do that as well, but there is a more convenient way to avoid the problem.

Enter **public key authentication**

Ok, public key authentication is always enabled, what you need to do is start using it. And then _turn off_ password authentication in your `sshd_config` file.

Well, not so fast. If you do this without setting up a public and private key pair that your ssh server will accept, you will now be locked out forever. Let's do some things first:

### Set up keys

There are a lot of articles out there on the details of how the public key authentication _really_ works. I won't go into that, I'll just show you how to make use of it.  
Start off by creating a pair on _the client computer_ where you will **log in from**.  
Over the years algorithms rise and fall you. It means you need to select according to best practice of today when creating your pair.  
The most common one is known as `RSA`. RSA is now only considered safe if you have large keys like 4096 bits.  
The recommended algorithm as of writing is called [ed25519](https://ed25519.cr.yp.to/)  
Since this is not default in `ssh-keygen` you need to specify it, like this:

```sh
$ ssh-keygen -a 100 -t ed25519
```

It will prompt you like this:

```bash
Generating public/private ed25519 key pair.
Enter file in which to save the key (/home/atle/.ssh/id_ed25519):
```

Just go with the default location, there is only convenciance and no security to gain by going default on ssh key pair file location. It usually means you don't have to specify key when you eventually log in to your server, it will just pick from your `~/.ssh` folder. But you **can** specify the key or other keys if you want to. Besides, you can move the keys around afterwards if you like, or even copy them.

Next thing it will ask of you is a password. What this means is: Do you want to encrypt your private key with a password? I usually don't, because the concept of a private key is to keep it private. But a password will add another layer of security, so that if someone steals your private key they must guess a password as well. This **also** means you have to type the password every time you use the key. For example when logging in to your server using public key encryption, as this section in the blog post is about.  
If you want to skip password, just hit enter - twice. When done you are done you will see something like this:

```bash
Your identification has been saved in ~/.ssh/id_ed25519.
Your public key has been saved in ~/.ssh/id_ed25519.pub.
The key fingerprint is:
SHA256:v6/Gsv9fe/iyeHzDoDfPheF+Pfa94769009Hw9ZXEIc atle@atle-server
The key's randomart image is:
```

I excluded the random art image, you can read more about that [here](https://superuser.com/questions/22535/what-is-randomart-produced-by-ssh-keygen).  
The fingerprint you can also ignore for now, I will talk about this later regarding the ssh server.

**You now got a a private public key pair**
_~/.ssh/id_ed25519.pub_ is the public key as it states. This key is no secret.
_~/.ssh/id_ed25519_ is the corresponding secret key, the one you need to keep safe like your house and car keys.  
In case you wonder, they are just plain text files and not some weird format. So go ahead and inspect them, your private key is kind of interesting ^^  
Let's go ahead and use it for some real world problems.

### Authenticate your public key on the ssh server

Hopefully you created the key pair on the client machine you would _log in from_ and not the _ssh server you want to log in to_, as I said.  
Don't worry, just do it again on the right machine. The server can have a pair lying around. No worries.  
When you got it all. now print out your public file:

```sh
$ cat ~/.ssh/id_ed25519.pub
```

Should give you something like this:

```bash
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIKIaMSAI0b3loG9wbWx2Ja/WZPsIj5Zip3XbShxG3zuC atle@atle-server
```

Now log on to your _ssh server_ again, either physically or ssh with password.  
Create this file `~/.ssh/authorized_keys` - if the .ssh folder don't exist just create it.  
Then paste the entire line of your public key from the previous step, yes everything and not just the actual key in the middle.  
If you add more keys later, add them on a new line. One public key, one line.

Now go back to your _client computer_ and try to log in to the _server_ like you always did. Now you should fly right in without a password, unless you set a password on your private key.  
This means you can now safely remove password authentication in `sshd_config`

```ssh
PasswordAuthenctication no
```

## The public key fingerprint

### Get the fingerprint from a public

default SHA256 format:

```sh
$ ssh-keygen -lf /etc/ssh/ssh_host_rsa_key.pub
```

old MD5 format:

```sh
$ ssh-keygen -lf /etc/ssh/ssh_host_rsa_key.pub -E md5
```
