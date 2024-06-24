import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Register.css";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        image: "",
        biografia: "",
        datanascita: "",
        impiego: "",
        ultimolavoro: "",
        lavoriprecedenti: "",
        indirizzosuperiore: "",
        corsodilaurea: "",
        posizionelavorativaricercata: "",
        luogonascita: "",
        luogoresidenza: "",
        cellulare: "",
        descrizione: "",
        cienteladiriferimento: "",
        numerodipendenti: "",
        fatturatoannuale: "",
        mercati: "",
        settore: "",
        fondatori: "",
        ceo: "",
        strutturasocietaria: "",
        certificazioni: "",
        premi: "",
        sedelegale: "",
        sedioperative: "",
        telefono: "",
        sitoweb: "",
        status:"",
    });

    const [userType, setUserType] = useState("privato"); // Stato per gestire la selezione tra Azienda e Privato
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setFormData(prevState => ({
                    ...prevState,
                    image: reader.result
                }));
            };
            reader.onerror = error => {
                console.error("Error: ", error);
            };
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(userType=="privato"){
            fetch("http://localhost:3000/register", {
                method: "POST",
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    ...formData,
                    userType // Aggiungi il tipo di utente nel payload della richiesta
                }),
            }).then((res) => res.json())
                .then((data) => {
                    console.log(data, "userRegister");
                    navigate("/login");
                });
        }else{
            fetch("http://localhost:3000/registerAzienda", {
                method: "POST",
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    ...formData,
                    userType // Aggiungi il tipo di utente nel payload della richiesta
                }),
            }).then((res) => res.json())
                .then((data) => {
                    console.log(data, "aziendaRegister");
                    navigate("/login");
                });
        }
        
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleUserTypeChange = (type) => {
        setUserType(type);
    };

    return (
        <div className="login">
            <div className="login-container">
                <h2>Registrati come {userType}</h2>
                <div className="form-group">
                    
                    <div className="user-type-selection">
                        <button type="button" onClick={() => handleUserTypeChange("privato")}>
                            Privato
                        </button>
                        <button type="button" onClick={() => handleUserTypeChange("azienda")}>
                            Azienda
                        </button>
                    </div>


                    <form onSubmit={handleSubmit} method="post">
                        <input 
                            type="text"
                            id="nome"
                            name="name"
                            required
                            onChange={handleChange}
                            placeholder="Nome completo" 
                        />

                        <input
                            type="text"
                            id="email" 
                            name="email"
                            onChange={handleChange}
                            required
                            placeholder="E-mail"
                        />

                        <input 
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            required
                        />

                        {userType === "privato" && (
                            <>
                                <input
                                    type="text"
                                    id="biografia"
                                    name="biografia"
                                    onChange={handleChange}
                                    required
                                    placeholder="Biografia..."
                                />

                                <input
                                    type="date"
                                    id="datanascita"
                                    name="datanascita"
                                    onChange={handleChange}
                                    required
                                    placeholder="Data di nascita"
                                />

                                <input
                                    type="text"
                                    id="impiego"
                                    name="impiego"
                                    onChange={handleChange}
                                    required
                                    placeholder="Impiego..."
                                />

                                <input
                                    type="text"
                                    id="ultimolavoro"
                                    name="ultimolavoro"
                                    onChange={handleChange}
                                    required
                                    placeholder="Ultimo lavoro..."
                                />

                                <input
                                    type="text"
                                    id="lavoriprecedenti"
                                    name="lavoriprecedenti"
                                    onChange={handleChange}
                                    required
                                    placeholder="Lavori precedenti..."
                                />

                                <input
                                    type="text"
                                    id="indirizzosuperiore"
                                    name="indirizzosuperiore"
                                    onChange={handleChange}
                                    required
                                    placeholder="Indirizzo superiore..."
                                />

                                <input
                                    type="text"
                                    id="corsodilaurea"
                                    name="corsodilaurea"
                                    onChange={handleChange}
                                    required
                                    placeholder="Corso di laurea..."
                                />

                                <input
                                    type="text"
                                    id="posizionelavorativaricercata"
                                    name="posizionelavorativaricercata"
                                    onChange={handleChange}
                                    required
                                    placeholder="Posizione lavorativa ricercata..."
                                />

                                <input
                                    type="text"
                                    id="luogonascita"
                                    name="luogonascita"
                                    onChange={handleChange}
                                    required
                                    placeholder="Luogo di nascita..."
                                />

                                <input
                                    type="text"
                                    id="luogoresidenza"
                                    name="luogoresidenza"
                                    onChange={handleChange}
                                    required
                                    placeholder="Luogo di residenza..."
                                />

                                <input
                                    type="text"
                                    id="cellulare"
                                    name="cellulare"
                                    onChange={handleChange}
                                    required
                                    placeholder="Cellulare..."
                                />
                            </>
                        )}

                        {userType === "azienda" && (
                            <>
                                <input
                                    type="text"
                                    id="descrizione"
                                    name="descrizione"
                                    onChange={handleChange}
                                    required
                                    placeholder="Descrizione..."
                                />

                                <input
                                    type="date"
                                    id="datanascita"
                                    name="datanascita"
                                    onChange={handleChange}
                                    required
                                    placeholder="Data di nascita"
                                />

                                <input
                                    type="text"
                                    id="cienteladiriferimento"
                                    name="cienteladiriferimento"
                                    onChange={handleChange}
                                    required
                                    placeholder="Clientela di riferimento..."
                                />

                                <input
                                    type="text"
                                    id="numerodipendenti"
                                    name="numerodipendenti"
                                    onChange={handleChange}
                                    required
                                    placeholder="Numero di dipendenti..."
                                />

                                <input
                                    type="text"
                                    id="fatturatoannuale"
                                    name="fatturatoannuale"
                                    onChange={handleChange}
                                    required
                                    placeholder="Fatturato annuale..."
                                />

                                <input
                                    type="text"
                                    id="mercati"
                                    name="mercati"
                                    onChange={handleChange}
                                    required
                                    placeholder="Mercati..."
                                />

                                <input
                                    type="text"
                                    id="settore"
                                    name="settore"
                                    onChange={handleChange}
                                    required
                                    placeholder="Settore..."
                                />

                                <input
                                    type="text"
                                    id="fondatori"
                                    name="fondatori"
                                    onChange={handleChange}
                                    required
                                    placeholder="Fondatori..."
                                />

                                <input
                                    type="text"
                                    id="ceo"
                                    name="ceo"
                                    onChange={handleChange}
                                    required
                                    placeholder="CEO..."
                                />

                                <input
                                    type="text"
                                    id="strutturasocietaria"
                                    name="strutturasocietaria"
                                    onChange={handleChange}
                                    required
                                    placeholder="Struttura societaria..."
                                />

                                <input
                                    type="text"
                                    id="certificazioni"
                                    name="certificazioni"
                                    onChange={handleChange}
                                    required
                                    placeholder="Certificazioni..."
                                />

                                <input
                                    type="text"
                                    id="premi"
                                    name="premi"
                                    onChange={handleChange}
                                    required
                                    placeholder="Premi..."
                                />

                                <input
                                    type="text"
                                    id="luogonascita"
                                    name="luogonascita"
                                    onChange={handleChange}
                                    required
                                    placeholder="Luogo di nascita..."
                                />

                                <input
                                    type="text"
                                    id="sedelegale"
                                    name="sedelegale"
                                    onChange={handleChange}
                                    required
                                    placeholder="Sede legale..."
                                />

                                <input
                                    type="text"
                                    id="sedioperative"
                                    name="sedioperative"
                                    onChange={handleChange}
                                    required
                                    placeholder="Sedi operative..."
                                />

                                <input
                                    type="text"
                                    id="telefono"
                                    name="telefono"
                                    onChange={handleChange}
                                    required
                                    placeholder="Telefono..."
                                />

                                <input
                                    type="text"
                                    id="sitoweb"
                                    name="sitoweb"
                                    onChange={handleChange}
                                    required
                                    placeholder="Sito web..."
                                />
                            </>
                        )}

                        <input
                            accept="image/*"
                            type="file"
                            onChange={handleFileChange}
                        />

                        <button className="pulsanteRegistrati" type="submit">Registrati</button>
                    </form>
                    <div className="registrato">
                        <a href="/login">Hai già un account? Accedi</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
