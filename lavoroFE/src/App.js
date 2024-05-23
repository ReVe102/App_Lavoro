import React from 'react';
import logo from './logo.svg';
import './App.css';
import BarraUtenti from './BarraUtenti/BarraUtenti';
import Chat from './chat/Chat';





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
