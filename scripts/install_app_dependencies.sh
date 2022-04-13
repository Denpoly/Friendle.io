#!/bin/bash
#install node
yum install curl -y
--silent --location https://deb.nodesource.com/setup_4.x | sudo bash -
yum install nodejs -y --skip-broken
yum install npm -y --skip-broken

cd /home/ec2-user/Friendle.io/my-app
npm install
npm install express
cd /home/ec2-user/Friendle.io/server
npm install
