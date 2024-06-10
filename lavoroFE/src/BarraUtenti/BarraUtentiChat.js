import React from 'react';
import './BarraUtentiChat.css';
import { Avatar } from '@mui/material';



const BarraUtentiChat =() =>{
    return (
        <div className='BarraUtentiChat'>
            <Avatar  />
            <div className="BarraUtenti_info">
                <h2>name</h2>
                <p>message</p>
            </div>
        </div>
    )
}

export default BarraUtentiChat;