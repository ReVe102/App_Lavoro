import React, { useState } from 'react';
import './Chat.css';
import { Avatar, IconButton } from '@mui/material';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import axios from "../axios";


const Chat = () =>{
    return (
        <div className='chat'>
            <div className='chat_testa'>
            <div className='chat_name'>
                <h3>chat name</h3>
           <p>visto l'ultima volta</p>

           </div>
        
        <div className='chat_testa_destro'>
              <IconButton>
                <SearchOutlined />
                </IconButton>  
        </div>
        </div>

        <div className='chat_body'>
            <p className='chat_messaggiInterni'>
                <span className='chat_nomeInterno'>jack</span>
                Message
                <span className='chat_timestamp'>{new Date().toUTCString()}</span>
            </p>
            <p className='chat_messRicevuti'>
                <span className='chat_nomeInterno'>jack</span>
                Message
                <span className='chat_timestamp'>{new Date().toUTCString()}</span>
            </p>  
            <p className='chat_messaggiInterni'>
                <span className='chat_nomeInterno'>jack</span>
                Message
                <span className='chat_timestamp'>{new Date().toUTCString()}</span>
            </p>     
        </div>
        <div className='chat_casellaTesto'>
           <form>
            <input placeholder='scrivi un messaggio...' type='text'></input>
            <button type='submit'>invia 
                
            </button>
             </form>
        </div>
        </div>
    )
}

export default Chat