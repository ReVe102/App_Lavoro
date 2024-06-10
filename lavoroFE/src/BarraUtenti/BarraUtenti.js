import React from 'react';
import './BarraUtenti.css';
import EditIcon from '@mui/icons-material/Create';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Avatar, IconButton } from '@mui/material';
import BarraUtentiChat from './BarraUtentiChat';


const BarraUtenti= () =>{
    return (
        <div className='BarraUtenti'>
            <div className='BarraUtenti__header'>
                <div className='BarraUtenti_header_sinistro'>
                <IconButton>
                        <Avatar src="https://th.bing.com/th/id/R.236f1726f4661b4abb8475c53ff00546?rik=oiPTfmGkIbVkrA&riu=http%3a%2f%2fwallpapercave.com%2fwp%2fRIH6ewo.jpg&ehk=7BqOKclSqmWRz%2fUM5WPJMQ5BzPPDxtYugbgWKocTOkM%3d&risl=&pid=ImgRaw&r=0" />
                    </IconButton>
                
                <div className='BarraUtenti_header_destro'>
                    <IconButton>
                        <EditIcon />
                    </IconButton>
                </div>
                </div>
            </div>
            <div className='BarraUtenti_ricerca'>
                <div className='BarraUtenti_ricerca_contenitore'>
                    <SearchOutlinedIcon />
                    <input  placeholder='cerca utente'
                    type='text' > 
                    </input>
                </div>
            </div>
            <div className='BarraUtentiChat'>
                <BarraUtentiChat></BarraUtentiChat>
            </div>
     </div>
        
        

        
    )
}
export default BarraUtenti