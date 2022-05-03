import React from 'react';
import logo from './logo.svg';

import Game from "./components/game"
import Chat from "./components/chat/Chat"
import Timer from "./components/timer/timer"
import './App.css';
import {useSelector, useDispatch} from "react-redux"
import { setGameState, setFocusState } from './features/gameSlice';
import { leaveRoomRedux } from './features/socketSlice';
import { userLeave } from './app/actionCreator';
import {Button} from "@material-ui/core"
import {Dashboard} from "./components/dashboard/dashboard"
import Keyboard from "./components/keyboard/Keyboard"
function App() {
  const inGame = useSelector(state => state.game.gameState)
  const room = useSelector(state => state.socket.room)
  const dispatch = useDispatch();

  const returnView = () => {
    if(inGame == "solo") {
      return (<Game></Game>)
    } else if (inGame == "inRoom") {
      return (
          <div>
            
            <Timer></Timer>
            <div className = "appContainer">
              <Game></Game>
              <div>
                <Chat></Chat>
                <Keyboard></Keyboard>
              </div>
            </div>
            
          </div>
      )
    } else {
      return (
        <Dashboard></Dashboard>
      )
    }
  }
  const returnToMain = () => {
    dispatch(setGameState("home"))
    dispatch(userLeave(room));
    dispatch(leaveRoomRedux());

  }
  return (
    <div className="App">
      
      <header className="App-header">
      {
              inGame == "inRoom" ? 
              <div>
                <div onClick = {returnToMain} className = "logoButton">Friendle.io</div>
              <h2 style = {{fontFamily: "Times New Roman"}}>{`${room} game`}</h2>
              </div>
              :
              <></>
            }
            
        <div className = "appContainer">
            

            {returnView()}
        </div>
      </header>
    </div>
  );
}

export default App;
