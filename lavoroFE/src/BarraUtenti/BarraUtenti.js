import React, { useEffect, useState } from 'react';
import './BarraUtenti.css';
import EditIcon from '@mui/icons-material/Create';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Avatar, IconButton } from '@mui/material';
import BarraUtentiChat from './BarraUtentiChat';
import axios from '../axios';

const BarraUtenti = () => {

    const [stanze, setStanze] = useState([]);
    useEffect(() => {
        axios.get("/api/v1/stanze/sync").then((response) => {
            //alert(JSON.stringify(response.data))
            setStanze(response.data)
        })
    }, [])

    //messaggio quando creo una chat
    const CreaChat = async () => {
        const NomeStanza = prompt("inserisci nome della chat")
        if (NomeStanza) {
            await axios.post("/api/v1/stanze", {
                name: NomeStanza
            }).then((response) => {
                setStanze([...stanze, response.data]) //response.data ci tornava il nome della stanza con id e tutto 
            })
        }

    }
    return (
        <div className='BarraUtenti'>
            <div className='BarraUtenti__header'>
                <div className='BarraUtenti_header_sinistro'>
                    <IconButton>
                        <Avatar src="https://th.bing.com/th/id/R.236f1726f4661b4abb8475c53ff00546?rik=oiPTfmGkIbVkrA&riu=http%3a%2f%2fwallpapercave.com%2fwp%2fRIH6ewo.jpg&ehk=7BqOKclSqmWRz%2fUM5WPJMQ5BzPPDxtYugbgWKocTOkM%3d&risl=&pid=ImgRaw&r=0" />
                    </IconButton>
                    <IconButton>
                        <EditIcon />
                    </IconButton>
                </div>
                <div className='BarraUtenti_header_destro'>
                </div>
            </div>
            <div className='BarraUtenti_ricerca'>
                <div className='BarraUtenti_ricerca_contenitore'>
                    <SearchOutlinedIcon />
                    <input placeholder='cerca utente'
                        type='text' >
                    </input>
                </div>
            </div>
            <div className='BarraUtenti_chat'>
                <div onClick={CreaChat} className='BarraUtentiChat'>
                    <h3>Aggiungi una nuova chat</h3>
                </div>
                {stanze.map((stanze, index) => {
                    return <BarraUtentiChat key={index} stanza={stanze} />
                })}
            </div>
        </div>
    )
}
export default BarraUtenti