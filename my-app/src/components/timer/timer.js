import React, {useEffect, useState} from 'react'

import {useSelector, useDispatch} from "react-redux"
import {userReady,userOutOfTime} from "../../app/actionCreator"

import "./timer.css"
function Timer(callback) {

    const [time, decrementTime] = useState(15);
   
    const [inRound, setRoundState] = useState(false);


    const roundState = useSelector(state => state.socket.inRound)
    const roomId = useSelector(state => state.socket.room);

    console.log(roundState);
    const dispatch = useDispatch();

    

    useEffect(()=> {
        if (time == 0 && roundState) {
            dispatch(userOutOfTime(roomId));
        }
        let interval;
        if(roundState == false){
            decrementTime(15);
        }
        if(roundState){
            interval = setInterval(() => {
                decrementTime(time - 1)
            }, 1000)
        }
        return () => clearInterval(interval); 
    },[time, roundState])

    function handleStart(event) {
        dispatch(userReady("me", roomId))
        event.target.blur();
    }

    const handleOutOfTime = () => {
        dispatch(userOutOfTime(roomId))
    }
  return (
    <div class = "container">
        <h3 className = "time">{`${String(Math.trunc(time/60)).padStart(2,"0")}:${String(time%60).padStart(2,"0")}`}</h3>
    </div>
  )
}





export default Timer