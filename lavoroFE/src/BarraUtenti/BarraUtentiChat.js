import React, { useEffect, useState } from 'react';
import './BarraUtentiChat.css';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';


const BarraUtentiChat =({stanza}) =>{

const [seed , setSeed]= useState("");
useEffect(() =>{
    setSeed(Math.floor(Math.random() * 100));
},[])

    return <Link to={`/stanze/${stanza._id}`}>
    <div className='BarraUtentiChat'>
            <Avatar src= {`https://i.pravatar.cc/${seed}`} />
            <div className="BarraUtenti_info">
                <h2>{stanza.name}</h2>
                <p>message</p>
            </div>
        </div> </Link>
}

export default BarraUtentiChat;



