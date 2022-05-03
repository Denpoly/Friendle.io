import React, {useState, useRef, useEffect} from 'react'
import {sendMessage, userReady} from "../../app/actionCreator"
import {useDispatch, useSelector} from "react-redux"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import "./chat.css"
function Chat(props) {

    const dispatch = useDispatch()
    const scrollRef = useRef(null);

    const currRoom = useSelector(state => {
        return state.socket.room
    })
    const currUserName = useSelector(state => {
        return state.socket.userName
    })
    const currUsers = useSelector(state => {
        return state.socket.usersInRoom
    })

    const roomId = useSelector(state => state.socket.room)
    const messages = useSelector(state => state.message.messages)
    const [input, setInput] = useState(null)

    const onInputChange = (event) => {
        setInput(event.target.value);
    }
    function handleStart(event) {
        dispatch(userReady("me", roomId))
        event.target.blur();
    }
    const send = () => {
        setInput("")    
        dispatch(sendMessage(currUserName, input, currRoom))
    }
    const onKeyPress = (e) => {
        if(e.which === 13 && document.activeElement.tagName == 'INPUT') {
            
            send()
        }
      }

    useEffect(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollIntoView({ behaviour: "smooth" });
        }
      }, [messages]);

    return (
            <div className = "outterContainer">
                <div className = "chatContainer">
                    <List sx={{
                            width: '40vw',
                            bgcolor: 'background.grey',
                            position: 'relative',
                            overflow: 'auto',
                            height: '40vh',
                            border: "2px solid black"
                        }}
                        >
                    {
                        messages.map(message => {
                            return (<ListItem sx = {{width: "100%"}}
                                    
                            >
                                <div className = "message">
                                        <ListItemText>
                                            <strong>{`${message.name}:`}</strong>
                                        </ListItemText>
                                        <ListItemText sx = {{paddingLeft: ".5vw"}} primary = {` ${message.message}`}>
                                        
                                        </ListItemText>
                                        </div>
                                    </ListItem>)
                        })
                    }
                    <ListItem ref = {scrollRef}></ListItem>
                    </List>
                    <div className = "input">
                        
                        <input value = {input} className = "inputField" onChange = {onInputChange} onKeyDown = {onKeyPress}></input>
                        <button className = "button-20" variant = "contained" onClick={send} >Send</button>
                    </div>
                    
                </div>
                    <div className = "userContainer">
                        <div className = "userList">
                            <div className ="usersTitle">
                                <a ><strong>Users</strong></a>
                            </div>
                            <List sx={{
                                    width: '20vw',
                                    bgcolor: 'background.grey',
                                    position: 'relative',
                                    overflow: 'auto'
                                    
                                }}
                                >   
                                    
                                    {currUsers.map(user => {
                                        return (<ListItem className = "userPane"
                                            
                                        >
                                                <ListItemText style = {{position: "absolute", left: "5%"}}className = {user.ready? "readyTextYES" : "readyTextNOT"} primary = {user.ready? "(R)": "(NR)"}>
                                                </ListItemText>
                                                    <ListItemText style = {{position: "absolute", left: "25%"}} primary = {user.user}>
                                                    
                                                    </ListItemText>
                                                    <ListItemText style = {{position: "absolute", left: "75%"}} primary = {"Score:  " + user.score}>
                                                    
                                                    </ListItemText>
                                                    
                                                    
                                                </ListItem>)
                                    })}
                                </List>
                                
                            </div>
                            <button onClick={handleStart}  className = "readyBut">Ready up</button>
                        </div>
                    </div>
    )
}

export default Chat