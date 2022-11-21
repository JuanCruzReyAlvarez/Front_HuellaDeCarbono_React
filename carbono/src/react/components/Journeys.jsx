import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/Journeys.css";
import $ from 'jquery'

export const Journeys = () => {
    
    //HAY QUE PEGARLE A LA API
    const navigate = useNavigate();
    // DECLARACION DE ESTADOS
    const [usuario, setUser] = useState({});
    const [eleccion, setEleccion] = useState({});
    const [organizaciones, setOrganizaciones] = useState([]);
    const [provincias, setProvincias] = useState([]);
    const [municipios, setMunicipios] = useState([]);
    const [localidades, setLocalidades] = useState([]);
    const [sectores, setSectores] = useState([]);
    const [hallAgentes, setHallAgentes] = useState("");

    const handleChange = ({ target }) => {
        setEleccion((eleccion) => {
            return {
                ...eleccion,
                [target.name]: target.value,
            };
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        axios.post("https://carbonoapplication.herokuapp.com/hall", JSON.stringify(eleccion)).then((data) => { //mando este usuario creado a ese esa url mediando un post obviamente (a mi back), lo mando en tipo json, (por eso json.usuario), (acordarce que este usuario es lo que comenzo como un estado local vacio y se fue haciendo en los inputs y las funciones), y acordarce juan que con el .then estoy haciendo una promesa, es decir hay algo que me va a devolver mi back luego de que yo le mande el usuario y lo tengo que atajar. Si sale todo bien me cae en el then.Esto quiere decir que va a estar en mi data lo que me haya mandado mi back. Acordarce que data es una palabra reservada que puse yo y que va a lamacenar cualquier cosa que yo le mand edel back.
            //. Si hay problema me va al catch.ya sea problemas de comunicacion de servidor del cliente o nuestro. O tambien puede pasar que no cumpla logica necesaria como que la contraseña no sea correcta, enotnces esto se mando el usuario en json JSON.stringify(usuario)) , ahi se ejecuta un wait() hasta que el back procesa y manda un signal() para que se termine de ejecutar la promesa en el then(), si todo bien too ok, sino cumplio logica como deciamos mi back catghea ese error y le dispara el error a este servidor.
            console.log("funciono el hall", data)
            navigate("/advices")
        }).catch(error => {
            console.log("No funciono el Hall", error)
        })
    }

    const SelectorProvincia = (e) => {
        e.preventDefault();
        let provinciaID = e.target.value
        if (hallAgentes === "P") {
            setEleccion({ ...eleccion, idProvincia: provinciaID, flagSector: "P"  })
            
            return
        }
        if (!provinciaID) return
        console.log("Provincia Id", provinciaID)
        setLocalidades([])
        setEleccion({ ...eleccion, idProvincia: provinciaID,flagSector: "P"   })
        axios.post("https://carbonoapplication.herokuapp.com/municipio", JSON.stringify({ id: provinciaID })).then(({ data }) => {
            console.log("Municipios traidos de la base: ", data)
            data.unshift({ id: "", name: "Seleccionar" })
            setMunicipios(data);
        }).catch(error => {
            console.log("Error al traer a los municipios", error)
        })
    }

    const SelectorMunicipio = (e) => {
        e.preventDefault();
        let idMunicipio = e.target.value
        if (!idMunicipio) return
        if (usuario.rol === "AGENTE_SECTORIAL") {
            setEleccion({ ...eleccion, idMunicipio: idMunicipio,  flagSector: "M"  });
            return
        }
        setEleccion({ ...eleccion, idMunicipio: idMunicipio,  flagSector: "M"  });
        axios.post("https://carbonoapplication.herokuapp.com/localidad", JSON.stringify({ id: idMunicipio })).then(({ data }) => {
            console.log("Localidades traidas de la base: ", data)
            data.unshift({ id: "", name: "Seleccionar" })
            setLocalidades(data);
        }).catch(error => {
            console.log("Error al traer a las localidades", error)
        })
    }

    const isChecked = (e) => {
        let ischeck = e.target.checked
        if (ischeck) setEleccion({ ...eleccion, flagSolicitud: "1" });
        else setEleccion({ ...eleccion, flagSolicitud: "0" });
    }

    const SelectorLocalidad = (e) => {
        e.preventDefault();
        let idlocalidad = e.target.value
        if (!idlocalidad) return
        setEleccion({ ...eleccion, idlocalidad: idlocalidad });

    }

    const SelectorTipo = (e) => {
        e.preventDefault();
        let tipo_nombre = e.target.value
        if (!tipo_nombre) return
        setEleccion({ ...eleccion, tipoOrganizacion: tipo_nombre });
    }
  



    $(document).ready(function () {

        $("#combustibleYtipoVehiculo").hide();
        $("#LineaYTipoDeTransporte").hide();
        $("#AdicionalServicioContratado").hide();
        $("#TipoMedioNoMotorizado").hide();
        $("#AgregarAcompañante").hide();
        $("#AgregarMiembroAcompañante").hide();
        

        
        
        


        
        $("select").change(function () {
            $( "select option:selected").each(function(){

                if($(this).attr("value") == "VEHICULO_PARTICULAR"){
                    $("#combustibleYtipoVehiculo").show();
                    $("#AgregarAcompañante").show();
                }

                if($(this).attr("value") == "TRANSPORTE_PUBLICO"){
                    $("#LineaYTipoDeTransporte").show();
                }

                if($(this).attr("value") == "SERVICIO_CONTRATADO"){
                    $("#AdicionalServicioContratado").show();
                    $("#AgregarAcompañante").show();
                }
                if($(this).attr("value") == "MEDIO_NO_MOTORIZADO"){
                    $("#TipoMedioNoMotorizado").show();
                }
                if($(this).attr("value") == "SELECCIONAR"){
                    $("#combustibleYtipoVehiculo").hide();
                    $("#AgregarAcompañante").hide();
                    $("#AgregarMiembroAcompañante").hide();
                    $("#LineaYTipoDeTransporte").hide();
                    $("#AdicionalServicioContratado").hide();
                    $("#TipoMedioNoMotorizado").hide();
                }
  
            });
            
        }).change();

        $("input[name='AgregarTramo']").on("click", function(){
            $("#AgregarMiembroAcompañante").show();
        }).change();

        $("input[name='CancelarAgregacionAcompañante']").on("click", function(){
            $("#AgregarMiembroAcompañante").hide();
        }).change();








    });



    return (
        
        <div class="bodyJour">
            <div>
                <div class="outer">
                    <div class="card">
                        <div class="timeline">
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
                                        onSubmit={onSubmit}
                                    >
                                        <div class="alert alert-error"></div>
                                        <h2>UBICACION INCIAL</h2>
                                        <input
                                            type="text"
                                            placeholder="Calle"
                                            name="calle"
                                            onChange={handleChange}
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="Altura"
                                            name="altura"
                                            onChange={handleChange}
                                            required

                                        />
                                        {/* --------UBI SON DESPLEGABLES: localidad,muni,prov PAIS NO -------- */}


                                        <select id="ElegirProvincia" name="prov" onChange={SelectorProvincia}>
                                            {
                                                provincias.length ? (
                                                    provincias.map((item, i) => {
                                                        // if (i === 0) {
                                                        //     return (
                                                        //         <option key={i} >select</option>
                                                        //     )
                                                        // }

                                                        return (
                                                            <option key={i} value={item.id}>{item.name}</option>
                                                        )
                                                    })
                                                ) : <option>Seleccionar Provincia</option>
                                            }

                                        </select>



                                        <select id="ElegirMunicipio" name="muni" onChange={SelectorMunicipio}>
                                            {
                                                municipios.length ? (
                                                    municipios.map((item, i) => {
                                                        return (
                                                            <option key={i} value={item.id}>{item.name}</option>
                                                        )
                                                    })
                                                ) : <option>Seleccionar Municipio</option>
                                            }

                                        </select>

                                        <select id="ElegirLocalidad" name="loc" onChange={SelectorLocalidad}>
                                            {
                                                localidades.length ? (
                                                    localidades.map((item, i) => {
                                                        return (
                                                            <option key={i} value={item.id}>{item.name}</option>
                                                        )
                                                    })
                                                ) : <option>Seleccionar Localidad</option>
                                            }

                                        </select>
                                        <h2>UBICACION FINAL</h2>
                                        <input
                                            type="text"
                                            placeholder="calle"
                                            name="calle"
                                            onChange={handleChange}
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="altura"
                                            name="altura"
                                            onChange={handleChange}
                                            required

                                        />
                                        {/* --------UBI SON DESPLEGABLES: localidad,muni,prov PAIS NO -------- */}


                                        <select id="ElegirProvincia" name="prov" onChange={SelectorProvincia}>
                                            {
                                                provincias.length ? (
                                                    provincias.map((item, i) => {
                                                        // if (i === 0) {
                                                        //     return (
                                                        //         <option key={i} >select</option>
                                                        //     )
                                                        // }

                                                        return (
                                                            <option key={i} value={item.id}>{item.name}</option>
                                                        )
                                                    })
                                                ) : <option>Aun no hay Provincias</option>
                                            }

                                        </select>



                                        <select id="ElegirMunicipio" name="muni" onChange={SelectorMunicipio}>
                                            {
                                                municipios.length ? (
                                                    municipios.map((item, i) => {
                                                        return (
                                                            <option key={i} value={item.id}>{item.name}</option>
                                                        )
                                                    })
                                                ) : <option>Aun no hay Municipios</option>
                                            }

                                        </select>

                                        <select id="ElegirLocalidad" name="loc" onChange={SelectorLocalidad}>
                                            {
                                                localidades.length ? (
                                                    localidades.map((item, i) => {
                                                        return (
                                                            <option key={i} value={item.id}>{item.name}</option>
                                                        )
                                                    })
                                                ) : <option>Aun no hay Localidades</option>
                                            }

                                        </select>

                                        <h2>MEDIO DE TRANSPORTE</h2>

                                        <select id="Tipo" name="Tipo" onChange={SelectorTipo}>
                                            <option value="SELECCIONAR">Seleccionar</option>
                                            <option value="MEDIO_NO_MOTORIZADO">Medio no Motorizado</option>
                                            <option value="SERVICIO_CONTRATADO">Servicio Contratado</option>
                                            <option value="TRANSPORTE_PUBLICO">Transporte Publico</option>
                                            <option value="VEHICULO_PARTICULAR">Vehiculo Particular</option>
                                        </select>

                                        <div id="AgregarAcompañante">

                                            <input
                                                type="button"
                                                value="Agregar Acompañante"
                                                name="AgregarTramo"
                                                class="btn btn-block btn-primaryacomp"
                                            />
                                            <br />
                                            <br />
                                        </div>

                                        <div id="AgregarMiembroAcompañante">

                                            <input
                                                type="text"
                                                placeholder="Nombre"
                                                name="nombre"
                                                onChange={handleChange}
                                                required

                                            />
                                            <input
                                                type="text"
                                                placeholder="Apellido"
                                                name="apellido"
                                                onChange={handleChange}
                                                required
                                            />
                                            <select id="TipoDocumento" name="TipoDocumento" onChange={SelectorTipo}>
                                                <option value="">Seleccionar Tipo de Documento</option>
                                                <option value="DNI">DNI</option>
                                                <option value="PASAPORTE">PASAPORTE</option>
                                                <option value="LIBRETA">LIBRETA</option>
                                            </select>
                                            <input
                                                type="text"
                                                placeholder="Numero"
                                                name="Numero"
                                                onChange={handleChange}
                                                AgregarMiembroAcompañante
                                            />
                                            <div id="CancelarAgregarAcompañante">
                                                <input
                                                    type="button"
                                                    value="Cancelar"
                                                    name="CancelarAgregacionAcompañante"
                                                    class="btn btn-primaryacomp"
                                                />
                                                <br />
                                                <br />
                                            </div>
                                        </div>


                                        <div id="combustibleYtipoVehiculo">


                                            <h2>VEHICULO</h2>
                                            <select id="Tipo" name="Tipo" onChange={SelectorTipo} >
                                                <option value="">Seleccionar</option>
                                                <option value="AUTO">AUTO</option>
                                                <option value="MOTO">MOTO</option>
                                                <option value="CAMIONETA">CAMIONETA</option>
                                            </select>

                                            <h2>COMBUSTIBLE</h2>

                                            <select id="Tipo" name="Tipo" onChange={SelectorTipo} >
                                                <option value="">Seleccionar</option>
                                                <option value="GNC">GNC</option>
                                                <option value="DIESEL">Diesel</option>
                                                <option value="NAFTA">Nafta</option>
                                                <option value="ELECTRICIDAD">Electricidad</option>
                                            </select>

                                        </div>

                                        <div id="LineaYTipoDeTransporte">

                                            <h2>TIPO DE TRANSPORTE</h2>

                                            <select id="Tipo" name="Tipo" onChange={SelectorTipo} >
                                                <option value="">Seleccionar</option>
                                                <option value="COLECTIVO">COLECTIVO</option>
                                                <option value="TREN">TREN</option>
                                                <option value="SUBTE">SUBTE</option>
                                            </select>

                                            <h2>LINEA</h2>

                                            <input
                                                type="text"
                                                placeholder="Linea"
                                                name="linea"
                                                onChange={handleChange}
                                                required
                                            />



                                        </div>


                                        <div id="AdicionalServicioContratado">

                                            <h2>EMPRESA SERVICIO CONTRATADO</h2>
                                            <input
                                                type="text"
                                                placeholder="Empresa"
                                                name="linea"
                                                onChange={handleChange}
                                                required
                                            />

                                        </div>

                                        <div id="TipoMedioNoMotorizado">

                                            <h2>MEDIO DE TRANSPORTE</h2>
                                            <select id="Tipo" name="Tipo" onChange={SelectorTipo} >
                                                <option value="">Seleccionar</option>
                                                <option value="BICICLETA">BICICLETA</option>
                                                <option value="MONOPATIN">MONOPATIN</option>
                                                <option value="PIE">PIE</option>
                                                <option value="OTRO">OTRO</option>
                                            </select>

                                        </div>

                                        <br /><br /><br /><br />
                                       
                                        <input
                                            type="submit"
                                            value="Agregar otro Tramo"
                                            name="AgregarTramo"
                                            class="btn btn-block btn-primary"
                                        />

                                        <br /><br /><br /><br /><br />

                                        <input
                                            type="submit"
                                            value="COMPLETAR TRAYECTO"
                                            name="CompletarTrayecto"
                                            //class=" botonCompletarTrayecto btn-block btn-primarytrayect"
                                            class="btn-botonCompletarTrayecto btn-block btn-trayectoprimario"
                                        />
                                        <br />
                                        <label className="salvadora"><input type="checkbox" id="cbox1" value="first_checkbox" onChange={isChecked} />
                                            Agregar mis tramos compartidos
                                        </label><br />

                                    </form>
                                </>
                                <p>Es importante completar los datos con coherencia para que tu organizacion pueda ver el impacto que causa en el mundo con su huella de carbono. Ayudemos entre todos a mejorar el impacto que causamos globalmente. Haciendo cosas pequeñas puedes cambiar el mundo.</p>

                            </div>
                        </div>
                    
                    </div>
                </div>           
                                            
            </div>
        </div>    
        
         
    );
};