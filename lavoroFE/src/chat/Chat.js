import React, { useState , useEffect } from 'react';
import './Chat.css';
import { Avatar, IconButton } from '@mui/material';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import axios from "../axios";
import { input } from 'antd';
import { set } from 'mongoose';
import {useNavigate,  useParams } from 'react-router-dom';


const Chat = ({message}) =>{
    const {stanzeID} = useParams();
    const [NomeStanza , setNomeStanza] = useState("");
    const [input,setInput]=useState("");
    const navigate =useNavigate();

useEffect(()=>{
if(stanzeID){
    axios.get(`/api/v1/stanze/${stanzeID}`).then((response)=>{
        let stanza =response.data.stanze
        setNomeStanza(stanza && stanza.name)
    })
    .catch((error)=>{
        navigate("/");
    })
}
},[stanzeID])

    const sendMessage = async(e) =>{
        e.preventDefault();
        const body ={
            message : input , 
            name :"anananan",
            timestamp :new Date(),
            received : true
        }
        await axios.post("/api/v1/messages", body).then().catch();
setInput("")
    }


    return (
        <div className='chat'>
            <div className='chat_testa'>
            <div className='chat_name'>
                <h3>{NomeStanza}</h3>           

           </div>
        
        <div className='chat_testa_destro'>
              <IconButton>
                <SearchOutlined />
                </IconButton>  
        </div>
        </div>

        <div className='chat_body'>

            {message.map((message)=>{
                  return  <div> 

        <p className={`chat_messaggiInterni ${!message.ricevuti && "chat_messRicevuti"}`}>
        <span className='chat_nomeInterno'>{message.name}</span>
        {message.message}
        <span className='chat_timestamp'>{new Date(message.timestamp).toLocaleString()}</span>
                 </p>
                     </div>
            })}
            
           {/* <p className='chat_messRicevuti'>
                <span className='chat_nomeInterno'>jack</span>
                Message
             <span className='chat_timestamp'>{new Date().toUTCString()}</span>
            </p>*/}
               
        </div> 


        <div className='chat_casellaTesto'>
           <form>              
            <input 
            value={input}
            onChange={(e)=>setInput(e.target.value)}
            placeholder='scrivi un messaggio...' type='text'></input>
            <button 
            onClick={sendMessage}
            type='submit'>invia  </button>
             </form>
        </div>
        </div>
    )
}

export default Chat