import React from "react";
import "../styles/calculators.css";
import $ from 'jquery'


export const Transports = () => {


    $(document).ready(function () {
        $("#cartelito").hide();

        $("#calculitoSectorItems1").hide()


        $("#calculitoOrgItems1").hide()
        $("#calculitoItems2").hide()

        $("#calculitoMiembroItems1").hide()


        $("#botonsito").click(function () {
            $("#formularito").hide()
            $("#botonsito").hide()
            $("#cartelito").show();
        });

        $("#crucecita").click(function () {
            $("#cartelito").hide();
            $("#formularito").show()
            $("#botonsito").show()
        });
        $("#calculitoOrg").click(function () {



            $("#calculitoSectorItems1").hide()


            $("#calculitoMiembroItems1").hide()


            $("#calculitoOrgItems1").show()
            $("#calculitoItems2").hide()

        });

        $("#calculitoSector").click(function () {
            $("#calculitoOrgItems1").hide()
            $("#calculitoMiembroItems1").hide()


            $("#calculitoSectorItems1").show()
            $("#calculitoItems2").show()




        });

        $("#calculitoMiembro").click(function () {

            $("#calculitoMiembroItems1").show()
            $("#calculitoItems2").hide()

            $("#calculitoOrgItems1").hide()

            $("#calculitoSectorItems1").hide()


        });

    });


    return (



        <div className="main-container"> {/* CALCULADOR DE ORGANIZACION, ROL ORG */}
            <h1>AÑADIR NUEVOS MEDIOS DE TRANSPORTE</h1>

            <div className="calculator-container">

                <div className="calculator-title-containter">
                    <h2>TIPO DE TRANSPORTE A AGREGAR</h2>

                    
                        <p class="pop-up-button">AGREGAR </p>
                    
                </div>

            </div>
            <div id="formularito">
                <form class="formulario" action="index.html" method="post">

                    <div className="radio-buttons">

                        <div id="calculitoOrg">
                            <div class="radio-item">
                                <input type="radio" name="tipo-calculo" value="ORG" />
                                <label for="">Servicio contratado </label>
                            </div>
                        </div>

                        <div id="calculitoSector">
                            <div class="radio-item">
                                <input type="radio" name="tipo-calculo" value="SECTOR" />
                                <label for="">Transporte Publico </label>
                            </div>
                        </div>
                        <div id="calculitoMiembro">
                            <div class="radio-item">
                                <input type="radio" name="tipo-calculo" value="MIEMBRO" />
                                <label for="">Vehiculo particular</label>
                            </div>
                        </div>

                    </div>

                    <div id="calculitoOrgItems1">

                        <div class="grid-item">
                            <label for="">Combustible</label>
                            <input type="text" name="" value="" class="text-input" />
                        </div>

                        <div class="grid-item">
                            <label for="">Nombre del servicio contratado</label>
                            <input type="text" name="" value="" class="text-input" />
                        </div>

                    </div>

                    <div id="calculitoSectorItems1">

                        <div class="grid-item">
                            <label for="">Combustible</label>
                            <input type="text" name="" value="" class="text-input" />
                        </div>

                        <div class="grid-item">
                            <label for="">Nombre del servicio contratado</label>
                            <input type="text" name="" value="" class="text-input" />
                        </div>

                        <div class="grid-item">
                            <label for="">Linea </label>
                            <input type="text" name="" value="" class="text-input" />
                        </div>
                        <label for="">Ingresar paradas en orden</label>

                        <div class="grid-item">
                            <label for="">Nombre de la parada</label>
                            <input type="text" placeholder=" " name="" value="" class="text-input" />
                        </div>

                        <div class="grid-item">
                            <label for="">Distancia a la anterior</label>
                            <input type="text" placeholder=" " name="" value="" class="text-input" />
                        </div>

                    </div>


                    <div id="calculitoMiembroItems1">

                        <div class="grid-item">
                            <label for="">Combustible</label>
                            <input type="text" name="" value="" class="text-input" />
                        </div>

                        <div class="grid-item">
                            <label for="">Tipo vehiculo particular</label>
                            <input type="text" name="" value="" class="text-input" />
                        </div>
                    

                    </div>



                    <div id="calculitoItems2">

                        <label for="">Ubicacion parada</label>
                    
                        <div class="grid-item">
                            <label for="">Calle </label>
                            <input type="text" placeholder=" " name="" value="" class="text-input" />
                        </div>

                        <div class="grid-item">
                            <label for="">Altura </label>
                            <input type="text" placeholder=" " name="" value="" class="text-input" />
                        </div>
                                    
                                    {/* --------UBI SON DESPLEGABLES: localidad,muni,prov PAIS NO -------- */}
                        <div class="grid-item">
                            <label for="">Localidad </label>
                            <input type="text" placeholder=" " name="" value="" class="text-input" />
                        </div>

                        <div class="grid-item">
                            <label for="">Municipio </label>
                            <input type="text" placeholder=" " name="" value="" class="text-input" />
                        </div>

                        <div class="grid-item">
                            <label for="">Provincia </label>
                            <input type="text" placeholder=" " name="" value="" class="text-input" />
                        </div>

                        <div class="grid-item">
                            <label for="">Pais </label>
                            <input type="text" placeholder=" " name="" value="" class="text-input" />
                        </div>

                        <p class="pop-up-button">agregar parada </p>




                    </div>


                </form>
            </div>

            <div class="pop-up" id="cartelito" >
                <div id="crucecita">
                    <span>x</span>
                </div>
                <div class="pop-up-text">
                    <h1>RESULTADO = 123 kgms</h1>
                    <p>[GRAFICOS]</p>


                </div>
            </div>


        </div>


    )
}