import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Post from './post/Post';
import './Profilo.css';


const ProfiloUtente = () => {
    const { privatoId, aziendaId } = useParams();
    const [userOrAzienda, setUserOrAzienda] = useState({});
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [paragrafo, setParagrafo] = useState('panoramica');

    useEffect(() => {
        const fetchData = async () => {
            try {
                let userResponse;
                let postsResponse;

                if (privatoId) {
                    userResponse = await axios.get(`http://localhost:3000/privati/${privatoId}`);
                    console.log(`User response for privatoId ${privatoId}:`, userResponse.data);
                    postsResponse = await axios.get(`http://localhost:3000/posts/privato/${privatoId}`);
                    console.log(`Posts response for privatoId ${privatoId}:`, postsResponse.data);
                } else if (aziendaId) {
                    userResponse = await axios.get(`http://localhost:3000/aziende/${aziendaId}`);
                    console.log(`User response for aziendaId ${aziendaId}:`, userResponse.data);
                    postsResponse = await axios.get(`http://localhost:3000/posts/azienda/${aziendaId}`);
                    console.log(`Posts response for aziendaId ${aziendaId}:`, postsResponse.data);
                }

                if (userResponse) {
                    setUserOrAzienda(userResponse.data);
                    console.log('User or Azienda Data:', userResponse.data);
                }

                if (postsResponse && postsResponse.data) {
                    setPosts(postsResponse.data);
                    console.log('Posts Data:', postsResponse.data);
                } else {
                    console.log('Nessun post trovato.');
                }

                setLoading(false);
            } catch (error) {
                console.error('Errore nel recuperare i dati dell\'utente', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [privatoId, aziendaId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!userOrAzienda) {
        return <div>Dati utente non disponibili.</div>;
    }

    const renderInformazioni = () => {
        if (userOrAzienda.status === "privato") {
            return (
                <div className="formsx">
                    <button onClick={() => setParagrafo("panoramica")}>Panoramica {paragrafo === "panoramica" ? "si" : "no"}</button>
                    <button onClick={() => setParagrafo("lavoro")}>Lavoro {paragrafo === "lavoro" ? "si" : "no"}</button>
                    <button onClick={() => setParagrafo("istruzione")}>Istruzione {paragrafo === "istruzione" ? "si" : "no"}</button>
                    <button onClick={() => setParagrafo("certificazioni")}>Certificazioni {paragrafo === "certificazioni" ? "si" : "no"}</button>
                    <button onClick={() => setParagrafo("informazioni di contatto")}>Informazioni di contatto {paragrafo === "informazioni di contatto" ? "si" : "no"}</button>
                </div>
            );
        } else if (userOrAzienda.status === "azienda") {
            return (
                <div className="formsx">
                    <button onClick={() => setParagrafo("panoramica")}>Panoramica {paragrafo === "panoramica" ? "si" : "no"}</button>
                    <button onClick={() => setParagrafo("profilo aziendale")}>Profilo Aziendale {paragrafo === "profilo aziendale" ? "si" : "no"}</button>
                    <button onClick={() => setParagrafo("dettagli organizzativi")}>Dettagli organizzativi {paragrafo === "dettagli organizzativi" ? "si" : "no"}</button>
                    <button onClick={() => setParagrafo("contatti e sedi")}>Contatti e sedi {paragrafo === "contatti e sedi" ? "si" : "no"}</button>
                </div>
            );
        }
    };

    const renderParagrafo = () => {
        if (userOrAzienda.status === "privato") {
            switch (paragrafo) {
                case "panoramica":
                    return (
                        <ul>
                            <li><b>{userOrAzienda.impiego}</b></li>
                            <li>Vive a: {userOrAzienda.luogoresidenza}</li>
                            <li>Nato a: {userOrAzienda.luogonascita}</li>
                            <li>posizione lavorativa ricercata: {userOrAzienda.posizionelavorativaricercata}</li>
                        </ul>
                    );
                case "lavoro":
                    return (
                        <ul>
                            <li>esperienza lavorativa più recente: {userOrAzienda.ultimolavoro}</li>
                            <li>esperienze lavorative precedenti: {userOrAzienda.lavoriprecedenti}</li>
                        </ul>
                    );
                case "istruzione":
                    return (
                        <ul>
                            <li>Scuola secondaria: {userOrAzienda.scuolasuperiore}</li>
                            {userOrAzienda.corsodilaurea && <li>Università: {userOrAzienda.corsodilaurea}</li>}
                        </ul>
                    );
                case "certificazioni":
                    return (
                        <ul>
                            <li>lingua madre: {userOrAzienda.linguamadre}</li>
                            <li>altre lingue: {userOrAzienda.altrelingue}</li>
                            {userOrAzienda.certificazionilinguistiche && <li>certificazioni linguistiche: {userOrAzienda.certificazionilinguistiche}</li>}
                            {userOrAzienda.certificazioniinformatiche && <li>certificazioni informatiche: {userOrAzienda.certificazioniinformatiche}</li>}
                        </ul>
                    );
                case "informazioni di contatto":
                    return (
                        <ul>
                            <li>email: {userOrAzienda.email}</li>
                            <li>cellulare: {userOrAzienda.cellulare}</li>
                        </ul>
                    );
                default:
                    return null;
            }
        } else if (userOrAzienda.status === "azienda") {
            switch (paragrafo) {
                case "panoramica":
                    return (
                        <ul>
                            <li>Nome azienda: {userOrAzienda.name}</li>
                            <li>Sede legale: {userOrAzienda.sedelegale}</li>
                            <li>Fondata da: {userOrAzienda.fondatori}</li>
                            <li>Premi: {userOrAzienda.premi}</li>
                            <li>Sito web: {userOrAzienda.sitoweb}</li>
                        </ul>
                    );
                case "profilo aziendale":
                    return (
                        <ul>
                            <li>Descrizione: {userOrAzienda.descrizione}</li>
                            <li>Target: {userOrAzienda.clienteladiriferimento}</li>
                            <li>Numero dipendenti: {userOrAzienda.numerodipendenti}</li>
                            <li>Fatturato annuale: {userOrAzienda.fatturatoannuale}</li>
                            <li>Mercati: {userOrAzienda.mercati}</li>
                        </ul>
                    );
                case "dettagli organizzativi":
                    return (
                        <ul>
                            <li>Settore: {userOrAzienda.settore}</li>
                            <li>Fondatori: {userOrAzienda.fondatori}</li>
                            <li>CEO: {userOrAzienda.ceo}</li>
                            <li>Struttura societaria: {userOrAzienda.strutturasocietaria}</li>
                            <li>Certificazioni: {userOrAzienda.certificazioni}</li>
                            <li>Premi: {userOrAzienda.premi}</li>
                        </ul>
                    );
                case "contatti e sedi":
                    return (
                        <ul>
                            <li>Sede legale: {userOrAzienda.sedelegale}</li>
                            <li>Sedi operative: {userOrAzienda.sedioperative}</li>
                            <li>Telefono: {userOrAzienda.telefono}</li>
                            <li>Email: {userOrAzienda.email}</li>
                            <li>Sito web: {userOrAzienda.sitoweb}</li>
                        </ul>
                    );
                default:
                    return null;
            }
        }
    };

    return (
        <div className="container">
            <div className="header">
                {userOrAzienda.image === "" || userOrAzienda.image == null
                    ? <img src="/default-pfp-1.jpg" alt="Profile"/>
                    : <img src={userOrAzienda.image} alt="Profile"/>}
                <div className="nomeutente">
                    <h1>{userOrAzienda.name} {userOrAzienda.status}</h1>
                    <br />
                </div>
                <Link to="/chat">
                    <button className="chatButton">Sono interessato</button>
                </Link>

                //bottone che mi serve
            </div>
            <div className="footer">
                <div className="leftbar">
                    <div className="titoloLeftbar"><h2>Informazioni</h2></div>
                    {renderInformazioni()}
                </div>
                <div className="vertical-line"></div>
                <div className="paragrafo">
                    <h2>{paragrafo}</h2>
                    <div className="testo">
                        {renderParagrafo()}
                    </div>
                </div>
            </div>
            <div className="mainbar">
                <div className="posts">
                {posts.map((post) => (
                        <Post key={post._id} post={post} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProfiloUtente;
