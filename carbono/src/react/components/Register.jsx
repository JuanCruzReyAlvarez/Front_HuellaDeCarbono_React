import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

export const Register = () => {
    const navigate = useNavigate();

    const [usuario, setRegister] = useState({});
    
    // es mi estado local que lo llamo usuario , lo arranco VACIO sin propiedades, el setRegister se encarga 
    //de setiarme mi usuario


    function onSubmit(e) {
        e.preventDefault();
        axios.post("https://carbonoapplication.herokuapp.com/register", JSON.stringify(usuario)).then((data) => { //mando este usuario creado a ese esa url mediando un post obviamente (a mi back), lo mando en tipo json, (por eso json.usuario), (acordarce que este usuario es lo que comenzo como un estado local vacio y se fue haciendo en los inputs y las funciones), y acordarce juan que con el .then estoy haciendo una promesa, es decir hay algo que me va a devolver mi back luego de que yo le mande el usuario y lo tengo que atajar. Si sale todo bien me cae en el then.Esto quiere decir que va a estar en mi data lo que me haya mandado mi back. Acordarce que data es una palabra reservada que puse yo y que va a lamacenar cualquier cosa que yo le mand edel back.
            //. Si hay problema me va al catch.ya sea problemas de comunicacion de servidor del cliente o nuestro. O tambien puede pasar que no cumpla logica necesaria como que la contraseña no sea correcta, enotnces esto se mando el usuario en json JSON.stringify(usuario)) , ahi se ejecuta un wait() hasta que el back procesa y manda un signal() para que se termine de ejecutar la promesa en el then(), si todo bien too ok, sino cumplio logica como deciamos mi back catghea ese error y le dispara el error a este servidor.
            console.log("funciono", data)
            navigate("/login")
        }).catch(error => {
            console.log(error)
        })
    }



    //funciones onchange:

    function handleChangeNombre(e) {
        setRegister({ ...usuario, username: e.target.value });
    }
    // estos tres puntitos son donde traigo mi estadolocal entero pero depsues de la coma traigo la propiedad
    // que quiero sobrescribir, si esa propiedad noe existe porque yo inicialice un estdado vacio y todavia
    //no habia nada adentro se crea esta propiedad (atributo) y se setea. El e.target.value es lo que esta adentro
    //del imput (cartel que puse en el html).

    function handleChangePassword(e) {
        setRegister({ ...usuario, password: e.target.value });
    }

    const selectRol = ({ target }) => {
        let rol = target.value
        if (rol === "") return
        setRegister({ ...usuario, rol });
    }

    return (
        <div>
            {/* <link
                href="//db.onlinewebfonts.com/c/a4e256ed67403c6ad5d43937ed48a77b?family=Core+Sans+N+W01+35+Light"
                rel="stylesheet"
                type="text/css"
            />
            <link rel="stylesheet" href="form.css" type="text/css" /> */}

            <div class="body-contenttt"></div>

            <div class="moduleee">
                <h1>Crear una cuenta</h1>
                <form
                    class="form"
                    action="form.php"
                    method="post"                //form
                    enctype="multipart/form-data"
                    autocomplete="off"
                    onSubmit={onSubmit}  // apreto boton registrarse, y se ejecuta la funcion onsubmit que esta      arriba.
                >
                    <div class="alert alert-error"></div>
                    <input
                        type="text"
                        placeholder="Usuario"
                        name="username"
                        onChange={handleChangeNombre}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Constraseña"
                        name="password"
                        autocomplete="off"
                        onChange={handleChangePassword}
                    />

                    <input
                        type="password"
                        placeholder="Confirmar Contraseña"
                        name="confirmpassword"
                        autocomplete="off"
                    />

                    {<h2>Elegir rol</h2>}
                    {<select id="rol" name="rol" onChange={selectRol}>
                        <option value="">Seleccionar</option>
                        <option value="MIEMBRO">Miembro</option>
                        <option value="ORGANIZACION">Organizacion</option>
                        <option value="AGENTE_SECTORIAL">Agente Sectorial</option>
                    </select>}

                    <input
                        type="submit"
                        value="Registrar"             // sin este input de tipo submit, el form no me                           largaria la funcion
                        name="register"
                        class="btn btn-block btn-primary"
                    />
                </form>
            </div>
        </div>
    );
};