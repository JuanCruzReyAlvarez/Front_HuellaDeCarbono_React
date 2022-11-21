/* 
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import ".././styles/calculators.css";
import $ from 'jquery'
export const Calculator = () => {
  const [usuario, setUser] = useState({});
  const [organizaciones, setOrganizaciones] = useState([]);
  const [miembros, setMiembros] = useState([]);
  const [sector, setSectores] = useState([]);
  const [calculo, setCalculo] = useState({});




//define(Uri.CALCULATOR, "/calculators") RUTA PARA CALCULADOR




  useEffect(() => {
    const isUserLogg = window.localStorage.getItem("UserLoggedInfo");
    if (isUserLogg) {
      setUser(JSON.parse(isUserLogg));
      axios.get("http://localhost:8080/organizacionName", JSON.stringify(usuario)).then(({ data }) => {
        console.log("Organizaciones traidas correctamente:", data)
        setOrganizaciones(data);
      }).catch(error => {
        console.log(error)
      })
    }
  }, []);


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
      $("#calculitoItems2").show()

    });

    $("#calculitoSector").click(function () {
      $("#calculitoOrgItems1").hide()
      $("#calculitoMiembroItems1").hide()


      $("#calculitoSectorItems1").show()
      $("#calculitoItems2").show()




    });


    $("#calculitoAgente").click(function () {
      
      
      $("#calculitoOrgItems1").hide()
      $("#calculitoMiembroItems1").hide()
      $("#calculitoSectorItems1").hide()
      $("#calculitoItems2").show()




    });

    $("#calculitoMiembro").click(function () {

      $("#calculitoMiembroItems1").show()
      $("#calculitoItems2").show()

      $("#calculitoOrgItems1").hide()

      $("#calculitoSectorItems1").hide()


    });
  });

    const selectorOrganizaciones = (e) => {
      let organizacionId = e.target.value
      setCalculo({ ...calculo, organizacionId: organizacionId })
      if (usuario.rol !== "AGENTE_SECTORIAL") {
        //cambiar o fijarse que esta ruta sea la correcta para traer los miembros
        axios.get("http://localhost:8080/member", JSON.stringify({
          //id de la organizacion que se selecciono antes.
          id: organizacionId
        })).then(({ data }) => {
          console.log("MIEMBROS traidos correctamente:", data)
          setMiembros(data);
        }).catch(error => {
          console.log("Error al traer los miembros", error)
        })


         //cambiar o fijarse que esta ruta sea la correcta para traer los sectores
        axios.get("http://localhost:8080/sectores", JSON.stringify({
          //id de la organizacion que se selecciono antes.
          id: organizacionId
        })).then(({ data }) => {
          console.log("sectores traidos correctamente:", data)
          setSectores(data);
        }).catch(error => {
          console.log("Error al traer los sectores", error)
        })

      }

    }

    //Esta funcion esta solo para el primer caso (sin traer miembros ni sectores cuando no hace falta, solo setea con
    // el orgId el estado)
    const selectOrg = (e) =>{
      let organizacionId = e.target.value
      setCalculo({ ...calculo, organizacionId: organizacionId })
    }


    const selectorMiembro = (e) => {
      let miembroId = e.target.value
      setCalculo({ ...calculo, miembroId: miembroId })
    }


    const selectorSector = (e) =>{
      let sectorId = e.target.value
      setCalculo({ ...calculo, sectorId: sectorId })
    }

    const selectorForma = (e) => {
      e.preventDefault();
      //forma: ANUAL O MENSUAL
      let forma = e.target.value
      setCalculo({ ...calculo, forma: forma });
    }

    const selectorSolicitante = (e) => {
      let solicitante = e.target.value
      setCalculo({ ...calculo, solicitante: solicitante });
    }


*/
/* 
  return (
    <div className="main-container"> {// CALCULADOR DE ORGANIZACION, ROL ORG //}
      <h1>impacto de la huella de carbono</h1>

      <div className="calculator-container">

        <div className="calculator-title-containter">
          <h2>Calculador de HC para la organizacion</h2>

          <div id="botonsito">
            <p class="pop-up-button">Calcular</p>
          </div>
        </div>

      </div>
      <div id="formularito">
        <form class="formulario" action="index.html" method="post">

          <div className="radio-buttons">

            {usuario ? (
              usuario.token && usuario.rol === "ORGANIZACION" || usuario.rol === "ADMIN" ? (
                <>
                  <div id="calculitoOrg">
                    <div class="radio-item">
                      <input type="radio" name="tipo-calculo" value="ORG" />
                      <label for="">HC de la organizacion</label>
                    </div>
                  </div>

                  <div id="calculitoSector">
                    <div class="radio-item">
                      <input type="radio" name="tipo-calculo" value="SECTOR" />
                      <label for="">Calculo sobre un sector</label>
                    </div>
                  </div>
                  <div id="calculitoMiembro">
                    <div class="radio-item">
                      <input type="radio" name="tipo-calculo" value="MIEMBRO" />
                      <label for="">Calculo sobre un miembro</label>
                    </div>
                  </div>

                  <div id="calculitoAgente">
                    <div class="radio-item">
                      <input type="radio" name="tipo-calculo" value="AGENTE" />
                      <label for="">Calculo segun sector territorial </label>
                      {//ESTE ES NUEVOOOO HAY QUE AGREGSRLO AL ROL DE AGENTE !!!!!!!!!!!!!!!!!!!!!!!!!!!//}
                    </div>
                  </div>

                </>
              ) : (
                <></>
              )
            ) : (
              <></>
            )}



            {usuario ? (
              usuario.token && usuario.rol === "MIEMBRO" ? (
                <>
                  <div id="calculitoMiembro">
                    <div class="radio-item">
                      <input type="radio" name="tipo-calculo" value="MIEMBRO" />
                      <label for="">Calculo sobre un miembro</label>
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )
            ) : (
              <></>
            )}


            {usuario ? (
              usuario.token && usuario.rol === "AGENTE_SECTORIAL" ? (
                <>
                  <div id="calculitoOrg">
                    <div class="radio-item">
                      <input type="radio" name="tipo-calculo" value="ORG" />
                      <label for="">HC de la organizacion</label>
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )
            ) : (
              <></>
            )}
          </div>






          <div id="calculitoOrgItems1">

             <div class="grid-item">
              <label for="">Organizacion</label>
              <input type="text" name="" value="" class="text-input" />
            </div> 

*/
          /*  {<select id="ElegirOrganizacion" name="org" class="text-input" onChange={selectOrg}>
              {
                organizaciones.length ? (
                  organizaciones.map((item) => {
                    return (
                      <option value={item.id}>{item.nombre}</option>
                    )
                  })
                ) : <option>Aun no hay organizaciones</option>
              }

            </select>}*/

