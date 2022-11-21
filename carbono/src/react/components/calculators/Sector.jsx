import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/calculators.css";
import $ from "jquery";
import { Resultado } from "./Resultado.jsx";

export const Sector = () => {

    
    const [usuario, setUser] = useState({});
    const [organizaciones, setOrganizaciones] = useState({});
    const [sector, setSectores] = useState([]);
    const [calculo, setCalculo] = useState({});
    const [valor, setValor] = useState({});

    useEffect(() => {
        const isUserLogg = window.localStorage.getItem("UserLoggedInfo");
        if (isUserLogg) {
            let user = JSON.parse(isUserLogg);
            setUser(user);
            axios
                .post("https://carbonoapplication.herokuapp.com/organizacionName",
                    JSON.stringify(user)
                )
                .then(({ data }) => {
                    console.log("Organizacion traida correctamente:", data);
                    //Mandenme las organizacion como "name"
                    setOrganizaciones(data);
                    setCalculo({
                        ...calculo,
                        rol: user.rol,
                        userId: user.id,
                        calculoSolicitado: "SECTOR",
                        OrganizacionId: data.id,
                    });

                    //TRAER LOS SECTORES POR ID DE ORG una vez que la ruta responda bien con la org:
                    axios
                        .post("https://carbonoapplication.herokuapp.com/sectores",
                            JSON.stringify({ id: data.id })
                        )
                        .then(({ data }) => {
                            console.log("sectores traidos de la base: ", data);
                            data.unshift({ id: "", nombre: "Seleccionar" });
                            setSectores(data);
                        })
                        .catch((error) => {
                            console.log("Error al traer los sectores", error);
                        });

                    //
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

    const SelectorSectores = (e) => {
        e.preventDefault();
        let idSector = e.target.value;
        if (!idSector) return;
        setCalculo({ ...calculo, SectorId: idSector });
    };

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
                    {/* CALCULADOR DE ORGANIZACION, ROL ORG */}
                    <h1>impacto de la huella de carbono</h1>
                    <div className="calculator-container">
                        <div className="calculator-title-containter">
                            <h2>Calculo sobre un sector</h2>

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

                                <div class="grid-item">
                                    <label for="">Sector</label>
                                    {/*   <input
                                type="text"
                                name=""
                                value=""
                                class="text-input"
                            /> */}
                                    <select
                                        id="ElegirSector"
                                        name="sect"
                                        class="text-input"
                                        onChange={SelectorSectores}
                                    >
                                        {sector.length ? (
                                            sector.map((item, i) => {
                                                return (
                                                    <option
                                                        key={i}
                                                        value={item.idSector}
                                                    >
                                                        {item.nombre}
                                                    </option>
                                                );
                                            })
                                        ) : (
                                            <option>Aun no hay Sectores</option>
                                        )}
                                    </select>
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
