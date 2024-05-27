import React from 'react';
import './Chat.css';
import { Avatar, IconButton } from '@mui/material';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
function Chat(){
    return (
        <div className='chat'>
            <div className='chat_testa'>
                <Avatar></Avatar> 
                <div className='chat_name'>
                    <h3>Andrea</h3>
                    <p> ultima visita... </p>
                    </div> 

                   <div className='chat_icone_lente'>
                    <IconButton>
                        <SearchOutlined></SearchOutlined>
                    </IconButton>
                   </div>
            </div>
            
            <div className='chat_body'>
                <p className='chat_messaggiInterni'>
                    <span className='chat_nomeInterno'>MIO NOME</span>
                    messaggio
                    <span className='chat_dataInvio'>{new Date().toUTCString()}</span>
                </p>

                <p className='chat_messaggiInterni chat_messRicevuti'>
                    <span className='chat_nomeInterno'>MIO NOME</span>
                    messaggio
                    <span className='chat_dataInvio'>{new Date().toUTCString()}</span>
                </p>

                <p className='chat_messaggiInterni'>
                    <span className='chat_nomeInterno'>MIO NOME</span>
                    messaggio
                    <span className='chat_dataInvio'>{new Date().toUTCString()}</span>
                </p>

            </div>
            
            <div className='chat_casellaTesto'>
                <form>
            <input type='text'placeholder='scrivi un messaggio'></input>
            <button type='submit'> invia</button>
                </form>
            </div>

        </div>
        
        
        
    );
}

export default Chat;

