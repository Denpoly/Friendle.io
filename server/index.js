const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const random = require('./utils/randomWordPicker')


const actionCreator = require('./actions/actionCreator')

const room = require("./models/room");
const { resetRoundGame } = require('./actions/actionCreator');

app.use(cors());
const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: true,
  origins: ["http://localhost:3000/*"]
});


const roomData = [

]


app.get('/', (req, res) => {
  res.sendFile(__dirname +"/index.html")
});
//Test Change9

io.on('connection', (socket) => {
  socket.on("action", function (action) {
    switch (action.type) {
      case "JOIN_ROOM":
        socket.join(action.meta.roomId);
        socket.ready = false;
        console.log(socket.rooms);
        const joiningRoom = roomData.find((room) => action.meta.roomId === room.roomName);

        if (joiningRoom){
          joiningRoom.addUser(action.meta.user);
        } else {
          roomData.push(room(action.meta.roomId, action.meta.user));
        }

        socket.nickname = action.meta.user
        io.in(action.meta.roomId).fetchSockets().then(sockets => {

          const nicknames = sockets.map(socket => {
            return {
              user: socket.nickname,
              ready: socket.ready,
              inRound: false,
            }
          })
          io.in(action.meta.roomId).emit('action', actionCreator.sendRoomUsers(nicknames))
          io.in(action.meta.roomId).emit('action', actionCreator.emitMessage(`${action.meta.user} has joined the game`, "SERVER"))
        });
        break;

      case "SEND_MESSAGE_TO_ROOM":
        io.in(action.meta.roomId).emit('action', actionCreator.emitMessage(action.meta.message, action.meta.sender))
        break;

      case "USER_READY":
        if(socket.ready != true){
          io.in(action.meta.roomId).emit('action', actionCreator.emitMessage(`${socket.nickname} has readied up`, "SERVER"))
          socket.ready = true;
          io.in(action.meta.roomId).emit('action', actionCreator.userReady(socket.nickname));

          io.in(action.meta.roomId).fetchSockets().then(sockets => {
            
            if(sockets.every( (socket) => {
              return socket.ready
              })){
                const roomTemp = roomData.find((room) => {
                  return room.roomName === action.meta.roomId
                })

                roomTemp.users.forEach(user => {
                  user.inRound = true;
                })
                console.log(roomData)
                const roomIndex = roomData.findIndex(room => {
                  return room.roomName === action.meta.roomId
                }) 
                const newWord = random.randomWord()
                roomData[roomIndex].currentWord = newWord
                io.in(action.meta.roomId).emit('action', actionCreator.resetRoundGame());
                io.in(action.meta.roomId).emit('action', actionCreator.newWord(newWord));
                io.in(action.meta.roomId).emit('action', actionCreator.startRound(180,"hello"));
            }
          });
        }
        break;

      case "USER_WON":
        io.in(action.meta.roomId).fetchSockets().then(sockets => {
          const roomTempInd = roomData.findIndex((room) => {
            return room.roomName === action.meta.roomId
          })
          sockets.forEach(socket => {
            socket.ready = false
            
          })
          roomData[roomTempInd].users.forEach(user => {
            user.inRound = false;
          })
          room
          console.log(roomData)
          io.in(action.meta.roomId).emit('action', actionCreator.emitMessage(`${action.meta.user} has won the round. The correct word was ${roomData[roomTempInd].currentWord}`, "SERVER"))
          io.in(action.meta.roomId).emit('action', actionCreator.resetRoundGame())
          io.in(action.meta.roomId).emit('action', actionCreator.sendRoomUsers(roomData[roomTempInd].users))
        });
        
        break;

      case "USER_OUT_TIME":
        console.log(roomData)
        console.log(socket.nickname + " out of time")
        console.log(action.meta.roomId)
        const roomTempId = roomData.findIndex((room) => {
          return room.roomName === action.meta.roomId
        })
        const roomTemp = roomData[roomTempId]
        console.log(roomTemp)
        const name = socket.nickname;
        console.log(name);
        const userTemp = roomTemp.users.findIndex(user => {
          console.log(user.user)
          return user.user === name;
        })

        roomTemp.users[userTemp].inRound = false;
        roomData[roomTempId] = roomTemp;
        console.log(roomData)
        if(roomData[roomTempId].users.every(user => {
          return !user.inRound 
          })){
          console.log("Everyone finished round")
          
          io.in(action.meta.roomId).emit('action', actionCreator.resetRoundGame());
          io.in(action.meta.roomId).emit('action', actionCreator.emitMessage(`Out of time! The correct word was "${roomData[roomTempId].currentWord}"`, "SERVER"))
          io.in(action.meta.roomId).emit('action', actionCreator.sendRoomUsers(roomData[roomTempId].users))

        }
      break;
    }})
    socket.on("disconnecting", () => {
      console.log(socket.rooms);
      const roomsToDisconnect = socket.rooms;
      console.log("Before removing user")
      console.log(roomData)
      roomsToDisconnect.forEach(room => {
        const i = roomData.findIndex(roomIn => {
          return roomIn.roomName === room
        })
        console.log(i);
        if (i != -1) {
          roomData[i].users = roomData[i].users.filter(user => {
            return user.user != socket.nickname
          })
          io.in(roomData[i].roomName).emit('action', actionCreator.emitMessage(`${socket.nickname} has quit the game.`, "SERVER"))
          io.in(roomData[i].roomName).emit('action', actionCreator.sendRoomUsers(roomData[i].users))
        }
        
      })
      console.log("After removing user")
      console.log(roomData);
      console.log(socket.nickname + " disconnected");
      
      }) 
    
            
});





server.listen(8000, () => {
  console.log('listening on *:8080');
});



