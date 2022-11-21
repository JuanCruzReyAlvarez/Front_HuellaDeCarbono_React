import React from 'react'
import "../styles/RegisterSector.css";
import { useEffect, useState } from "react";


import axios from "axios";

export const RegisterSector = () => {
    const [usuario, setUser] = useState({});
    const [eleccion, setEleccion] = useState({});
    const [sector, setSector] = useState("");
    
    useEffect(() => {
        const isUserLogg = window.localStorage.getItem("UserLoggedInfo");
        if (isUserLogg) {
            let user = JSON.parse(isUserLogg)
            setUser(user);
            setEleccion({
                rol: user.rol,
                userId: user.id
            })
        }
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        axios
            .post("https://carbonoapplication.herokuapp.com/addSector", JSON.stringify(eleccion))
            .then(({ data }) => {
                console.log("funciono ADDsector", data);
                if (document.getElementById("textBox").value) document.getElementById("textBox").value = ""
                setSector("")
            })
            .catch((error) => {
                console.log("No funciono! ADDsector", error);
                console.log(error);
            });
    }

    const handleChange = ({ target }) => {
        setEleccion((eleccion) => {
            return {
                ...eleccion,
                [target.name]: target.value,
            };
        });
    };


    return (
        <div class="Formu">
            <div className="FormuPrinc">
                <form onSubmit={onSubmit}>
                    <h1 class="PrimTit"> Agregar Sector</h1>
                    <h3>Agrega nuevos sectores a tu organizacion.</h3>
                    <br></br>
                    <div class="cuatro">
                        <div class="sector">
                        <br></br>
                            <br></br>
                           
                            <h1>Introduce el nombre</h1>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <input type="text" name="sector" placeholder="Agregar sector..." id="textBox" onChange={handleChange} />
                            <input type="submit" value="Agregar" id="SectorAg" />
                        </div>
                        {/* <section id="main">
                            <h2>Sectores:</h2>
                            <ul id="list">
                            </ul>
                        </section> */}
                    </div>
                    {/* <div class="cinco">
                        <input type="submit" value="Agregar organización" />
                    </div> */}
                </form >

            </div>
        </div >
    )
}