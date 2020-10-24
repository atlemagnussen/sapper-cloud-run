# SQL server on linux

Working with SQL Server in Linux is not as easy as inside a Windows environment, but it certainly is fully possible when Microsoft started releasing SQL Server docker images.
You will not get Sql Server Management Studio, but you get something just as good.

<div class="separator" style="clear: both; text-align: center;"><img border="0" src="https://storage.googleapis.com/backslash-project.appspot.com/static/sql-docker.png"/></div>

## Docker
I'm guessing people are familiar with [Docker](https://www.docker.com/), if not there is a hundred tutorials out there.

### Pull SQL Server container image
there will be different versions, I just use one from an example as of when I wrote this.  
You really don't need this, as the image will be pulled when you fire up your container the first time that will depend on this.
```sh
$ docker pull mcr.microsoft.com/mssql/server:2019-CU3-ubuntu-18.04
```

### Run docker SQL Server image

*Persist the data*  

You usually want to persist the data outside the docker container so that it does not disappear when you kill the container.  
You can read about this topic in [docker documentation storage](https://docs.docker.com/storage/).  

For this example I create a docker volume first in a custom location:
```sh
$ docker volume create \
   --opt type=none \
   --opt device=/mnt/md0/Databases/sql-server/mssql2019-docker \
   --opt o=bind \
   sqlvolume
```

*Run*  
Then run and make the container use *sqlvolume*:
```sh
# run SQL Server 2019 as docker image
$ docker run -e 'ACCEPT_EULA=Y' -e "MSSQL_SA_PASSWORD=MySuperPW666!" \
   -p 1433:1433 --name atlesql2019 \
   -v sqlvolume:/var/opt/mssql \
   -d mcr.microsoft.com/mssql/server:2019-CU3-ubuntu-18.04
```

### stop and restart
```sh
$ docker stop mysqlserver2019
$ docker rm mysqlserver2019
```
Then re-run the docker run script

## SQLCMD
[Install sqlcmd](https://docs.microsoft.com/en-us/sql/linux/sql-server-linux-setup-tools) for your linux distros.  

### Connect
```sh
$ sqlcmd -S myserver -U sa
```

### Manage in VSCode
Install the [MsSql Extension](https://marketplace.visualstudio.com/items?itemName=ms-mssql.mssql)