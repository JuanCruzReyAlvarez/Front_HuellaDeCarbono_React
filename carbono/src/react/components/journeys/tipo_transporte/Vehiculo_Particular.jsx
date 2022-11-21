import React from "react";
import { useEffect, useState } from "react";
import { Agregar_Acompañante } from "../Agregar_Acompañante";

export const Vehiculo_Particular = ({
    handleChange,
    selectDocumento,
    selectVehiculo,
    setAcompañantesTotales,
}) => {
    const [acompañante, setAcompañante] = useState(0);

    const changeState = (e) => {
        if (acompañante === 1) return;
        e.preventDefault();
        setAcompañante(1);
    };

    return (
        <div>
            <div id="AgregarAcompañante">
                <input
                    type="button"
                    value="Agregar Acompañante"
                    name="1"
                    class="btn btn-block btn-primaryacomp"
                    onClick={changeState}
                />
                <br />
                <br />
            </div>
            {acompañante > 0 ? (
                <>
                    <Agregar_Acompañante
                        handleChange={handleChange}
                        setAcompañante={setAcompañante}
                        selectDocumento={selectDocumento}
                        setAcompañantesTotales={setAcompañantesTotales}
                    />
                </>
            ) : (
                <></>
            )}

            <div id="AdicionalServicioContratado">
                <h2>VEHICULO</h2>
                <select
                    id="Tipo"
                    name="tipo_Vehiculo_Particular"
                    onChange={selectVehiculo}
                >
                    <option value="">Seleccionar</option>
                    <option value="AUTO">AUTO</option>
                    <option value="MOTO">MOTO</option>
                    <option value="CAMIONETA">CAMIONETA</option>
                </select>
            </div>

            <h2>COMBUSTIBLE</h2>

            <select
                id="Tipo"
                name="tipo_combustible_Vehiculo_Particular"
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
