#!/bin/bash

rm -rf web/
mkdir web/
git clone https://github.com/jinwoo7/jinwooyom.com.git
sudo mv jinwooyom.com/* web/
rm -rf jinwooyom.com/

sudo docker stop $(sudo docker ps -aq)
sudo docker rm $(sudo docker ps -aq)

sudo docker build . -t "jinwooyom.com"
sudo docker run -d -p 80:80 -t "jinwooyom.com"
