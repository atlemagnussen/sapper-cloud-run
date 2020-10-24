# Elastic Search Setup
- Tested with version 7.0 of ES
- Tested with Ubuntu 16.04
## Prerequsities
- Java version 8 at least
```sh
java -version
```

## Install

### Ubuntu
```sh
wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -
sudo apt-get install apt-transport-https
echo "deb https://artifacts.elastic.co/packages/7.x/apt stable main" | sudo tee -a /etc/apt/sources.list.d/elastic-7.x.list
sudo apt update
sudo apt install elasticsearch
```

## Config

### $JAVA_HOME variable
See the options with update-alternatives:
```sh
sudo update-alternatives --config java
```
set the $JAVA_HOME to a path in the list minus the trailing `/bin/java`  
Set it for example in the `/etc/environment` file:
```sh
JAVA_HOME="/usr/lib/jvm/java-8-openjdk-amd64/jre"
```

### Single node 
[network.host documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/network.host.html)

`/etc/elasticsearch/elasticsearch.yml`:  
```sh
cluster.name: cluster-with-singlenode1
node.name: singlenode1
path.data: /var/lib/elasticsearch
path.logs: /var/log/elasticsearch
#bootstrap.memory_lock: true
#network.host: localhost
#network.host: 172.31.1.13
network.host: _site_
http.port: 9200
cluster.initial_master_nodes: 1
```