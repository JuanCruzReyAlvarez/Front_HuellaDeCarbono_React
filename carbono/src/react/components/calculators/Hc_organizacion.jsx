import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/calculators.css";
import $ from "jquery";
import { Resultado } from "./Resultado.jsx";
import { useLocation } from "react-router-dom";

export const Hc_organizacion = () => {
    const { pathname } = useLocation();
    const [usuario, setUser] = useState({});
    const [organizaciones, setOrganizaciones] = useState({});
    const [calculo, setCalculo] = useState({});
    const [valor, setValor] = useState({});

    const puerto = "8080";
    const full = location.protocol + '//' + location.hostname + ":" + puerto;

    useEffect(() => {
        const isUserLogg = window.localStorage.getItem("UserLoggedInfo");
        if (isUserLogg) {
            let user = JSON.parse(isUserLogg);
            console.log("User log id", user.id);
            setUser(user);
            console.log("Usuarioquemandoaback", usuario);
            axios
                .post( full +"/organizacionName",
                    JSON.stringify(user)                  // PUSE .ID
                )
                .then(({ data }) => {
                    console.log("Organizacion traida correctamente:", data);
                    //Mandenme las organizacion como "name" y id
                    setOrganizaciones(data);
                    setCalculo({
                        ...calculo,
                        calculoSolicitado: "ORGANIZACION",
                        userId: user.id,
                        OrganizacionId: data.id,
                    });
                })
                .catch((error) => {
                    console.log("Error al traer a la organizacion", error);
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
            .post("http://localhost:8080/calculators", JSON.stringify(calculo))
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
                    {/* CALCULADOR DE ORGANIZACION, ROL ORG */}
                    <h1>impacto de la huella de carbono</h1>
                    <div className="calculator-container">
                        <div className="calculator-title-containter">
                            <h2>Calculador de HC para la organizacion</h2>

                            <div id="botonsito" onClick={onSubmit}>
                                <p class="pop-up-button">Calcular</p>
                            </div>
                        </div>
                    </div>
                    
                    <div id="formularito">
                        <form
                            class="formulario"
                            action="index.html"
                            method="post"
                        >
                            <div id="calculitoOrgItems1">
                                <div class="grid-item">
                                    <label for="">Organizacion</label>
                                    <input
                                        type="text"
                                        name=""
                                        value={organizaciones.name}
                                        class="text-input"
                                    />
                                </div>
                            </div>
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
