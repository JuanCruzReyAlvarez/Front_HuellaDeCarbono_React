import React from "react";
import { useEffect, useState } from "react";

export const Agregar_Acompañante = ({
    setAcompañante,
    setAcompañantesTotales,
}) => {
    const [acompañanteNumber, setAcompañanteNumber] = useState();
    const [contadorAcompañante, setContadorAcompañante] = useState();
    const [cantidadTramos, setCantidadTramos] = useState();

    const [eleccionAcompañante, setEleccionAcompañante] = useState({});
    const [listaAcompañantes, setListaAcompañantes] = useState([]);


    const handleChange = ({ target }) => {
        // console.log(target.value);
        // console.log(target.name);
        setEleccionAcompañante((eleccionAcompañante) => {
            return {
                ...eleccionAcompañante,
                [target.name]: target.value,
            };
        });
    };

    const setNewEleccion = (e) => {
        e.preventDefault();
        setListaAcompañantes([...listaAcompañantes, eleccionAcompañante]);
        setEleccionAcompañante({});
        setContadorAcompañante(contadorAcompañante - 1);

        //Limpiar TODOS los inputs aca despues
        clearInputs()
    };

    const onSubmitFinal = (e) => {
        e.preventDefault();
        if (cantidadTramos !== 1) {
            listaAcompañantes.push(eleccionAcompañante);
        }
        console.log("ACOMPAÑANTES a mandar:", listaAcompañantes);
        setAcompañantesTotales(listaAcompañantes);
        setCantidadTramos()
        clearInputs();
    };

    // const sumandoAcompañantes = (e) => {
    //     e.preventDefault();
    //     setAcompañanteAhora(acompañantesAhora + 1);
    // };

    const cantidadEleccionActual = (e) => {
        e.preventDefault();
        setAcompañanteNumber(e.target.value);
    };

    const selectCantidad = (e) => {
        e.preventDefault();
        setCantidadTramos(acompañanteNumber);
        setContadorAcompañante(acompañanteNumber);
    };

    const clearInputs = () => {
        if (document.getElementById("clearInput6"))
            document.getElementById("clearInput6").value = "";
        if (document.getElementById("clearInput7"))
            document.getElementById("clearInput7").value = "";
        if (document.getElementById("clearInput8"))
            document.getElementById("clearInput8").value = "";

        //Select Documento
        if (document.getElementById("TipoDocumento")) {
            document.getElementById("TipoDocumento").value = "";
            document.getElementById("TipoDocumento").name = "Seleccionar";
        }
    };

    const selectDocumento = ({ target }) => {
        let documento = target.value;
        if (!documento) return;
        setEleccionAcompañante({
            ...eleccionAcompañante,
            ["TipoDocumentoAcompaniante"]: target.value,
        });
    };

    return (
        <div>
            {!cantidadTramos ? (
                <>
                    <h1>¿Cuantos Acompañantes Tenes?</h1>
                    <input
                        type="number"
                        placeholder="Cantidad de Acompañantes"
                        name="cantidadDeAcompañantes"
                        onChange={cantidadEleccionActual}
                        required
                    />
                    <div id="CancelarAgregarAcompañante">
                        <input
                            type="button"
                            value="Guardar"
                            name="ACOMPAÑANTES"
                            class="btn btn-primaryacomp"
                            onClick={selectCantidad}
                        />
                        <br />
                        <br />
                    </div>
                </>
            ) : (
                <>
                    {console.log("ACOMPAÑANTES ", acompañanteNumber)}
                    <div id="AgregarMiembroAcompañante">
                        {/* <h1>ACOMPAÑASTE TOTALES: {acompañanteNumber}</h1> */}
                        <input
                            type="text"
                            placeholder="Nombre"
                            name="nombre_Acompaniante"
                            onChange={handleChange}
                            id="clearInput6"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Apellido"
                            name="apellido_Acompaniante"
                            id="clearInput7"
                            onChange={handleChange}
                            required
                        />
                        <select
                            id="TipoDocumento"
                            name="TipoDocumentoAcompaniante"
                            onChange={selectDocumento}
                        >
                            <option value="">
                                Seleccionar Tipo de Documento
                            </option>
                            <option value="DNI">DNI</option>
                            <option value="PASAPORTE">PASAPORTE</option>
                            <option value="LIBRETA">LIBRETA</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Numero"
                            name="numero_Acompaniante"
                            onChange={handleChange}
                            id="clearInput8"
                            AgregarMiembroAcompañante
                        />

                        {contadorAcompañante > 1 ? (
                            <>
                                <div id="CancelarAgregarAcompañante">
                                    <input
                                        type="button"
                                        value="Siguiente Acompañante"
                                        name="CancelarAgregacionAcompañante"
                                        class="btn btn-primaryacomp"
                                        onClick={setNewEleccion}
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <div id="CancelarAgregarAcompañante">
                                    <input
                                        type="button"
                                        value="Guardar Acompañante/s"
                                        name="acompañante"
                                        class="btn btn-primaryacomp"
                                        onClick={onSubmitFinal}
                                    />
                                    <br />
                                    <br />
                                </div>
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};
