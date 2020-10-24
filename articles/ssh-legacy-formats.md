# SSH Legacy formats

## Create OpenSSH PEM format
For example Teamcity does not support the new OpenSSH format
### Easy way

```sh
ssh-keygen -t rsa -b 4096 -m PEM
```

### Hard way
First create a regular pair
```sh
$ ssh-keygen -t rsa -b 4096
```
Now you have a keypair named `id_rsa` / `id_rsa.pub` or whatever you named the files  
Now convert the private key to PEM
```sh
$ ssh-keygen -p -m PEM -f id_rsa
```