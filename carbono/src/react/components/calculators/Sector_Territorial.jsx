
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/calculators.css";
import $ from "jquery";
import { Resultado } from "./Resultado.jsx";

export const Sector_Territorial = () => {

    const [usuario, setUser] = useState({});
    const [organizaciones, setOrganizaciones] = useState([]);
    const [calculo, setCalculo] = useState({});
    const [valor, setValor] = useState({});

    useEffect(() => {
        const isUserLogg = window.localStorage.getItem("UserLoggedInfo");
        if (isUserLogg) {
            let user = JSON.parse(isUserLogg);
            setUser(JSON.parse(isUserLogg));
            setCalculo({
                userId: user.id,
                calculoSolicitado: "AGENTE_SECTORIAL",
            });
        }
    }, []);

    $(document).ready(function() {
        $("#cartelito").hide();
        $("#botonsito").click(function() {
            $("#formularito").hide();
            $("#botonsito").hide();
            $("#cartelito").show();
        });

        $("#crucecita").click(function() {
            $("#cartelito").hide();
            $("#formularito").show();
            $("#botonsito").show();
        });
    });

    const selectFecha = (e) => {
        if (e.target.value === "") return;
        console.log("fecha seleccionada:", e.target.value);
        setCalculo({ ...calculo, InicioPeriodo: e.target.value });
    };

    const selectForma = (e) => {
        if (e.target.value === "") return;
        console.log("Forma seleccionada: ", e.target.value);
        setCalculo({ ...calculo, FormaCalculo: e.target.value });
    };

    const onSubmit = (e) => {
        console.log("CALCULO A MANDAR:", calculo);
        axios
            .post("https://carbonoapplication.herokuapp.com/calculators", JSON.stringify(calculo))
            .then(({ data }) => {
                console.log(
                    "Calculo realizado correctamente, valor obtenido:",
                    data
                );
                //Chequear como me mandan el numero y la unidad desde el back.(ACA ESTA Hardcodeado el valor)
                setValor({
                    numero: data.valor,
                    unidad: data.unidad,
                });
            })
            .catch((error) => {
                console.log("Error al tratar de hacer el calculo", error);
            });
    };

    return (
        <div className="main-container">
            {valor.numero && valor.unidad ? (
                <>
                    <Resultado valor={valor} setValor={setValor} />
                </>
            ) : (
                <>
                    {" "}
                    {/* CALCULADOR DE ORGANIZACION, ROL ORG */}
                    <h1>impacto de la huella de carbono</h1>
                    <div className="calculator-container">
                        <div className="calculator-title-containter">
                            <h2>Calculo segun sector territorial</h2>

                            <div id="botonsito">
                                <p class="pop-up-button" onClick={onSubmit}>Calcular</p>
                            </div>
                        </div>
                    </div>
                    <div id="formularito">
                        <form
                            class="formulario"
                            action="index.html"
                            method="post"
                        >
                            <div id="calculitoItems2">
                                <div class="grid-item">
                                    <label for="">Inicio del periodo</label>
                                    <input
                                        type="date"
                                        placeholder="formato : DD/MM/AAAA"
                                        name=""
                                        class="text-input"
                                        onChange={selectFecha}
                                    />
                                </div>

                                <div class="grid-item">
                                    <label for="">Forma de calculo</label>
                                    <select
                                        className="text-input"
                                        onChange={selectForma}
                                    >
                                        <option value="">Seleccionar</option>
                                        <option value="MENSUAL">Mensual</option>
                                        <option value="ANUAL">Anual</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
};

