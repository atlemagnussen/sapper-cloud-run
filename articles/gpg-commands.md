# GPG encryption commands


<div class="separator" style="clear: both; text-align: center;"><img border="0" src="https://storage.googleapis.com/atle-static/pics/gpg_logo.png"/></div>
## Create
The simple command
```sh
gpg2 --gen-key
```
or the more advanced
```sh
gpg2 --full-generate-key
```

Output will be something like this:
```sh
pub   rsa3072 2019-08-20 [SC] [expires: 2021-08-19]
      XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
      XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
uid                      Me Xxxxxxx <mexxxxxxxxx@gmail.com>
sub   rsa3072 2019-08-20 [E] [expires: 2021-08-19]
```

## Delete
```sh
gpg2 --delete-secret-and-public-keys mexxxxxxxxx@gmail.com
```

## Export
Public key:  
to be sent to your friends so they can encrypt messages only you can decrypt
```sh
gpg2 --armor --output xxxxxxx.public.gpg --export mexxxxxxxxx@gmail.com
```
Private key (only for backup)
```sh
gpg2 --armor --output xxxxxxx.secret.gpg --export-secret-keys mexxxxxxxxx@gmail.com
```

## Import
import public key from a friend
```sh
gpg2 --import friendxxx.public.gpg
```

## Encrypt
Using public key of your friend:
```sh
gpg2 --output file.txt.gpg --encrypt --recipient friendxxx@gmail.com file.txt
```

## Add signature
To verify you're the sender
```sh
sha256sum file.txt | awk '{print $1}' > file.txt.sha256sum
gpg2 --output file.txt.sha256sum.sig --sign file.txt.sha256sum
```
## Decrypt
Decrypt encrypted files sent to you:
```sh
gpg2 --output decrypted.txt --decrypt file.txt.gpg
```

## Verify signature
Verify that your friend created the message
```sh
gpg2 --verify file.txt.sha256sum.sig
```
