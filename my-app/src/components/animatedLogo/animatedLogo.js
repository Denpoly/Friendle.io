import React, {Component} from 'react'
import {AnimateGroup, Animate, AnimateKeyframes} from 'react-simple-animate'
import "./animatedLogo.css"
const AnimatedLogo = () => {

  return (
      <div className = "animatedGroup">
    <AnimateGroup
  play={true}
  reverse = {true}
  className = "animatedGroup"
>
  {['F','R','I','E','N','D','L','E', ".io"].map((item, index) => {
    return (
      <Animate
        key={item}
        sequenceIndex={index}
        end={{ opacity: 1, transform: 'translateY(-10px)' }}
        start={{ opacity: 0, transform: 'translateY(0)' }}
      >
        <a className = "logo">{item}</a>
      </Animate>
    )
  })}
</AnimateGroup>
</div>
  )
}

export default AnimatedLogo