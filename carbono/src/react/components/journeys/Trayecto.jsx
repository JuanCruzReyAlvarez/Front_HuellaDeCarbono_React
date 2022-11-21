import React from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../styles/Journeys.css";

//Componentes Type de trasporte
import { No_Motorizado } from "./tipo_transporte/No_Motorizado.jsx";
import { Servicio_Contratado } from "./tipo_transporte/Servicio_Contratado.jsx";
import { Transporte_Publico } from "./tipo_transporte/Transporte_Publico.jsx";
import { Vehiculo_Particular } from "./tipo_transporte/Vehiculo_Particular.jsx";

export const Trayecto = () => {
    const [usuario, setUser] = useState({});

    const [cantidadTramos, setCantidadTramos] = useState();
    const [cantidadEleccion, setCantidadEleccion] = useState();
    const [contador, setContador] = useState();

    const [eleccion, setEleccion] = useState({});
    // const [listadoDeAcompañantes, setListadoDeAcompañantes] = useState([]);

    const [listaDeElecciones, setListaDeElecciones] = useState([]);
    const [organizaciones, setOrganizaciones] = useState([]);
    const [provincias, setProvincias] = useState([]);
    const [municipios, setMunicipios] = useState([]);
    const [localidades, setLocalidades] = useState([]);
    const [type, setType] = useState("");

    useEffect(() => {
        const isUserLogg = window.localStorage.getItem("UserLoggedInfo");
        if (isUserLogg) {
            let user = JSON.parse(isUserLogg);
            setUser(user);
            setEleccion({
                rol: user.rol,
                userId: user.id,
            });

            axios
                .get("https://carbonoapplication.herokuapp.com/provinciasss", JSON.stringify(user))
                .then(({ data }) => {
                    console.log("funcionaron las provincias ", data);
                    data.unshift({ id: "", name: "Seleccionar" });
                    setProvincias(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, []);

    const setAcompañantesTotales = (data) => {
        console.log("DATA DE ACOMPAÑANTES", data);
        setEleccion({ ...eleccion, acompaniante: data });
    };

    const handleChange = ({ target }) => {
        // console.log(target.value);
        // console.log(target.name);
        setEleccion((eleccion) => {
            return {
                ...eleccion,
                [target.name]: target.value,
            };
        });
    };

    const selectDocumento = (e) => {
        e.preventDefault();
        let documento = e.target.value;
        if (!documento) return;
        setEleccion({ ...eleccion, [e.target.name]: documento });
    };

    const selectVehiculo = (e) => {
        console.log(e.target.value);
        console.log(e.target.name);
        e.preventDefault();
        if (!e.target.value) return;
        setEleccion({ ...eleccion, [e.target.name]: e.target.value });
    };

    const SelectorProvincia = (e) => {
        e.preventDefault();
        let prov = e.target.name;
        let provinciaID = e.target.value;
        // if (!provinciaID) return;
        setLocalidades([]);
        setEleccion({ ...eleccion, [prov]: provinciaID });
        axios
            .post("https://carbonoapplication.herokuapp.com/municipio",
                JSON.stringify({ id: provinciaID })
            )
            .then(({ data }) => {
                console.log("Municipios traidos de la base: ", data);
                data.unshift({ id: "", name: "Seleccionar" });
                setMunicipios(data);
            })
            .catch((error) => {
                console.log("Error al traer a los municipios", error);
            });
    };

    const SelectorMunicipio = (e) => {
        e.preventDefault();
        let idMunicipio = e.target.value;
        let municipio = e.target.name;
        if (!idMunicipio) return;
        setEleccion({ ...eleccion, [municipio]: idMunicipio });
        axios
            .post("https://carbonoapplication.herokuapp.com/localidad",
                JSON.stringify({ id: idMunicipio })
            )
            .then(({ data }) => {
                console.log("Localidades traidas de la base: ", data);
                data.unshift({ id: "", name: "Seleccionar" });
                setLocalidades(data);
            })
            .catch((error) => {
                console.log("Error al traer a las localidades", error);
            });
    };

    const SelectorLocalidad = (e) => {
        e.preventDefault();
        let idlocalidad = e.target.value;
        let localidad = e.target.name;
        if (!idlocalidad) return;
        setEleccion({ ...eleccion, [localidad]: idlocalidad });
    };

    const isChecked = (e) => {
        let ischeck = e.target.checked;
        if (ischeck) setEleccion({ ...eleccion, flagSolicitud: "1" });
        else setEleccion({ ...eleccion, flagSolicitud: "0" });
    };

    const selectType = (e) => {
        e.preventDefault();
        if (e.target.value === "") {
            setType("");
            return;
        }
        setEleccion({ ...eleccion, ["tipo_Medio_De_Transporte"]: e.target.value });
        setType(e.target.value);
    };

    const onSubmitTramos = (e) => {
        e.preventDefault();
        setListaDeElecciones([...listaDeElecciones, eleccion]);
        setEleccion({});
        setContador(contador - 1);

        //Limpiar TODOS los inputs aca despues
        clearInputs();
    };

    const clearInputs = () => {
        if (document.getElementById("clearInput1"))
            document.getElementById("clearInput1").value = "";
        if (document.getElementById("clearInput2"))
            document.getElementById("clearInput2").value = "";

        if (document.getElementById("clearInput3"))
            document.getElementById("clearInput3").value = "";
        if (document.getElementById("clearInput4"))
            document.getElementById("clearInput4").value = "";

        //selects
        if (
            document.getElementById("ElegirProvincia1") &&
            document.getElementById("ElegirProvincia")
        ) {
            document.getElementById("ElegirProvincia1").value = "";
            document.getElementById("ElegirProvincia1").name = "Seleccionar";
            document.getElementById("ElegirProvincia").value = "";
            document.getElementById("ElegirProvincia").name = "Seleccionar";
            setMunicipios([]);
            setLocalidades([]);
        }

        //Medio de transporte
        if (document.getElementById("transportes")) {
            document.getElementById("transportes").value = "";
            document.getElementById("transportes").name = "Seleccionar";
            setType("");
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (cantidadEleccion !== 1) {
            listaDeElecciones.push(eleccion);
        }
        console.log("Trayecto a mandar:", listaDeElecciones);
        axios
            .post("https://carbonoapplication.herokuapp.com/trayecto",
                JSON.stringify(listaDeElecciones)
            )
            .then(({ data }) => {
                console.log(
                    "Trayecto realizado correctamente, valor obtenido:",
                    data
                );
                //Este estado setea denuevo el contador de tramos a 0 una vez que se haya completado TODO para poder hacer denuevo un trayecto
                setCantidadTramos();
            })
            .catch((error) => {
                console.log("Error al cargar el trayecto", error);
            });
    };

    const cantidadEleccionActual = (e) => {
        e.preventDefault();
        setCantidadEleccion(e.target.value);
    };

    const selectCantidad = (e) => {
        e.preventDefault();
        setCantidadTramos(cantidadEleccion);
        setContador(cantidadEleccion);
    };

    return (
        <div class="bodyJour">
            <div>
                <div class="outer">
                    <div class="card">
                        <div class="timeline">
                            {cantidadTramos ? (
                                <div class="info">
                                    <h3 class="title">TRAMO</h3>
                                    <>
                                        <hr />
                                        <h1>REGISTRA TU TRAMO</h1>
                                        <hr />
                                        <form
                                            class="form"
                                            action="form.php"
                                            method="post"
                                            enctype="multipart/form-data"
                                            autocomplete="off"
                                        >
                                            <div class="alert alert-error"></div>
                                            <h2>UBICACION INCIAL</h2>
                                            <input
                                                type="text"
                                                placeholder="Calle"
                                                name="calleInicial"
                                                onChange={handleChange}
                                                required
                                                id="clearInput1"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Altura"
                                                name="alturaInicial"
                                                onChange={handleChange}
                                                required
                                                id="clearInput2"
                                            />

                                            <select
                                                id="ElegirProvincia1"
                                                name="provinciaInicial"
                                                onChange={SelectorProvincia}
                                            >
                                                {provincias.length ? (
                                                    provincias.map(
                                                        (item, i) => {
                                                            return (
                                                                <option
                                                                    key={i}
                                                                    value={
                                                                        item.id
                                                                    }
                                                                >
                                                                    {item.name}
                                                                </option>
                                                            );
                                                        }
                                                    )
                                                ) : (
                                                    <option>
                                                        Seleccionar Provincia
                                                    </option>
                                                )}
                                            </select>

                                            <select
                                                id="ElegirMunicipio"
                                                name="municipioInicial"
                                                onChange={SelectorMunicipio}
                                            >
                                                {municipios.length ? (
                                                    municipios.map(
                                                        (item, i) => {
                                                            return (
                                                                <option
                                                                    key={i}
                                                                    value={
                                                                        item.id
                                                                    }
                                                                >
                                                                    {item.name}
                                                                </option>
                                                            );
                                                        }
                                                    )
                                                ) : (
                                                    <option>
                                                        Seleccionar Municipio
                                                    </option>
                                                )}
                                            </select>

                                            <select
                                                id="ElegirLocalidad"
                                                name="localidadInicial"
                                                onChange={SelectorLocalidad}
                                            >
                                                {localidades.length ? (
                                                    localidades.map(
                                                        (item, i) => {
                                                            return (
                                                                <option
                                                                    key={i}
                                                                    value={
                                                                        item.id
                                                                    }
                                                                >
                                                                    {item.name}
                                                                </option>
                                                            );
                                                        }
                                                    )
                                                ) : (
                                                    <option>
                                                        Seleccionar Localidad
                                                    </option>
                                                )}
                                            </select>
                                            <h2>UBICACION FINAL</h2>
                                            <input
                                                type="text"
                                                placeholder="calle"
                                                name="calleFinal"
                                                id="clearInput3"
                                                onChange={handleChange}
                                                required
                                            />
                                            <input
                                                type="text"
                                                placeholder="altura"
                                                name="alturaFinal"
                                                id="clearInput4"
                                                onChange={handleChange}
                                                required
                                            />

                                            <select
                                                id="ElegirProvincia"
                                                name="provinciaFinal"
                                                onChange={SelectorProvincia}
                                            >
                                                {provincias.length ? (
                                                    provincias.map(
                                                        (item, i) => {
                                                            // if (i === 0) {
                                                            //     return (
                                                            //         <option key={i} >select</option>
                                                            //     )
                                                            // }

                                                            return (
                                                                <option
                                                                    key={i}
                                                                    value={
                                                                        item.id
                                                                    }
                                                                >
                                                                    {item.name}
                                                                </option>
                                                            );
                                                        }
                                                    )
                                                ) : (
                                                    <option>
                                                        Aun no hay Provincias
                                                    </option>
                                                )}
                                            </select>

                                            <select
                                                id="ElegirMunicipio"
                                                name="municipioFinal"
                                                onChange={SelectorMunicipio}
                                            >
                                                {municipios.length ? (
                                                    municipios.map(
                                                        (item, i) => {
                                                            return (
                                                                <option
                                                                    key={i}
                                                                    value={
                                                                        item.id
                                                                    }
                                                                >
                                                                    {item.name}
                                                                </option>
                                                            );
                                                        }
                                                    )
                                                ) : (
                                                    <option>
                                                        Aun no hay Municipios
                                                    </option>
                                                )}
                                            </select>

                                            <select
                                                id="ElegirLocalidad"
                                                name="localidadFinal"
                                                onChange={SelectorLocalidad}
                                            >
                                                {localidades.length ? (
                                                    localidades.map(
                                                        (item, i) => {
                                                            return (
                                                                <option
                                                                    key={i}
                                                                    value={
                                                                        item.id
                                                                    }
                                                                >
                                                                    {item.name}
                                                                </option>
                                                            );
                                                        }
                                                    )
                                                ) : (
                                                    <option>
                                                        Aun no hay Localidades
                                                    </option>
                                                )}
                                            </select>

                                            <h2>MEDIO DE TRANSPORTE</h2>

                                            <select
                                                name="Tipo_Medio_De_Transporte"
                                                id="transportes"
                                                onChange={selectType}
                                            >
                                                <option value="">
                                                    Seleccionar
                                                </option>
                                                <option value="No_Motorizado">
                                                    Medio no Motorizado
                                                </option>
                                                <option value="Servicio_Contratado">
                                                    Servicio Contratado
                                                </option>
                                                <option value="Transporte_Publico">
                                                    Transporte Publico
                                                </option>
                                                <option value="Vehiculo_Particular">
                                                    Vehiculo Particular
                                                </option>
                                            </select>
                                            {type !== "" || type !== "Seleccionar" ? (
                                                type === "No_Motorizado" ? (
                                                    <>
                                                        <No_Motorizado
                                                            handleChange={
                                                                handleChange
                                                            }
                                                        />
                                                    </>
                                                ) : type ===
                                                    "Servicio_Contratado" ? (
                                                    <>
                                                        <Servicio_Contratado
                                                            selectDocumento={
                                                                selectDocumento
                                                            }
                                                            selectVehiculo={
                                                                selectVehiculo
                                                            }
                                                            setAcompañantesTotales={
                                                                setAcompañantesTotales
                                                            }
                                                            handleChange={
                                                                handleChange
                                                            }
                                                        />
                                                    </>
                                                ) : type ===
                                                    "Transporte_Publico" ? (
                                                    <>
                                                        <Transporte_Publico
                                                            handleChange={
                                                                handleChange
                                                            }
                                                            selectVehiculo={
                                                                selectVehiculo
                                                            }
                                                        />
                                                    </>
                                                ) : type ===
                                                    "Vehiculo_Particular" ? (
                                                    <>
                                                        <Vehiculo_Particular
                                                            selectDocumento={
                                                                selectDocumento
                                                            }
                                                            selectVehiculo={
                                                                selectVehiculo
                                                            }
                                                            setAcompañantesTotales={
                                                                setAcompañantesTotales
                                                            }
                                                        />
                                                    </>
                                                ) : (
                                                    <></>
                                                )
                                            ) : (
                                                <></>
                                            )}
                                            <br />
                                            <br />
                                            <br />
                                            <br />

                                            {contador > 1 ? (
                                                <>
                                                    <input
                                                        type="submit"
                                                        value="SIGUIENTE"
                                                        name="Siguiente_Tramo"
                                                        class="btn btn-block btn-primary"
                                                        onClick={onSubmitTramos}
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <input
                                                        type="submit"
                                                        value="COMPLETAR TRAYECTO"
                                                        name="CompletarTrayecto"
                                                        //class=" botonCompletarTrayecto btn-block btn-primarytrayect"
                                                        class="btn-botonCompletarTrayecto btn-block btn-trayectoprimario"
                                                        onClick={onSubmit}
                                                    />

                                                    <label className="salvadora">
                                                        <input
                                                            type="checkbox"
                                                            id="cbox1"
                                                            value="first_checkbox"
                                                            onChange={isChecked}
                                                        />
                                                        Agregar mis tramos
                                                        compartidos
                                                    </label>
                                                </>
                                            )}

                                            <br />
                                            <br />
                                            <br />
                                            <br />
                                            <br />

                                            <br />

                                            <br />
                                        </form>
                                    </>
                                    <p>
                                        Es importante completar los datos con
                                        coherencia para que tu organizacion
                                        pueda ver el impacto que causa en el
                                        mundo con su huella de carbono. Ayudemos
                                        entre todos a mejorar el impacto que
                                        causamos globalmente. Haciendo cosas
                                        pequeñas puedes cambiar el mundo.
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <h1>¿Cuantos Tramos Tenes?</h1>
                                    <input
                                        type="number"
                                        placeholder="Cantidad de Tramos"
                                        name="cantidadTramos"
                                        onChange={cantidadEleccionActual}
                                        required
                                    />
                                    <div id="CancelarAgregarAcompañante">
                                        <input
                                            type="button"
                                            value="Guardar"
                                            name="tramos"
                                            class="btn btn-primaryacomp"
                                            onClick={selectCantidad}
                                        />
                                        <br />
                                        <br />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
