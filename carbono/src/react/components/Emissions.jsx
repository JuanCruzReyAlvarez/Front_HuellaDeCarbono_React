import React from 'react'
import { useEffect, useState } from "react";
import { Route, Routes, Link } from "react-router-dom"; // {libreia,libreria}
import "../styles/Emissions.css";
import axios from "axios";

export const Emissions = () => {

    const [usuario, setUser] = useState({});
    const [form, setForm] = useState({});
    const puerto = "8080";
    const full = location.protocol + '//' + location.hostname + ":" + puerto;
    
    useEffect(() => {
        const isUserLogg = window.localStorage.getItem("UserLoggedInfo");
        if (isUserLogg) {
            setUser(JSON.parse(isUserLogg));
        }
    }, []);

    const handleChange = ({ target }) => {
        setForm((form) => {
            return {
                ...form,
                [target.name]: target.value,
            };
        });
    };


    //JSON mandado asi:
    /* {
    "tipo_de_consumo" : "",
    "tipo_de_actividad":"",
    "valor":"",
    "unidad":"",
    } */

    const onSubmit = () => {
        axios.post(full + "/emissions", JSON.stringify(form)).then(({ data }) => {
            console.log("Form mandado correctamente ", data)
            clearInputs()
        }).catch(error => {
            clearInputs()
            console.log("Error al cargar el form", error)
        })
    }

    const onSubmitBD = () => {
        axios.post(full + "/geoInfoAdmin", JSON.stringify(form)).then(({ data }) => {
            console.log("Form mandado correctamente ", data)
        }).catch(error => {
            console.log("Error al cargar el form", error)
        })
    }

    const clearInputs = () => {
        if (document.getElementById("clearInput10"))
            document.getElementById("clearInput10").value = "";
        if (document.getElementById("clearInput11"))
            document.getElementById("clearInput11").value = "";
        if (document.getElementById("clearInput12"))
            document.getElementById("clearInput12").value = "";
        if (document.getElementById("clearInput13"))
            document.getElementById("clearInput13").value = "";
    }


    const onSubmitBDTransportes = () => {
        axios.post(full + "/geoInfoAdminTransports", JSON.stringify(form)).then(({ data }) => {
            console.log("Form mandado correctamente ", data)
        }).catch(error => {
            console.log("Error al cargar el form", error)
        })
    }



    return (
        <>

            <div class="Emission">

                <table class="table data">
                    <thead>
                        <tr>
                            <th> Tipo de consumo </th>
                            <th> Tipo de actividad </th>
                            <th> Valor </th>
                            <th> Unidad </th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="data"><input type="text" id="clearInput10" name="tipo_de_consumo" onChange={handleChange} /></td>
                            <td class="data"><input type="text" id="clearInput11" name="tipo_de_actividad" onChange={handleChange} /></td>
                            <td class="data"><input type="text" id="clearInput12" name="valor" onChange={handleChange} /></td>
                            <td class="data"><input type="text" id="clearInput13" name="unidad" onChange={handleChange} /></td>

                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="add">
                <div class="addRow">
                    <button class="custom-btn btn-1" onClick={onSubmit}>Agregar fila</button>
                </div>
            </div>

            <div class="addRow">
                <div class="factoresDeEmisionclass">
                    <th>Completar Base De Datos con Provincias, Municipios y Localidades</th>
                </div>
                <div className="botonBaseDeDatos">

                    <button class="custom-btn btn-1" onClick={onSubmitBD}>Completar Base De Datos</button>

                </div>
            </div>
            <div class="addRow">
                <div class="factoresDeEmisiontransporteclass">
                    <th>Completar Base De Datos con Medio de Transportes Universales</th>
                </div>
                <div className="botonBaseDeDatosTransporte">

                    <button class="custom-btn btn-1" onClick={onSubmitBDTransportes}>Completar Base De Datos</button>

                </div>
            </div>
        </>
    )
}
