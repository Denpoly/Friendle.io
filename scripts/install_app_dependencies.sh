#!/bin/bash
#install node
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install v10.13.0 -g

cd /home/ec2-user/Friendle.io/my-app
npm install
npm install express
cd /home/ec2-user/Friendle.io/server
npm install
cd /home/ec2-user/Friendle.io/my-app
pm2 start ../my-app/startservscript.js
pm2 start ../my-app/startscript.js
# nohup npm start
# nohup npm run server