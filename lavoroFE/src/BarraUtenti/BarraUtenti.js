import React from 'react';
import './BarraUtenti.css';
import EditIcon from '@mui/icons-material/Create';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
 import { Avatar ,IconButton } from '@mui/material';
import BarraUtentiChat from './BarraUtentiChat';



function BarraUtenti(){
    return (
        <div className='BarraUtenti'>
            <div className='BarraUtenti_header'>
                <div className='BarraUtenti_Header_left'>
                    <IconButton>
                    <Avatar src="">
                    </Avatar>
                    </IconButton>
        </div>
                <div className='BarraUtenti_header_right'>
                    <IconButton>
                    <EditIcon></EditIcon>
                    </IconButton>
                </div>
            </div>
            <div className='BarraUtenti_ricerca'>
            <div className='BarraUtenti_ricerca_contenitore'>
                <SearchOutlinedIcon></SearchOutlinedIcon>
                <input type='text'placeholder='cerca utente'></input>
            </div>
            </div>

            <div className='BarraUtenti_chat'> 
                <BarraUtentiChat/>
                <BarraUtentiChat/>
                <BarraUtentiChat/>
                <BarraUtentiChat/>
            </div>

        </div>
        
    );
}
export default BarraUtenti;