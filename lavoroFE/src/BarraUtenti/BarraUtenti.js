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
                <BarraUtentiChat src="https://www.google.com/imgres?q=immagini%20random&imgurl=https%3A%2F%2Fioflood.com%2Fblog%2Fwp-content%2Fuploads%2F2023%2F10%2Fjava_logo_dice_random.jpg&imgrefurl=https%3A%2F%2Fioflood.com%2Fblog%2Fjava-random%2F&docid=NUHj1btUQFAskM&tbnid=NuOok3QnrL9H6M&vet=12ahUKEwiJ-9m956OGAxXUxQIHHe-3BgcQM3oECDIQAA..i&w=512&h=512&hcb=2&ved=2ahUKEwiJ-9m956OGAxXUxQIHHe-3BgcQM3oECDIQAA"/>
                <BarraUtentiChat/>
                <BarraUtentiChat/>
                <BarraUtentiChat/>
            </div>

        </div>
        
    );
}
export default BarraUtenti;