import { Component } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Register.css"
import React, { useState } from "react";

import password_icon from '../assets/password.png'
import email_icon from '../assets/person.png'


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("privato")
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);

    fetch("http://localhost:3000/login", {
      method: "POST",
      crossDomain: true,                                ///////rivedi perche appena cambiato tutto 
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
        status
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userLogin");
        if (data.status === "ok") {
          window.localStorage.setItem("token", data.data);
          window.localStorage.setItem("loggedIn", true);

          navigate("/Profilo")
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
            
            <div class="custom-select-container">
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
            </div>
            

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