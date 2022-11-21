import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

export const Transporte_Publico = ({ handleChange, selectVehiculo }) => {

    const [lineas, setLineas] = useState([]);

    useEffect(() => {
        axios.get("https://carbonoapplication.herokuapp.com/lineas").then(({ data }) => {
            console.log("funcionaron las lineas ", data)
            data.unshift({ id: "", name: "Seleccionar" })
            setLineas(data);
        }).catch(error => {
            console.log(error)
        })
    }, []);


    return (
        <div id="LineaYTipoDeTransporte">
            <h2>TIPO DE TRANSPORTE</h2>

            <select
                id="Tipo"
                name="tipo_transporte_publico"
                onChange={selectVehiculo}
            >
                <option value="">Seleccionar</option>
                <option value="COLECTIVO">COLECTIVO</option>
                <option value="TREN">TREN</option>
                <option value="SUBTE">SUBTE</option>
            </select>

            <h2>LINEA</h2>

            <select id="ElegirLineas" name="idLinea" onChange={selectVehiculo}>
                {
                    lineas.length ? (
                        lineas.map((item, i) => {
                            return (
                                <option key={i} value={item.id}>{item.name}</option>
                            )
                        })
                    ) : <option>Aun no hay lineas</option>
                }
            </select>

            <h2>COMBUSTIBLE</h2>

            <select
                id="Tipo"
                name="tipo_combustible_Transporte_Publico"
                onChange={selectVehiculo}
            >
                <option value="">Seleccionar</option>
                <option value="GNC">GNC</option>
                <option value="DIESEL">Diesel</option>
                <option value="NAFTA">Nafta</option>
                <option value="ELECTRICIDAD">Electricidad</option>
            </select>
        </div>
    );
};
