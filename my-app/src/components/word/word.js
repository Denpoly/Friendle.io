import React from 'react'
import "./word.css"
import {useDispatch, useSelector} from 'react-redux'


export const Word = (props) => {
    const {guess, correctWord} = props


    let splitWord = [];
    let splitCorrectWord = correctWord.split("")
    if (guess == ""){
        splitWord = ["","","","",""]
    } else {
        splitWord = guess.toLowerCase().split('')
    }

    const returnRow = () => {
        let i = 0
        let classSquare = correctWord === "....." ? "square-bold" : "square" 
        return splitWord.map(letter => {
            
            if(letter == "") {
                return (<div className = {classSquare}></div>)
            } else {
                if(letter == splitCorrectWord[i]){
                    i++;
                    return (<div className = "square--correct">
                                <a className = "letter">{letter}</a>
                                </div>)
                }
                else if (splitCorrectWord.includes(letter)) {
                    i++;
                    return(
                        <div className = "square--almostCorrect">
                                    <a className = "letter">{letter}</a>
                                    </div>
                    )
                } else {
                    i++;
                    return (
                                <div className = {classSquare}>
                                    <a className = "letter">{letter}</a>
                                    </div>
                            )
                }
            }
            
        })
    }


    return (
        <div class = "wordContainer"> 
            {returnRow()}
        </div>
    )
}
export default Word
