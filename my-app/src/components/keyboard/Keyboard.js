
import React from 'react'
import {useSelector} from 'react-redux'
import "./Keyboard.css"
export default function Keyboard() {
    const letters = useSelector(state => state.guess.letters);
    const keys = Object.keys(letters);

    const keys1 = keys.splice(0,10);
    const keys2 = keys.splice(0,9);
    const keys3 = keys.splice(0,8);
    const colors = ["white", "green", "yellow", "darkgray"]
    return (
        <div className = "outerContainer">
            <div className = "keysContainer">{
            keys1.map(key => {
                const color = colors[letters[key]]
                return (
                    <div style = {{background: color}} className = "key">
                        {key}
                    </div>
                )
            })
            }
            </div>
            
            <div className = "keysContainer">
            { 
            
            keys2.map(key => {
                const color = colors[letters[key]]
                return (
                    <div style = {{background: color}} className = "key">
                        {key}
                    </div>
                )
            })}
            </div>
            <div className = "keysContainer">{
            keys3.map(key => {
                const color = colors[letters[key]]
                return (
                    <div style = {{background: color}} className = "key">
                        {key}
                    </div>
                )
            })}

            </div>
        </div>
    )
}
