import React, {useEffect, useState} from 'react'
import {Button, Input, Grid, Card, Typography} from "@material-ui/core"
import AnimatedLogo from "../animatedLogo/animatedLogo"
import {useDispatch, useSelector} from "react-redux"
import { setGameState } from '../../features/gameSlice'
import {joinRoom} from "../../app/actionCreator"
import {setRoom, setUsername} from "../../features/socketSlice"

import JoinRoomComponent from './joinRoomComponent'
import CreateRoomComponent from './createRoomComponent'
import "./dashboard.css"


export const Dashboard = () => {

    const [inJoinRoom, setinJoinRoom] = useState(true);

    const changeForm = () => {
        console.log(inJoinRoom)
        setinJoinRoom(!inJoinRoom);
    }

    return (
        <div>
            <div className = "logoMain">
             <AnimatedLogo ></AnimatedLogo>
            </div>
        <div className ='dashboardContainer'>
            {
                inJoinRoom? <JoinRoomComponent changeForm = {changeForm}> </JoinRoomComponent>: <CreateRoomComponent></CreateRoomComponent>
                
            }
            
        </div>
        <div className = "credit">A game made by @denpoly</div>
        </div>
    )
}
