import React from "react";
import "../styles/Contacts.css";


import $ from 'jquery'
import { useEffect, useState } from "react";
import axios from "axios";


export const Contacts = () => {
    const [usuario, setUser] = useState({});
    const [eleccion, setEleccion] = useState({});
    const [inputs, setInputs] = useState("");
    const [contacts, setContacts] = useState("");
    
    useEffect(() => {
        const isUserLogg = window.localStorage.getItem("UserLoggedInfo");
        if (isUserLogg) {
            let user = JSON.parse(isUserLogg)
            setUser(user);
            setEleccion({
                rol: user.rol,
                userId: user.id
            })    


            axios.get("https://carbonoapplication.herokuapp.com/contacts")
                .then(({ data }) => {
                    console.log("funciono al traer contacts", data);
                    setContacts(data)
                })
                .catch((error) => {
                    console.log("No funciono! al traer los contacts", error);
                    console.log(error);
                });

        }
    }, []);

    $(document).ready(function () {
        $("#listita").hide();

        $("input[name='botonShowContacts']").on("click", function () {
            $("#listita").show();
        }).change();

    });


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
        axios
            .post("https://carbonoapplication.herokuapp.com/addContacts", JSON.stringify(eleccion))
            .then(({ data }) => {
                console.log("funciono addContact", data);

                if (document.getElementById("inputName").value) document.getElementById("inputName").value = ""
                if (document.getElementById("inputEmail").value) document.getElementById("inputEmail").value = ""
                if (document.getElementById("inputCelu").value) document.getElementById("inputCelu").value = ""
                setInputs("")
            })
            .catch((error) => {
                console.log("No funciono! AddContact", error);
                console.log(error);
            });
    }


    return (
        <>
            <div class="aa">
                <link href="https://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet"></link>
                <div id="formularito">

                    <form method="POST" action="addContacts" class="ccform">
                        <h1>AÑADIR NUEVOS CONTACTOS</h1>



                        <div class="ccfield-prepend">
                            <span class="ccform-addon"><i class="fa fa-user fa-2x"></i></span>
                            <input class="ccformfield" name="nombre" type="text" placeholder="Nombre" id="inputName" required onChange={handleChange} />
                        </div>



                        <div class="ccfield-prepend">
                            <span class="ccform-addon"><i class="fa fa-envelope fa-2x"></i></span>
                            <input class="ccformfield" name="email" type="text" placeholder="Email" required id="inputEmail" onChange={handleChange} />
                        </div>

                        <div class="ccfield-prepend">
                            <span class="ccform-addon">
                                <i class="fa fa-mobile-phone fa-2x"></i>
                            </span>
                            <input class="ccformfield" name="celular" type="text" placeholder="Celular" id="inputCelu" onChange={handleChange} />
                        </div>



                        <div className="buttons">
                            <div id="botonsito">
                                <div class="ccfield-prepend">
                                    <input name="botonShowContacts" class="ccbtn" type="button" value="Ver Lista de Contactos" />
                                </div>
                            </div>

                            <div class="ccfield-prepend">
                                <input class="ccbtn" type="submit" value="Guardar" onClick={onSubmit} />
                            </div>

                        </div>
                    </form>

                </div>

            </div >

            <section id="listita" className="ccformcont">
                <header>
                    <h4>
                        <span>Log</span>
                        <span>Favorites</span>
                        <span class='c'>Contacts</span>
                    </h4>
                </header>
                <ul class="filter">
                    {
                        contacts ? (
                            <>
                                {contacts.map((person) => {
                                    return(
                                    <>
                                        <li><span class='img'>👦</span><span class='name'>{person.nombre}</span> <span class='ph'>{person.email}</span> <span class='ph'>{person.celular}</span></li>
                                    </>
                                    )
                                })}
                            </>
                        ) : (<></>)

                    }

                </ul>
            </section>

        </>
    )
}