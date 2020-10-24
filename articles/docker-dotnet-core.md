# Docker dotnet core

<div class="separator" style="clear: both; text-align: center;"><img border="0" src="https://storage.googleapis.com/backslash-project.appspot.com/static/docker-dotnetcore.png"/></div>

Short notice on how to build docker images from aspnet core apps. So that you can can publish them to cloud services like [AWS](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/dotnet-core-tutorial.html), [GCP](https://cloud.google.com/appengine/docs/flexible/dotnet/quickstart) and [Azure](https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/azure-apps)

* [Dotnet core docker images for dotnet core](https://hub.docker.com/_/microsoft-dotnet-core)
* [Microsoft article on building docker images of aspnet core](https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/docker/building-net-docker-images)
* [How to install docker properly on WSL2](https://subhankarsarkar.com/wsl2-for-containerised-dot-net-core-development-using-docker/)

## Typical Dockerfile
This is for aspnet core
```bash
# https://hub.docker.com/_/microsoft-dotnet-core
FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
WORKDIR /source

# copy everything and build app
COPY aspnetapp/. ./aspnetapp/
WORKDIR /source/aspnetapp
RUN dotnet restore
RUN dotnet publish -c release -o /app --no-restore

# final stage/image
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1
WORKDIR /app
COPY --from=build /app ./
ENTRYPOINT ["dotnet", "aspnetapp.dll"]
```

## build image
```sh
$ docker build -t aspnetapp .
```

## run container
`-it` means interactive and `--rm` means the container will be deleted after it exits
```sh
$ docker run -it --rm -p 5000:80 --name aspnetcore_sample aspnetapp
```

## General work with docker

### Images
#### List all
```sh
$ docker images
```

Should display 
```bash
REPOSITORY                             TAG                 IMAGE ID            CREATED             SIZE
aspnetapp                              latest              80774e4391e4        55 minutes ago      212MB
mcr.microsoft.com/dotnet/core/sdk      3.1                 336698ad1713        2 days ago          691MB
mcr.microsoft.com/dotnet/core/aspnet   3.1                 9ac62e540b12        2 days ago          207MB
```

#### Remove image
```sh
$ docker rmi [image-id]
```

### Containers
#### List all
```sh
$ docker ps -a
```
Should display
```bash
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                          PORTS                  NAMES
d7ad96dca6e9        aspnetapp           "dotnet aspnetapp.dll"   30 seconds ago      Up 30 seconds                   0.0.0.0:5000->80/tcp   aspnetcore_sample2
596e75e8e1d9        aspnetapp           "dotnet aspnetapp.dll"   4 minutes ago       Exited (0) About a minute ago                          aspnetcore_sample
```

#### Create new and run in foreground
```sh
$ docker run -p 5000:80 --name aspnetcore_sample aspnetapp
```

#### Create new and run in background
```sh
$ docker run -d -p 5000:80 --name aspnetcore_sample aspnetapp
```

#### Stop container running in the background
```sh
$ docker stop aspnetcore_sample
```

#### Start existing container again
```sh
$ docker start aspnetcore_sample
```

#### Restart running container
```sh
$ docker restart aspnetcore_sample
```

## Deploy to Azure 
Using Azure Container Registry

First you need to create an Azure Container Registry  

Once you have built your image, log in to your registry, lets say you chose the name `myazureregistryname`
```sh
$ docker login myazureregistryname.azurecr.io
```

Then you should tag your image
```sh
$ docker tag aspnetapp:latest myazureregistryname.azurecr.io/aspnetapp
```

Then push it
```sh
$ docker push myazureregistryname.azurecr.io/aspnetapp
```

## HTTPS in developer mode
[Helpful SO thread](https://stackoverflow.com/questions/55485511/how-to-run-dotnet-dev-certs-https-trust)
### Method 1
```sh
# generate a self-signed cert
$ dotnet dev-certs https -v

# go to cert
$ cd ~/.dotnet/corefx/cryptography/x509stores/my

# convert the generated cert from pfx to pem, enter blank pw
$ openssl pkcs12 -in <certname>.pfx -nokeys -out localhost.crt -nodes

# copy to ca-certificates
$ sudo cp localhost.crt /usr/local/share/ca-certificates/

# verify the file is there
$ sudo cat /etc/ssl/certs/localhost.pem

# verify if it's trusted
$ openssl verify localhost.crt
```

### Method 2
Create localhost.conf
```bash
[req]
  default_bits       = 2048
  default_keyfile    = localhost.key
  distinguished_name = req_distinguished_name
  req_extensions     = req_ext
  x509_extensions    = v3_ca

  [req_distinguished_name]
  commonName                  = localhostaspnetcore
  commonName_default          = localhost
  commonName_max              = 64

  [req_ext]
  subjectAltName = @alt_names

  [v3_ca]
  subjectAltName = @alt_names
  basicConstraints = critical, CA:false
  keyUsage = keyCertSign, cRLSign, digitalSignature,keyEncipherment

  [alt_names]
  DNS.1   = localhost
  DNS.2   = 127.0.0.1
```

Generate cert
```sh
$ openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout localhost.key -out localhost.crt -config localhost.conf

# Convert cert to pfx
$ openssl pkcs12 -export -out localhost.pfx -inkey localhost.key -in localhost.crt

# Verify
$ openssl verify -CAfile localhost.crt localhost.crt
```

Trust cert
```sh
# Copy
$ sudo cp localhost.crt /usr/local/share/ca-certificates

# Trust
$ sudo update-ca-certificates

# Verify exists
$ sudo cat /etc/ssl/certs/localhost.pem

# Cerify without -CAfile option
$ cd /usr/local/share/ca-certificates/
$ sudo openssl verify localhost.crt
```

Now force kestrel to use it with `appsetting.json`
```json
"Kestrel": {
    "Certificates": {
        "Default": {
            "Path": "localhost.pfx",
            "Password": ""
        }
    }
}
```
