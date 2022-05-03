import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'

import {Button, Input, Grid, Card, Typography} from "@material-ui/core"


import { setGameState } from '../../features/gameSlice'
import {joinRoom} from "../../app/actionCreator"
import {setRoom, setUsername} from "../../features/socketSlice"
import "./dashboard.css"
import "./createRoomComponent.css"
function JoinRoomComponent(props) {


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
    
    const joinARoom = (name, username) => {
        return () => {
            dispatch(joinRoom(name, username))
            dispatch(setRoom(name))
            dispatch(setUsername(username))
            dispatch(setGameState("inRoom"))

        }

    }


  return (
    <>
        <a className = "createRoomTitle">Join an existing room</a>
        <input placeholder= "Room" onChange = {onRoomInputChange} className = "inputRoom" type = "text"></input>
                <input placeholder = "Nickname" onChange = {onUsernameChange} className = "inputRoom" type = "text"></input>
                <button className = "button-19"  onClick = {joinARoom(newRoom, userName)} variant = "contained"> Join</button>
            <a style = {{marginTop: "5vh"}} className = "or" >or</a>
        <Grid item>
            <button className = "button-19" variant = "contained" onClick = {props.changeForm} >Create a new room</button>
        </Grid>
    </>
  )
}

export default JoinRoomComponent