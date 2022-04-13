import React, {useState} from 'react'
import {Button, Input, Grid, Card, Typography} from "@material-ui/core"
import AnimatedLogo from "../animatedLogo/animatedLogo"
import {useDispatch, useSelector} from "react-redux"
import { setGameState } from '../../features/gameSlice'
import {joinRoom} from "../../app/actionCreator"
import {setRoom, setUsername} from "../../features/socketSlice"
import "./dashboard.css"


export const Dashboard = () => {
    
    const dispatch = useDispatch();

    const [newRoom, setNewRoom] = useState(null);
    const [userName, setNewUsername] = useState(null)
    const joinARoom = (name, username) => {
        return () => {
            dispatch(joinRoom(name, username))
            dispatch(setRoom(name))
            dispatch(setUsername(username))
            dispatch(setGameState("inRoom"))

        }

    }
    
    

    const onRoomInputChange = (event) => {
        console.log(event.target.value)
        setNewRoom(event.target.value);
    }

    const onUsernameChange = (event) => {
        setNewUsername(event.target.value)
    }

    
    return (
        <div>
        <Grid container className ='dashboardContainer'>
            
                <AnimatedLogo></AnimatedLogo>
                <input placeholder= "Room" onChange = {onRoomInputChange} className = "inputRoom" type = "text"></input>
                    <input placeholder = "Nickname" onChange = {onUsernameChange} className = "inputRoom" type = "text"></input>
                    <button className = "button-19"  onClick = {joinARoom(newRoom, userName)} variant = "contained"> Join</button>
                <div  className = "options" >
                    
                    
                </div>
                <a style = {{marginTop: "5vh"}} className = "or" >or</a>
            <Grid item>
                <button className = "button-19" variant = "contained" onClick = {() => dispatch(setGameState("solo"))}>Start Solo Game</button>
            </Grid>
            
        </Grid>
        <a className = "credit">A game made by @denpoly</a>
        </div>
    )
}
