import React from "react";
import "../styles/Request.css";
import _ from 'lodash';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";


export const Request = () => {
    const [usuario, setUser] = useState({});
    const [request, setRequest] = useState([]);
    const [estadoDeSolicitudActual, setSolicitudActual] = useState("")
    const navigate = useNavigate();
    const puerto = "8080";
    const full = location.protocol + '//' + location.hostname + ":" + puerto;

    useEffect(() => {
        const isUserLogg = window.localStorage.getItem("UserLoggedInfo");
        if (isUserLogg) {
            setUser(JSON.parse(isUserLogg));
            axios.get(full +"/request", JSON.stringify(usuario)).then(({ data }) => {
                console.log("Solicitudes traidas correctamente:", data)
                let newData = data.filter((solicitud)=>{
                        return solicitud.Estado === "PENDIENTE"
                })
                console.log("Arreglo de Solicitudes filtrados por PENDIENTES:", newData)
                setRequest(newData);
            }).catch(error => {
                console.log("Error al traer las solicitudes:", error)
            })
        }
    }, [estadoDeSolicitudActual]);



/*
id solicitud
nombre chabon
appelido chabon
id chabon (id_miembro)---------------
nombre sector 
id_sector-------------
*/
// id usuario logeado----------

const aceptarSolicitud = () => {
       
    axios.post(full +"/request", JSON.stringify({
        estado : "ACEPTADO"
    })).then((data) => {
        console.log("Se acepto la solicitud correctamente", data)
    }).catch(error => {
    console.log(error)
    })
}


const rechazarSolicitud = () => {
    
    axios.post(full +"/request", JSON.stringify({
        estado : "RECHAZADO"
    })).then((data) => {
        console.log("Se rechazo la solicitud correctamente", data)
    }).catch(error => {
    console.log(error)
    })
}
    return (

        <div className="body-contentreq">
            <div className="titlesitos">
                <h1 class='elegantshadow'>No son los individuos</h1>
                <h1 class='insetshadow'> los que hacen las empresas exitosas, </h1>
                <h1 class='elegantshadow'>sino  </h1>
                <h1 class='insetshadow'>los grandes equipos</h1>
                <h1 class='monserrat'>SOLICITUDES</h1>
            </div>

            <h2 class="titReq">Elegir Organizacion</h2>

            <div class="snip1265">

                {
                    request.length ? (
                        request.map((solicitud) => {
                            return (
                                
                                <div className="plan">
                                    <header><i className="ion-ios-people"></i>
                                        <h4 className="plan-title">{solicitud.nombre} {solicitud.apellido}</h4>
                                        <div className="plan-cost"><span className="plan-price">Developer </span><span className="plan-type"> - utn</span></div>
                                    </header>
                                    <ul className="plan-features">
                                        <li>{solicitud.sector}</li>
                                    </ul>
                                    <div className="plan-select-main">
                                        <div className="plan-select"><a onClick={(e) => {
                                            e.preventDefault()
                                            console.log("FUNCION RECHAZAR")
                                             axios.post(full +"/modrequest", JSON.stringify({
                                                estado: "RECHAZAR",
                                                //id del user card
                                                idSolicitud: solicitud.idReq
                                            })).then((data) => {
                                                console.log("Se rechazo la solicitud correctamente", data)
                                                setSolicitudActual({
                                                    tipo: "Rechazada",
                                                    id: solicitud.id_miembro,
                                                })
                                            }).catch(error => {
                                                console.log(error)
                                            })
                                        }} href="">Rechazar Solicitud</a></div>

                                        <div className="plan-select"><a onClick={(e) => {
                                             e.preventDefault(e)
                                             console.log("FUNCION ACEPTAR")
                                            axios.post(full +"/modrequest", JSON.stringify({
                                                estado: "ACEPTAR",
                                                //id del user card
                                                idSolicitud: solicitud.idReq
                                            })).then((data) => {
                                                console.log("Se acepto la solicitud correctamente", data)
                                                setSolicitudActual({
                                                    tipo: "Aceptada",
                                                    id: solicitud.id_miembro,
                                                })
                                            }).catch(error => {
                                                console.log(error)
                                            })
                                        }} href="">Aceptar Solicitud</a></div>
                                    </div>
                                </div>
                            )
                        })
                    ) : console.log("Todavia no hay solicitudes")
                }

            </div>
        </div>

        


        

    )
};