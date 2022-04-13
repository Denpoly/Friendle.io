#!/bin/bash
#install node
yum install curl -y
--silent --location https://deb.nodesource.com/setup_4.x | sudo bash -
yum install nodejs -y
yum install npm -y

cd /home/ec2-user/Friendle.io/my-app
npm install
npm install express
cd /home/ec2-user/Friendle.io/server
npm install
