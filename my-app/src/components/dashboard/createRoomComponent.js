import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'

import {Button, Input, Grid, Card, Typography} from "@material-ui/core"


import { setGameState } from '../../features/gameSlice'
import {joinRoom} from "../../app/actionCreator"
import {setRoom, setUsername} from "../../features/socketSlice"
import "./dashboard.css"
import "./createRoomComponent.css"


function CreateRoomComponent() {

    const dispatch = useDispatch();
    const [newRoom, setNewRoom] = useState(null);
    const [userName, setNewUsername] = useState(null)


    const onRoomInputChange = (event) => {
        console.log(event.target.value)
        setNewRoom(event.target.value);
    }

    const onUsernameChange = (event) => {
        setNewUsername(event.target.value)
    }
    
  return (
    <>
        <a className = "createRoomTitle">Create a New Game</a>
        <input placeholder= "Enter a Room Name" onChange = {onRoomInputChange} className = "inputRoom" type = "text"></input>

        <input placeholder= "Enter a Username" onChange = {onUsernameChange} className = "inputRoom" type = "text"></input>

        <input placeholder= "Time Limit (s)" onChange = {onRoomInputChange} className = "inputTime" type = "number"></input>

        <input placeholder= "# of Rounds" onChange = {onRoomInputChange} className = "inputTime" type = "number"></input>
        <button className = "button-19" variant = "contained"> Create your room</button>
    
    </>
  )
}

export default CreateRoomComponent