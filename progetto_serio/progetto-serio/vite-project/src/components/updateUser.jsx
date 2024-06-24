import { useLocation } from "react-router"
import React, { useState, useEffect } from 'react';

function UpdateUser(){

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
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
        image: "",
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

    const location=useLocation()

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setUserData(prevState => ({
                    ...prevState,
                    image: reader.result
                }));
            };
            reader.onerror = error => {
                console.error("Error: ", error);
            };
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    

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
                console.log(data, "userData");
                setUserData(data.data);
                if(data.data=="token expired"){
                    alert("token scaduto. fai Log in ")
                     window.localStorage.clear();
                     window.location.href="./Login"
                }
            });
    }, []);

    const updateData=()=>{
        console.log(userData.email)
    
            fetch("http://localhost:3000/updateUser", {
                method: "POST",
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify(userData),
            }).then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    window.location.href="/Profilo"
                    
                });
    
        
    }
    console.log('QQQQuserData:', userData);


    return(

        <div className="login">
            <div className="login-container">
                <h2>Modifica Profilo</h2>
                <div className="form-group">
                <input 
                            type="text"
                            id="nome"
                            name="name"
                            required
                            placeholder="nome completo" 
                            defaultValue={userData.name}
                            onChange={handleChange}

                        />

                        <input
                            type="text"
                            id="email"
                            name="email"
                            disabled
                            placeholder="E-mail"
                            defaultValue={userData.email}


                        />

                        

                        <input
                            type="date"
                            id="datanascita"
                            name="datanascita"
                            required
                            placeholder="data di nascita"
                            defaultValue={userData.datanascita}
                            onChange={handleChange}


                        />
                        {userData.status === "privato" && (
                            <>
                        <input
                            type="text"
                            id="biografia"
                            name="biografia"
                            required
                            placeholder="biografia..."
                            defaultValue={userData.biografia}
                            onChange={handleChange}


                        />

                        <input
                            type="text"
                            id="impiego"
                            name="impiego"
                            required
                            placeholder="impiego..."
                            defaultValue={userData.impiego}
                            onChange={handleChange}


                        />

                        <input
                            type="text"
                            id="ultimolavoro"
                            name="ultimolavoro"
                            required
                            placeholder="ultimolavoro..."
                            defaultValue={userData.ultimolavoro}
                            onChange={handleChange}


                        />

                        <input
                            type="text"
                            id="lavoriprecedenti"
                            name="lavoriprecedenti"
                            required
                            placeholder="lavoriprecedenti..."
                            defaultValue={userData.lavoriprecedenti}
                            onChange={handleChange}


                        />

                        <input
                            type="text"
                            id="indirizzosuperiore"
                            name="indirizzosuperiore"
                            required
                            placeholder="indirizzosuperiore..."
                            defaultValue={userData.indirizzosuperiore}
                            onChange={handleChange}


                        />

                        <input
                            type="text"
                            id="corsodilaurea"
                            name="corsodilaurea"
                            required
                            placeholder="corsodilaurea..."
                            defaultValue={userData.corsodilaurea}
                            onChange={handleChange}


                        />

                        <input
                            type="text"
                            id="posizionelavorativaricercata"
                            name="posizionelavorativaricercata"
                            required
                            placeholder="posizionelavorativaricercata..."
                            defaultValue={userData.posizionelavorativaricercata}
                            onChange={handleChange}


                        />

                        <input
                            type="text"
                            id="luogonascita"
                            name="luogonascita"
                            required
                            placeholder="luogonascita..."
                            defaultValue={userData.luogonascita}
                            onChange={handleChange}


                        />

                        <input
                            type="text"
                            id="luogoresidenza"
                            name="luogoresidenza"
                            required
                            placeholder="luogoresidenza..."
                            defaultValue={userData.luogoresidenza}
                            onChange={handleChange}


                        />

                        <input
                            type="text"
                            id="cellulare"
                            name="cellulare"
                            required
                            placeholder="cellulare..."
                            defaultValue={userData.cellulare}
                            onChange={handleChange}


                        />
                        </>
                    )}
                    {userData.status === "azienda" && (
                            <>
                                <input
                                    type="text"
                                    id="descrizione"
                                    name="descrizione"
                                    defaultValue={userData.descrizione}
                                    required
                                    placeholder="Descrizione..."
                                    onChange={handleChange}

                                />

                                

                                <input
                                    type="text"
                                    id="cienteladiriferimento"
                                    name="cienteladiriferimento"
                                    onChange={handleChange}
                                    defaultValue={userData.cienteladiriferimento}

                                    required
                                    placeholder="Clientela di riferimento..."
                                />

                                <input
                                    type="text"
                                    id="numerodipendenti"
                                    name="numerodipendenti"
                                    onChange={handleChange}
                                    defaultValue={userData.numerodipendenti}

                                    required
                                    placeholder="Numero di dipendenti..."
                                />

                                <input
                                    type="text"
                                    id="fatturatoannuale"
                                    name="fatturatoannuale"
                                    onChange={handleChange}
                                    defaultValue={userData.fatturatoannuale}

                                    required
                                    placeholder="Fatturato annuale..."
                                />

                                <input
                                    type="text"
                                    id="mercati"
                                    name="mercati"
                                    onChange={handleChange}
                                    required
                                    defaultValue={userData.mercati}

                                    placeholder="Mercati..."
                                />

                                <input
                                    type="text"
                                    id="settore"
                                    name="settore"
                                    onChange={handleChange}
                                    defaultValue={userData.settore}

                                    required
                                    placeholder="Settore..."
                                />

                                <input
                                    type="text"
                                    id="fondatori"
                                    name="fondatori"
                                    defaultValue={userData.fondatori}

                                    onChange={handleChange}
                                    required
                                    placeholder="Fondatori..."
                                />

                                <input
                                    type="text"
                                    defaultValue={userData.ceo}

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
                                    defaultValue={userData.strutturasocietaria}

                                    placeholder="Struttura societaria..."
                                />

                                <input
                                    type="text"
                                    id="certificazioni"
                                    name="certificazioni"
                                    defaultValue={userData.certificazioni}

                                    onChange={handleChange}
                                    required
                                    placeholder="Certificazioni..."
                                />

                                <input
                                    type="text"
                                    id="premi"
                                    name="premi"
                                    onChange={handleChange}
                                    defaultValue={userData.premi}

                                    required
                                    placeholder="Premi..."
                                />

                                <input
                                    type="text"
                                    id="luogonascita"
                                    name="luogonascita"
                                    onChange={handleChange}
                                    defaultValue={userData.luogonascita}

                                    required
                                    placeholder="Luogo di nascita..."
                                />

                                <input
                                    type="text"
                                    id="sedelegale"
                                    name="sedelegale"
                                    defaultValue={userData.sedelegale}

                                    onChange={handleChange}
                                    required
                                    placeholder="Sede legale..."
                                />

                                <input
                                    type="text"
                                    id="sedioperative"
                                    name="sedioperative"
                                    onChange={handleChange}
                                    defaultValue={userData.sedioperative}

                                    required
                                    placeholder="Sedi operative..."
                                />

                                <input
                                    type="text"
                                    id="telefono"
                                    name="telefono"
                                    onChange={handleChange}
                                    required
                                    defaultValue={userData.telefono}

                                    placeholder="Telefono..."
                                />

                                <input
                                    type="text"
                                    id="sitoweb"
                                    name="sitoweb"
                                    defaultValue={userData.sitoweb}

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
                    
                        <button onClick={updateData} className="pulsanteRegistrati" >Update details</button>
                </div>
            </div>
        </div>
            

                        

                
                
                
            


    )



}

export default UpdateUser