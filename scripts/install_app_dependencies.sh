#!/bin/bash
#install node
apt-get install curl -y
--silent --location https://deb.nodesource.com/setup_4.x | sudo bash -
apt-get install nodejs -y
apt-get install npm -y

cd /home/ec2-user/Friendle.io/my-app
npm install
npm install express
cd /home/ec2-user/Friendle.io/server
npm install
