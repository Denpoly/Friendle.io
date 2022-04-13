import { createSlice } from '@reduxjs/toolkit'
import io from "socket.io-client"
const initialState = {
    room: null,
    userName: null,
    usersInRoom: [],
    inRound: false
}

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
      setRoom: (state, action) => {
        state.room = action.payload
      },
      setUsername: (state, action) => {
          state.userName = action.payload
      },
      sendRoomUsers: (state, action) => {
          state.usersInRoom = action.users
          console.log(action.users)
      },
      startRound: (state, action) => {
        state.inRound = true;
      },
      resetRound : (state, action) => {
        state.inRound = false;
      },
      userReady: (state,action) => {
        const ind = state.usersInRoom.findIndex(user => {
          return user.user === action.user
        });
        console.log(ind);
        state.usersInRoom[ind] = {
          user: action.user,
          ready: true
        }
      }
  }
});

export const {setRoom, setUsername, sendUsers} = socketSlice.actions

export default socketSlice.reducer