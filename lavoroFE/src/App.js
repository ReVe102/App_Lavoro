import React, { useEffect, useState } from 'react';
import './App.css';
import BarraUtenti from './BarraUtenti/BarraUtenti';
import Chat from './chat/Chat';
import Pusher from 'pusher-js';
import axios from './axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';


function App() {
    const [message, setMessages] = useState([]);
    const [user, setUser] = useState("f");

    useEffect(() => {
        axios.get('/api/v1/messages/sync').then((response) => {
            setMessages(response.data);
        });
    }, [message]);

    useEffect(() => {
        const pusher = new Pusher('29ad70d39a06d2b41e06', {
            cluster: 'eu'
        });

        const channel = pusher.subscribe('messages');
        channel.bind('inserted', function (newMessage) {
            setMessages([...message, newMessage]);
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [message]);

    return (
        <div className="app">
            <Router>
                {!user ? (
                    <Login />
                ) : (
                    <div className="app_body">
                        <BarraUtenti />
                        <Routes>
                            <Route path='/stanze/:stanzeID' element={<Chat message={message} />} />
                            <Route path='/' element={
                                <div className="infIniziali">
                                    <div className='infoOgg'>
                                        Seleziona una chat
                                    </div>
                                </div>
                            } />
                        </Routes>
                    </div>
                )}
            </Router>
        </div>
    );
}

export default App;