import React from 'react'
import Button from './Button'

const ButtonList = () => {
  return (
    <div className='flex'>
        <Button name="All"/>
        <Button name="Gaming"/>
        <Button name="Songs"/>
        <Button name="Live"/>
        <Button name="Sports"/>
        <Button name="Cooking"/>
        <Button name="News"/>
        <Button name="Trending"/>
        <Button name="Cricket"/>
        <Button name="Current Affairs"/>
        <Button name="YouTube Reels"/>
        <Button name="Subscriptions"/>
    </div>
  )
}

export default ButtonList;