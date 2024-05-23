import React from 'react'
import "./BarraUtentiChat.css"
import { Avatar } from '@mui/material'
function BarraUtentiChat () {
    return (
    <div className='BarraUtentiChat'>
        <Avatar src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZl5LNdGHJ6aZ3XQ-rtCf1uYTlJdkiXBOh0A&s'></Avatar>
        <div className='BarraUtenti_info'>
        <h2>name</h2>
        <p>message</p>
        </div>
    </div>
    )
}

export default BarraUtentiChat