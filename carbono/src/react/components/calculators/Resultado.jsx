import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/calculators.css";
import $ from "jquery";
export const Resultado = ( {valor, setValor} ) => {


    $(document).ready(function() {
        $("#cartelito").hide();

        $("#botonsito").hide();
        $("#cartelito").show();
    });

    return (
        <div className="main-container">
            {" "}
            {/* CALCULADOR DE ORGANIZACION, ROL ORG */}
            <h1>impacto de la huella de carbono</h1>
            <div className="calculator-container">
            </div>
           
            <div class="pop-up" id="cartelito">
                <div id="crucecita" onClick={()=> setValor({})}>
                   <span>X</span> 
                </div>
                <div class="pop-up-text">
                    <h1>RESULTADO = {valor.numero + " " + valor.unidad}</h1>
                    <p>[GRAFICOS]</p>
                </div>
            </div>
        </div>
    );
};
