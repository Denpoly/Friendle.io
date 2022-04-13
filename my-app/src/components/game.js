import React, {useState, useEffect} from 'react'
import  {saveGuess, saveLetterToGuess, deleteLetterFromGuess} from "../features/guessSlice"
import Word from "./word/word"
import {Card} from "@material-ui/core"
import {useDispatch, useSelector} from 'react-redux'

export const Game = (props) => {
    const dispatch = useDispatch();

    const guessCount = useSelector(state => state.guess.guessCount)
    const getCurrentGuess =  useSelector(state => state.guess.currentGuess)
    const guessesSoFar = useSelector(state => state.guess.guesses)
    let correctWord = useSelector(state => state.guess.correctWord)
    let roomId = useSelector(state => state.socket.room);
    let userName = useSelector(state => state.socket.userName);
    let inRound = useSelector(state => state.socket.inRound);

    console.log(inRound);
 

    function handleKeyDown(e) {
        console.log(guessCount);
        console.log(inRound)
        console.log(document.activeElement.tagName)
        if(document.activeElement.tagName !== 'INPUT'){
            if (e.repeat) {return}
            const inp = String.fromCharCode(e.keyCode)
            if(/[a-zA-z]/.test(inp)){
                dispatch(saveLetterToGuess(inp))
            } 
            else if (e.key == "Backspace") {
                dispatch(deleteLetterFromGuess(""))
            }
            if (e.key == "Enter"){
                let arg = {
                    currentGuess: getCurrentGuess,
                    roomId: roomId,
                    userName: userName,
                    inRound: inRound
                }
                dispatch(saveGuess(arg))

            } 
        }
    }
    useEffect(() => {

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
          };
        
    }, [inRound]);

  return (
    <div >  
        {guessesSoFar.map((guess,index) => {
            if (index == guessCount){
                return (<Word correctWord = {"....."} guess = {getCurrentGuess.padEnd(5)}></Word>)
            }
            else {
                if (guess == ""){
                    return (<Word correctWord = {correctWord} guess = "">
                            </Word>)
                }
                else {
                    return (<Word correctWord = {correctWord} guess = {guess}>

                            </Word>)
                }
            }
        })}

    </div>
  )
}

export default Game;
