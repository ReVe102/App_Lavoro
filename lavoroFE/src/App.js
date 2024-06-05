import React, { useEffect, useState } from 'react';
import './App.css';
import BarraUtenti from './BarraUtenti/BarraUtenti';
import Chat from './chat/Chat';
import Pusher from "pusher-js";
import axios  from './axios';



function App() {
const [messages ,setMessages]= useState([])   // array che contiene tutti i nostri messaggi


useEffect (() => {
  axios.get("/api/v1/messages/sync").then((response)=>{
    console.log(response.data);
    setMessages(response.data);
  }).catch();
},[]);



  useEffect(()=>{    // ci permette di avere un contollo sulla start dell'app
    console.log("effetto app");

    var pusher = new Pusher('29ad70d39a06d2b41e06', {
      cluster: 'eu'
    });

    var channel = pusher.subscribe('messages');
    channel.bind('inserted', function(newMessage) {
      //alert(JSON.stringify(data));
      setMessages([...messages , newMessage]);
    });

    
  },[messages]);



  return (
    <div className="app">
      <div className="app_body"> 
     <BarraUtenti></BarraUtenti>
    <Chat messages={messages}></Chat>
    </div>
    </div>
  );
}

export default App;
