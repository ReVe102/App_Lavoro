import React, { useState } from 'react';
import './Chat.css';
import { Avatar, IconButton } from '@mui/material';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import axios from "../axios";

function Chat({messages}){

    const [input ,setInput] = useState("");
const sendMessage = async(e) =>{
    e.preventDefault();

    await axios.post("/api/v1/messages",{
        message:input ,
        name:"nomeee",
        timestamp : "now" ,
        received : false
    } ).then();
    setInput("");
}

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
            { messages.map((message) => {
                return (
        <p key={messages._id} className={`chat_messaggiInterni ${message.received && "chat_messRicevuti"}`}>
            <span className="chat_nomeInterno">{message.name}</span>
            {message.message}
            <span className='chat_dataInvio'>{message.timestamp}</span>
        </p>
            )
})}


            </div>
            
            <div className='chat_casellaTesto'>
                <form>
            <input  value ={input}
            onChange={(e) => setInput(e.target.value)}
             placeholder='scrivi un messaggio'></input>
            <button onClick={sendMessage} type='submit'> invia</button>
                </form>
            </div>

        </div>
        
        
        
    );
}

export default Chat;