/*



            <div class="grid-item">
              <label for="">Solicitante</label>
              <input type="text" name="" value="" class="text-input" />
            </div>

          </div>




          <div id="calculitoSectorItems1">

             <div class="grid-item">
              <label for="">Organizacion</label>
              <input type="text" name="" value="" class="text-input" />
            </div> 
*/
           /* {<select id="ElegirOrganizacion" name="org" class="text-input" onChange={selectorOrganizaciones}>
              {
                organizaciones.length ? (
                  organizaciones.map((item) => {
                    return (
                      <option value={item.id}>{item.nombre}</option>
                    )
                  })
                ) : <option>Aun no hay organizaciones</option>
              }

            </select>}*/
/*
             <div class="grid-item">
              <label for="">Sector</label>
              <input type="text" name="" value="" class="text-input" />
            </div> 

*/
           /* {<select id="ElegirSector" name="sector" class="text-input" onChange={selectorSector} >
              {
                sector.length ? (
                  sector.map((item) => {
                    return (
                      <option value={item.id}>{item.nombre}</option>
                    )
                  })
                ) : <option>Aun no hay sectores</option>
              }

            </select>}*/

/*
            <div class="grid-item">
            <label for="">Solicitante</label>
              <input type="text" name="" value="" class="text-input" onChange={selectorSolicitante} />
            </div>

          </div>


         // { CALCULO PARA MIEMBROS }

          <div id="calculitoMiembroItems1">

            <div class="grid-item">
              <label for="">Organizacion</label>
              <input type="text" name="" value="" class="text-input" />
            </div> 

    
*/        
         /*    {<select id="ElegirOrganizacion" name="org" onChange={selectorOrganizaciones} class="text-input">
              {
                organizaciones.length ? (
                  organizaciones.map((item) => {
                    return (
                      <option value={item.id}>{item.nombre}</option>
                    )
                  })
                ) : <option>Aun no hay organizaciones</option>
              }

            </select>}*/

            // <div class="grid-item">
              //<label for="">Miembro</label>
             // <input type="text" name="" value="" class="text-input" />
           // </div> 

           /* {<select id="ElegirMiembro" name="miembro" class="text-input" onChange={selectorMiembro}>
              {
                miembros.length ? (
                  miembros.map((item) => {
                    return (
                      <option value={item.id}>{item.nombre}</option>
                    )
                  })
                ) : <option>Aun no hay miembros</option>
              }

            </select>

            <select id="ElegirSector" name="sector" class="text-input" onChange={selectorSector}>
              {
                sector.length ? (
                  sector.map((item) => {
                    return (
                      <option value={item.id}>{item.nombre}</option>
                    )
                  })
                ) : <option>Aun no hay sectores</option>
              }

            </select>}
*/
/*
            <div class="grid-item">
              <label for="">Solicitante</label>
              <input type="text" name="" value="" class="text-input" onChange={selectorSolicitante} />
            </div>

          </div>



          <div id="calculitoItems2">

            <div class="grid-item">
              <label for="">Inicio del periodo</label>
              <input type="text" placeholder="formato : DD/MM/AAAA" name="" value="" class="text-input" />
            </div>

            <div class="grid-item">
              <label for="">Forma de calculo</label>
              <select className="text-input" onChange={selectorForma}>
                <option value="MENSUAL">Mensual</option>
                <option value="ANUAL">Anual</option>
              </select>
            </div>

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
*/
