import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/Report.css";
import { BarChart } from "./chart/BarChart"
import { LineChart } from "./chart/LineChart"
import { Line } from "react-chartjs-2";

export const Report = () => {


    const [report, setReportes] = useState("");
    const [eleccion, setEleccion] = useState({});


    // $(function () {
    //     $('#buttonSectorTerritorial').click(function () {
    //         $('#sectorTerritorial').toggle();
    //     });
    // })

    // $(document).ready(function () {
    //     $("#btn").click(function () {
    //         $("#Create").toggle();
    //     });
    // });
    /*
        $(document).ready(function () {
    
            $("#espera").hide();
            $("#sectorTerritorial").hide();
            $("#provomuni").hide();
            $("#elmun").hide();
            $("#elsec").hide();
    
            $("#org").click(function () {
                $("#sectorTerritorial").hide();
                $("#provomuni").hide();
                $("#espera").show();
            });
    
            $("#sect").click(function () {
                $("#espera").hide();
                $("#sectorTerritorial").show();
                $("#provomuni").show();
    
            });
    
            $("#mun").click(function () {
                $("#elsec").hide();
                $("#elmun").show();
            });
    
            $("#prov").click(function () {
                $("#elmun").hide();
                $("#elsec").show();
            });
    
        });
    */

    useEffect(() => {
        const isUserLogg = window.localStorage.getItem("UserLoggedInfo");
        if (isUserLogg) {
            let user = JSON.parse(isUserLogg)

            if (user.rol === "AGENTE_SECTORIAL" && window.localStorage.getItem("tipoAgente")) {
                let { tipoAgente } = JSON.parse(window.localStorage.getItem("tipoAgente"))
                let newAgente;
                let territorioId;
                if (tipoAgente === "P") {
                    newAgente = "PROVINCIAL"
                    let { provinciaId } = JSON.parse(window.localStorage.getItem("provinciaId"))
                    territorioId = provinciaId;
                } else {
                    newAgente = "MUNICIPAL"
                    let { municipioId } = JSON.parse(window.localStorage.getItem("municipioId"))
                    territorioId = municipioId
                }


                setEleccion({
                    rol: user.rol,
                    userId: user.id,
                    tipoAgente: newAgente,
                    territorioId: territorioId
                })

            } else {
                setEleccion({
                    rol: user.rol,
                    userId: user.id
                })
            }
        }


    }, []);

    const selectType = ({ target, }) => {
        setEleccion({ ...eleccion, [target.name]: target.value });
    }


    const submitCalculo = (e) => {
        e.preventDefault()
        axios.post( full + "/getReport", JSON.stringify(eleccion)).then(({ data }) => {
            let reportes = data.reporte
            console.log("funcionaron los reportes ", reportes)
            setReportes({
                labels: reportes.map((data) => data.fecha),
                datasets: [{
                    label: "Huella De Carbono",
                    data: reportes.map((data) => data.valor),
                    backgroundColor: '#000000',
                    borderColor: "red",
                    scaleFontColor: "#FFFFFF",
                }]

            })
        }).catch(error => {
            console.log("Error con los reportes", error)
        })

    }



    return (
        <div>

            {

                report ? (<>
                    {/* <div class="body-content-hall"></div> */}
                    <div class="body-content-hall"></div>
                    <div class="module">

                        {/* ------------Rol organizacion------------- */}

                        <h1 className="tituloReportes">REPORTES</h1>

                        <form
                            class="form"
                            action="form.php"
                            method="post"
                            enctype="multipart/form-data"
                            autocomplete="off"
                        >
                            <div class="alert alert-error"></div>

                            <div class="chartss">
                                <BarChart chartData={report} />
                            </div>


                            <div class="chartss">
                                <LineChart lineChart={report} />
                            </div>

                            {/* <div id="espera">
                                <button onClick={submitCalculo}>Calcular</button>

                            </div> */}

                        </form>

                    </div>


                </>) : (<>

                    {/* <link
                href="//db.onlinewebfonts.com/c/a4e256ed67403c6ad5d43937ed48a77b?family=Core+Sans+N+W01+35+Light"
                rel="stylesheet"
                type="text/css"
            />
            <link rel="stylesheet" href="form.css" type="text/css" /> */}

                    <div class="body-content-hall"></div>

                    <div class="module">

                        {/* ------------Rol organizacion------------- */}
                        <h1>PERSONALIZA TU REPORTE</h1>
                        <h3>Indica sus Caracteristicas</h3>
                        <form
                            class="form"
                            action="form.php"
                            method="post"
                            enctype="multipart/form-data"
                            autocomplete="off"
                        >
                            <div class="alert alert-error"></div>

                            <label for="start">Periodicidad:</label>
                            <select id="Periodicidad" name="periodicidad" onChange={selectType}>
                                <option value="">Seleccionar</option>
                                <option value="anual">Anual</option>
                                <option value="mensual">Mensual</option>
                            </select>

                            <label for="start">Fecha Inicio:</label>
                            <div class="clasefechita">
                                <input type="date" id="start" name="trip-start"

                                    min="2022-01-01" max="2030-12-31"></input>
                            </div>
                            <label for="finish">Fecha Final:</label>
                            <div class="clasefechita">
                                <input type="date" id="start" name="trip-start"

                                    min="2022-01-01" max="2030-12-31"></input>
                            </div>
                            {/* 
        <label for="typeReport">Tipo de Reporte:</label>
        <select id="Tipo" name="Tipo">
            <option>Evolucion Individual</option>
            <option>Composicion Grupal</option>
        </select> */}

                            {/* <label for="sector">Sector:</label> */}

                            {/* <div class="row">

            <div class="app-button">
                <button id="org" class="palabrita">Organizacion</button>
            </div>
            <div class="app-button">
                <button id="sect" class="palabrita">Sector Territorial</button>
            </div>
        </div> */}

                            <div class="module">


                                {/* <label for="sector" id="sectorTerritorial">Elija un tipo de Sector Territorial:</label> */}

                                <div class="row" id="provomuni">
                                    {/* 
                <div class="app-button">
                    <button id="prov" class="palabrita">Provincial</button>
                </div>

                <div class="app-button">
                    <button id="mun" class="palabrita">Municipal</button>
                </div> */}

                                    {/* <div id="elsec">
                    <label for="start">Elije una Provincia:</label>
                    <select id="Periodicidad" name="Periodicidad">
                        <option>BLABLABA</option>
                        <option>BLABLABA</option>
                        <option>BLABLABA</option>
                        <option>BLABLABA</option>
                        <option>BLABLABA</option>
                        <option>BLABLABA</option>
                        <option>BLABLABA</option>
                    </select>
                </div>

                <div id="elmun">
                    <label for="start">Elije un Municipio:</label>
                    <select id="Periodicidad" name="Periodicidad">
                        <option>BLABLABA</option>
                        <option>BLABLABA</option>
                        <option>BLABLABA</option>
                        <option>BLABLABA</option>
                        <option>BLABLABA</option>
                        <option>BLABLABA</option>
                        <option>BLABLABA</option>
                    </select>
                </div> */}

                                </div>

                            </div>

                            <div id="espera">
                                <button onClick={submitCalculo}>Calcular</button>

                            </div>

                        </form>

                    </div>




                </>)

            }


        </div>


    );
};
