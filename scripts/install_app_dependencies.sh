#!/bin/bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads 
cd /home/ec2-user/Friendle.io/my-app
npm install
npm install express
cd /home/ec2-user/Friendle.io/server
npm install
