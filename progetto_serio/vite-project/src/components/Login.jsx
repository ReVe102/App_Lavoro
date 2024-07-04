import { Component } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Login.css"
import React, { useState } from "react";

import password_icon from '../assets/password.png'
import email_icon from '../assets/person.png'


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("privato")
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita che il form esegua il comportamento predefinito di invio e ricarica della pagina.

    console.log(email, password);

    fetch("http://localhost:3000/login", {  //Invia una richiesta POST all’endpoint /login del server 
                                            //con le credenziali (email e password) e uno lo status dell'utente.
      method: "POST",
      crossDomain: true, // Indica che la richiesta è cross-origin: richiesta HTTP a un dominio diverso da quello della pagina corrente,
                          // e richiede che il server gestisca correttamente gli header CORS per permettere queste richieste.
                          //cors: È un meccanismo che consente al server di specificare quali origini sono autorizzate ad accedere alle risorse del server.
                          // Lo fa attraverso specifici header HTTP.
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",   //tipi di contenuti accettati e inviati
      },
      body: JSON.stringify({ //i dati inviati nel corpo della richiesta, convertiti in formato JSON.
        email,
        password,
        status
      }),
    })
      .then((res) => res.json())        //Converte la risposta del server in JSON e stampa i dati su console
      .then((data) => {
        console.log(data, "userLogin");  
        if (data.status === "ok") {    //Se la risposta indica che il login è riuscito : salva il token nel localstorage e imposta loggedIn a true
          window.localStorage.setItem("token", data.data);
          window.localStorage.setItem("loggedIn", true);

          // Recupera i dati dell'utente e li salva nel localStorage
          fetch("http://localhost:3000/userData", {  //invia una seconda richiesta POST all’endpoint `/userData` con 
                                                      //il token di autenticazione per recuperare i dati dell’utente.
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({  //nella richiesta post invia il token
              token: data.data
            }),
          }).then((res) => res.json())
            .then((userData) => {
              window.localStorage.setItem("userData", JSON.stringify(userData.data)); //salva i dati utente nel local storage
              navigate("/Profilo");  //ci spostiamo nella pagina del profilo
            }); 
        } else {
          alert(data.status);
        }
      });
  };

  return (
    <div className="login">
      <div className="login-container">
        <h2>Accedi</h2>
        <div className="form-group">
          <form onSubmit={handleSubmit} action="input" method="post">
            <div className="inputs">

            <div className="input">
              <img src={email_icon} alt=""/>
              <input
              type="text"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="E-mail"
              />
            </div>

            <div className="input">
              <img src={password_icon} alt=""/>
              <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            </div>
            
            
            </div>
            
            
            <select
              id="status"
              name="status"
              class="custom-select"
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="privato">Privato</option>
              <option value="azienda">Azienda</option>
            </select>
            
            

            <button type="submit">Accedi</button>
          </form>
        </div>
        <div className="domanda">Non hai un account?
          <a href="/register"> Registrati</a>
        </div>
      </div>
    </div>
  );
}
