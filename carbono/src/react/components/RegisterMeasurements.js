import React from "react";
import "../styles/RegisterMeasurements.css";
import $ from "jquery";
import axios from "axios";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

export const RegisterMeasurements = () => {
  const [usuario, setUser] = useState({});
  const [eleccion, setEleccion] = useState({});
  const [archivo, setArchivo] = useState(null);



  useEffect(() => {
    const isUserLogg = window.localStorage.getItem("UserLoggedInfo");
    if (isUserLogg) {
      let user = JSON.parse(isUserLogg);
      setUser(user);
      setEleccion({
        rol: user.rol,
        userId: user.id,
      });
    }
  }, []);

  /*  const readExcel = (file) => {
     const promise = new Promise((resolve, reject) => {
       const fileReader = new FileReader();
 
       fileReader.readAsArrayBuffer(file);
 
       fileReader.onload = (e) => {
         const bufferArray = e.target.result;
 
         const wb = XLSX.read(bufferArray, { type: "buffer" });
 
         const wsname = wb.SheetNames[0];
 
         const ws = wb.Sheets[wsname];
         const data = XLSX.utils.sheet_to_json(ws);
         resolve(data);
       };
 
       fileReader.onerror = (error) => {
         reject(error);
       };
     });
 
 
     //ACA TE ENVIO EL EXCEL, No estoy mandando ni el user ID ni el rol, avisenme si lo necesitamos
     promise.then((d) => {
       const isUserLogg = window.localStorage.getItem("UserLoggedInfo");
       let user = JSON.parse(isUserLogg);
       let fieldAndUser = [
         {
           user: user,
           excel: d
         }
       ]
       d.push(user)
       console.log("EXCEL DATOS", fieldAndUser);
       axios
         .post("http://localhost:8080/metrics", JSON.stringify(fieldAndUser))
         .then(({ data }) => {
           console.log("funcionaron la subida del excel ", data);
         })
         .catch((error) => {
           console.log("Error al enviar el excel", error);
         });
     });
   }; */

  const subirArchivos = (e) => {
    setArchivo(e)
  }


  const insertarArchivos = async () => {
    const isUserLogg = window.localStorage.getItem("UserLoggedInfo");
    let user = JSON.parse(isUserLogg);
    const f = new FormData();

    for (let i = 0; i < archivo.length; i++) {
      f.append("file", archivo[i])
      f.append("cookie", user.id)

    }


    await axios
      .post("https://carbonoapplication.herokuapp.com/metrics", f, { headers: { "Content-Type": "multipart/form-data" } })
      .then(({ data }) => {
        console.log("funcionaron la subida del excel ", data);
      })
      .catch((error) => {
        console.log("Error al enviar el excel", error);
      });

  }




  return (
    <div className="RegistrarMediciones">
      <div className="bg-img">
        <div className="titulo">
          <h1>Registrar Mediciones</h1>
        </div>
        <div className="paragraph-mediciones">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Assumenda, laborum! Maiores voluptatem consequatur
            exercitationem magnam a consectetur corrupti
            voluptatibus ratione, molestias ullam harum quis laborum
            vitae tenetur, iste facilis vero.
          </p>
        </div>

        <div className="file-upload">
          <div className="image-upload-wrap">
            <input
              className="file-upload-input"
              name="files"
              type="file"
              multiple
              onChange={(e) => {
                subirArchivos(e.target.files);
              }}
            />
            <div className="drag-text">
              <h3>Haz click aquí o arrastra un archivo</h3>
            </div>
            <br />
            <br />
          </div>
          <div className="file-upload-content">
            <img
              className="file-upload-image"
              src="#"
              alt="your image"
            />
          </div>
        </div>
        <button onClick={() => insertarArchivos()}> Enviar archivo </button>
      </div>
    </div>
  );
};
