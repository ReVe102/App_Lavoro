import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import "./Profilo.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faEdit } from '@fortawesome/free-solid-svg-icons';


const Profilo = () => {

    const navigate=useNavigate()
    const [userData, setUserData] = useState({});
    const [paragrafo, setParagrafo] = useState("panoramica");

    useEffect(() => {
        fetch("http://localhost:3000/userData", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                token: window.localStorage.getItem("token")
            }),
        }).then((res) => res.json())
            .then((data) => {
                setUserData(data.data);

                console.log(data, "userData");
                if(data.data=="token expired"){
                    alert("token scaduto. fai Log in ")
                     window.localStorage.clear();
                     window.location.href="./Login"
                }
            });
    }, []);
    
const logout = () =>{
        window.localStorage.clear();
        window.location.href="./Login"

    }
////metti un gigante {userData.status==="privato" && (tutto il codice che c'è qui sotto)} poi {userData.status==="azineda" && ( il codice che c'è qui sotto MA PER AZIENDE)}
///cambiano anche i vari set paragrafo, ma panoramica di default va bene per entrambi gli status perche è una sezione comune
    if (userData === null) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <div className="header">
                {userData.image==""||userData.image==null?<img src="/Users/youssefouk/Desktop/progetto serio/vite-project/public/default-pfp-1.jpg" alt="Profile"/>: <img src={userData.image} alt="Profile"/>}
                <div className="nomeutente">
                    <h1>{userData.name} {userData.status}</h1>
                    <br />
                </div>
                <button type="submit">Chat {userData.status}</button> 
                <br />
                <button onClick={logout} type="submit">Logout {userData.status}</button>

            </div>
            {userData.status==="privato" && (<div className="footer">
                <div className="leftbar">
                    <div className="titoloLeftbar"><h2>Informazioni</h2>
                    <FontAwesomeIcon icon={faEdit} onClick={()=>navigate("/updateUser", {state:userData})}/></div>
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
                                <li>posizione lavorativa ricercata: {userData.posizionelavorativaricercata}</li>
                            </ul>
                        )}
                        {paragrafo === "lavoro" && (
                            <ul>
                                <li>esperienza lavorativa più recente: {userData.ultimolavoro}</li>
                                <li>esperienze lavorative precedenti: {userData.lavoriprecedenti}</li>
                            </ul>
                        )}
                        {paragrafo === "istruzione" && (
                            <ul>
                                <li>Scuola secondaria: {userData.scuolasuperiore}</li>
                                {userData.corsodilaurea && <li>Università: {userData.corsodilaurea}</li>}
                            </ul>
                        )}
                        {paragrafo === "lingue e certificazioni" && (
                            <ul>
                                <li>lingua madre: {userData.linguamadre}</li>
                                <li>altre lingue: {userData.altrelingue}</li>
                                {userData.certificazionilinguistiche && <li>certificazioni linguistiche: {userData.certificazionilinguistiche}</li>}
                                {userData.certificazioniinformatiche && <li>certificazioni informatiche: {userData.certificazioniinformatiche}</li>}
                            </ul>
                        )}
                        {paragrafo === "informazioni di contatto" && (
                            <ul>
                                <li>email: {userData.email}</li>
                                <li>cellulare: {userData.cellulare}</li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>)}
            {userData.status==="azienda" && (<div className="footer">
                <div className="leftbar">
                    <div className="titoloLeftbar"><h2>Informazioni</h2>
                    <FontAwesomeIcon icon={faEdit} onClick={()=>navigate("/updateUser", {state:userData})}/></div>
                    <div className="formsx"> 
                        <button onClick={() => setParagrafo("panoramica")}>Panoramica {paragrafo === "panoramica" ? "si" : "no"}</button>
                        <button onClick={() => setParagrafo("profilo aziendale")}>Profilo Aziendale {paragrafo === "profilo aziendale" ? "si" : "no"}</button>
                        <button onClick={() => setParagrafo("dettagli organizzativi")}>Dettagli organizzativi {paragrafo === "dettagli organizzativi" ? "si" : "no"}</button>
                        <button onClick={() => setParagrafo("contatti e sedi")}>contatti e sedi</button>
                    </div>
                </div>

                <div className="vertical-line"></div>
                <div className="paragrafo">
                    <h2>{paragrafo}</h2>
                    <div className="testo">
                        {paragrafo === "panoramica" && (
                            <ul>
                                <li>Nome azienda: {userData.name}</li>
                                <li>sede legale: {userData.sedelegale}</li>
                                <li>fondata da: {userData.fondatori}</li>
                                <li>Premi: {userData.premi}</li>
                                <li>sito web: {userData.sitoweb}</li>


                            </ul>
                        )}
                        {paragrafo === "profilo aziendale" && (
                            <ul>
                                <li>Descrizione: {userData.descrizione}</li>
                                <li>Target: {userData.clienteladiriferimento}</li>
                                <li>Descrizione: {userData.descrizione}</li>
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
                                <li>sito web: {userData.sitoweb}</li>


                            </ul>
                        )}
                    </div>
                </div>
            </div>)}


            
        </div>
    );
};

export default Profilo;
