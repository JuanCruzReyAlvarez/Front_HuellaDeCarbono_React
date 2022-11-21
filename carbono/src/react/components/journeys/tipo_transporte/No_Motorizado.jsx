import React from "react";

export const No_Motorizado = ({ handleChange }) => {
    return (
        <div id="TipoMedioNoMotorizado">
            <h2>MEDIO DE TRANSPORTE</h2>
            <select
                id="Tipo"
                name="tipo_de_No_Motorizado"
                onChange={handleChange}
            >
                <option value="">Seleccionar</option>
                <option value="BICICLETA">BICICLETA</option>
                <option value="MONOPATIN">MONOPATIN</option>
                <option value="PIE">PIE</option>
                <option value="OTRO">OTRO</option>
            </select>
        </div>
    );
};