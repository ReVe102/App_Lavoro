import React from 'react';
import './BarraUtentiChat.css';
import { Avatar } from '@mui/material';

function BarraUtentiChat({ name, avatar, onClick }) {
    return (
        <div className='BarraUtentiChat' onClick={onClick}>
            <Avatar src={avatar}></Avatar>
            <div className='BarraUtenti_info'>
                <h2>{name}</h2>
                <p>message</p>
            </div>
        </div>
    );
}

export default BarraUtentiChat;