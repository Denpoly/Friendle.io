#!/bin/bash
#install node
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install node

cd /home/ec2-user/Friendle.io/my-app
npm install
npm install express
cd /home/ec2-user/Friendle.io/server
npm install
cd /home/ec2-user/Friendle.io/my-app
nohup npm start
nohup npm run server