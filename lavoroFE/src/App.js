import React, { useEffect, useState } from 'react';
import './App.css';
import BarraUtenti from './BarraUtenti/BarraUtenti';
import Chat from './chat/Chat';
import Pusher from "pusher-js";
import axios from './axios';

function App() {
   
    return (
        <div className="app">
            <div className="app_body">
            <BarraUtenti></BarraUtenti>
            <Chat></Chat>
            </div>
            </div>
    );
}

export default App;
