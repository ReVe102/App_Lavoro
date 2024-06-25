import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Share from './share/Share';
import PostLogin from './PostLogin'; 
import './Profilo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Profilo = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [paragrafo, setParagrafo] = useState('panoramica');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = window.localStorage.getItem('token');
                if (!token) {
                    throw new Error('Token non trovato');
                }

                const userDataResponse = await axios.post('http://localhost:3000/userData', { token });
                console.log('UserData Response:', userDataResponse.data);
                if (userDataResponse.data.status === 'error' && userDataResponse.data.data === 'token expired') {
                    alert('Token scaduto. Effettua il login.');
                    window.localStorage.clear();
                    navigate('/Login');
                } else {
                    setUserData(userDataResponse.data.data);
                    
                    const postsResponse = await axios.get('http://localhost:3000/posts/profilo', {
                        headers: {
                            Authorization: token
                        }
                    });
                    console.log('Posts Response:', postsResponse.data);

                    // Ordina i post per data di creazione decrescente
                    const sortedPosts = postsResponse.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    setUserPosts(sortedPosts);
                }
                setLoading(false);
            } catch (error) {
                console.error('Errore nel recuperare i dati dell\'utente', error);
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    const logout = () => {
        window.localStorage.clear();
        navigate('/Login');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!userData) {
        return <div>Dati utente non disponibili.</div>;
    }

    return (
        <div className="container">
            <div className="header">
                <img src={userData.image || "/default-pfp-1.jpg"} alt="Profile" />
                <div className="nomeutente">
                    <h1>{userData.name} {userData.status}</h1>
                    <br />
                </div>
                <button type="submit">notifiche {userData.status}</button>
                <br />
                <div className="navbar">
                    <div className="navbarLeft">
                        <Link to="/feedAziende" className="navbarLink">Feed aziende</Link>
                        <Link to="/feedPrivati" className="navbarLink">Feed privati</Link>
                    </div>
                    <div className="navbarRight">
                        <button className="navbarButton" onClick={logout}>Logout</button>
                    </div>
                </div>
            </div>
            {userData.status === "privato" && (
                <div className="footer">
                    <div className="leftbar">
                        <div className="titoloLeftbar">
                            <h2>Informazioni</h2>
                            <FontAwesomeIcon icon={faEdit} onClick={() => navigate("/updateUser", { state: userData })} />
                        </div>
                        <div className="formsx">
                            <button onClick={() => setParagrafo("panoramica")}>Panoramica {paragrafo === "panoramica" ? "si" : "no"}</button>
                            <button onClick={() => setParagrafo("lavoro")}>Lavoro {paragrafo === "lavoro" ? "si" : "no"}</button>
                            <button onClick={() => setParagrafo("istruzione")}>Istruzione {paragrafo === "istruzione" ? "si" : "no"}</button>
                            <button onClick={() => setParagrafo("certificazioni")}>Certificazioni</button>
                            <button onClick={() => setParagrafo("informazioni di contatto")}>Informazioni di contatto</button>
                        </div>
                    </div>
                    <div className="vertical-line"></div>
                    <div className="paragrafo">
                        <h2>{paragrafo}</h2>
                        <div className="testo">
                            {paragrafo === "panoramica" && (
                                <ul>
                                    <li><b>{userData.impiego}</b></li>
                                    <li>Vive a: {userData.luogoresidenza}</li>
                                    <li>Nato a: {userData.luogonascita}</li>
                                    <li>Posizione lavorativa ricercata: {userData.posizionelavorativaricercata}</li>
                                </ul>
                            )}
                            {paragrafo === "lavoro" && (
                                <ul>
                                    <li>Esperienza lavorativa più recente: {userData.ultimolavoro}</li>
                                    <li>Esperienze lavorative precedenti: {userData.lavoriprecedenti}</li>
                                </ul>
                            )}
                            {paragrafo === "istruzione" && (
                                <ul>
                                    <li>Scuola secondaria: {userData.scuolasuperiore}</li>
                                    {userData.corsodilaurea && <li>Università: {userData.corsodilaurea}</li>}
                                </ul>
                            )}
                            {paragrafo === "certificazioni" && (
                                <ul>
                                    <li>Lingua madre: {userData.linguamadre}</li>
                                    <li>Altre lingue: {userData.altrelingue}</li>
                                    {userData.certificazionilinguistiche && <li>Certificazioni linguistiche: {userData.certificazionilinguistiche}</li>}
                                    {userData.certificazioniinformatiche && <li>Certificazioni informatiche: {userData.certificazioniinformatiche}</li>}
                                </ul>
                            )}
                            {paragrafo === "informazioni di contatto" && (
                                <ul>
                                    <li>Email: {userData.email}</li>
                                    <li>Cellulare: {userData.cellulare}</li>
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            )}
            {userData.status === "azienda" && (
                <div className="footer">
                    <div className="leftbar">
                        <div className="titoloLeftbar">
                            <h2>Informazioni</h2>
                            <FontAwesomeIcon icon={faEdit} onClick={() => navigate("/updateUser", { state: userData })} />
                        </div>
                        <div className="formsx">
                            <button onClick={() => setParagrafo("panoramica")}>Panoramica {paragrafo === "panoramica" ? "si" : "no"}</button>
                            <button onClick={() => setParagrafo("profilo aziendale")}>Profilo Aziendale {paragrafo === "profilo aziendale" ? "si" : "no"}</button>
                            <button onClick={() => setParagrafo("dettagli organizzativi")}>Dettagli organizzativi {paragrafo === "dettagli organizzativi" ? "si" : "no"}</button>
                            <button onClick={() => setParagrafo("contatti e sedi")}>Contatti e sedi</button>
                        </div>
                    </div>
                    <div className="vertical-line"></div>
                    <div className="paragrafo">
                        <h2>{paragrafo}</h2>
                        <div className="testo">
                            {paragrafo === "panoramica" && (
                                <ul>
                                    <li>Nome azienda: {userData.name}</li>
                                    <li>Sede legale: {userData.sedelegale}</li>
                                    <li>Fondata da: {userData.fondatori}</li>
                                    <li>Premi: {userData.premi}</li>
                                    <li>Sito web: {userData.sitoweb}</li>
                                </ul>
                            )}
                            {paragrafo === "profilo aziendale" && (
                                <ul>
                                    <li>Descrizione: {userData.descrizione}</li>
                                    <li>Target: {userData.clienteladiriferimento}</li>
                                    <li>Numero dipendenti: {userData.numerodipendenti}</li>
                                    <li>Fatturato annuale: {userData.fatturatoannuale}</li>
                                    <li>Mercati: {userData.mercati}</li>
                                </ul>
                            )}
                            {paragrafo === "dettagli organizzativi" && (
                                <ul>
                                    <li>Settore: {userData.settore}</li>
                                    <li>Fondatori: {userData.fondatori}</li>
                                    <li>CEO: {userData.ceo}</li>
                                    <li>Struttura societaria: {userData.strutturasocietaria}</li>
                                    <li>Certificazioni: {userData.certificazioni}</li>
                                    <li>Premi: {userData.premi}</li>
                                </ul>
                            )}
                            {paragrafo === "contatti e sedi" && (
                                <ul>
                                    <li>Sede legale: {userData.sedelegale}</li>
                                    <li>Sedi operative: {userData.sedioperative}</li>
                                    <li>Telefono: {userData.telefono}</li>
                                    <li>Email: {userData.email}</li>
                                    <li>Sito web: {userData.sitoweb}</li>
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            )}
            <div className="mainbar">
                <Share />
            </div>
            <div className="posts">
                {userPosts.map((post) => (
                    <PostLogin key={post._id} post={post} />
                ))}
            </div>
        </div>
    );
};

export default Profilo;
