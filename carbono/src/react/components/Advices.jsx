import React from "react";
import $ from 'jquery'
import "../styles/Advices.css";
import _ from 'lodash';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";


export const Advices = () => {
    const [usuario, setUser] = useState({});
    const navigate = useNavigate();
    const puerto = "8080";
    const full = location.protocol + '//' + location.hostname + ":" + puerto;



    function onSubmit(e) {
        e.preventDefault();
        axios.post(full +"/advices", )
     }


        // ------------- VARIABLES ------------- //
        
        var ticking = false;
        var isFirefox = /Firefox/i.test(navigator.userAgent);
        var isIe =
        /MSIE/i.test(navigator.userAgent) ||
        /Trident.*rv\:11\./i.test(navigator.userAgent);
        var scrollSensitivitySetting = 30; //Increase/decrease this number to change sensitivity to trackpad gestures (up = less sensitive; down = more sensitive)
        var slideDurationSetting = 600; //Amount of time for which slide is "locked"
        var currentSlideNumber = 0;
        var delta = 0;
        var totalSlideNumber = $(".background").length;
    

        // ------------- DETERMINE DELTA/SCROLL DIRECTION ------------- //
        function parallaxScroll(evt) {
        if (isFirefox) {
            //Set delta for Firefox
            delta = evt.detail * -120;
        } else if (isIe) {
            //Set delta for IE
            delta = -evt.deltaY;
        } else {
            //Set delta for all other browsers
            delta = evt.wheelDelta;
        }

        if (ticking != true) {
            if (delta <= -scrollSensitivitySetting) {
            //Down scroll
            ticking = true;
            if (currentSlideNumber !== totalSlideNumber - 1) {
                currentSlideNumber++;
                nextItem();
            }
            slideDurationTimeout(slideDurationSetting);
            }
            if (delta >= scrollSensitivitySetting) {
            //Up scroll
            ticking = true;
            if (currentSlideNumber !== 0) {
                currentSlideNumber--;
            }
            previousItem();
            slideDurationTimeout(slideDurationSetting);
            }
        }
        }

        // ------------- SET TIMEOUT TO TEMPORARILY "LOCK" SLIDES ------------- //
        function slideDurationTimeout(slideDuration) {
        setTimeout(function () {
            ticking = false;
        }, slideDuration);
        }

        // ------------- ADD EVENT LISTENER ------------- //
        var mousewheelEvent = isFirefox ? "DOMMouseScroll" : "wheel";
        window.addEventListener(mousewheelEvent, _.throttle(parallaxScroll, 60), false);

        // ------------- SLIDE MOTION ------------- //
        function nextItem() {
        var $previousSlide = $(".background").eq(currentSlideNumber - 1);
        $previousSlide.removeClass("up-scroll").addClass("down-scroll");
        }

        function previousItem() {
        var $currentSlide = $(".background").eq(currentSlideNumber);
        $currentSlide.removeClass("down-scroll").addClass("up-scroll");
        }

    return (
        <body>
                <div class="AdviceContainer">
                <section className="background">
                    <div class="content-wrapper">
                    <p class="content-title">¿COMO REDUCIR MI HUELLA DE CARBONO?</p>
                    <p class="content-subtitle">Scroll down y aprende como!</p>
                    </div>
                </section>
                <section className="background">
                    <div class="content-wrapper">
                    <p class="content-title">Muévete de forma más sostenible!</p>
                    <p class="content-subtitle">En transporte público, bicicleta o a pie, y compra vehículos más respetuosos con el medio ambiente.</p>
                    </div>
                </section>
                <section className="background">
                    <div class="content-wrapper">
                    <p class="content-title_special3">Elige un consumo de energía de origen 100 % renovable</p>
                    <p class="content-subtitle">Adquiere electrodomésticos de bajo consumo y regula la calefacción y el aire acondicionado para ahorrar energía.</p>
                    </div>
                </section>
                <section className="background">
                    <div class="content-wrapper">
                    <p class="content-title">Disminuye la cantidad de residuos</p>
                    <p class="content-subtitle">Reutiliza tus envases, recíclalos y, si no es posible, tíralos al contenedor correspondiente.</p>
                    </div>
                </section>
                <section className="background">
                    <div class="content-wrapper">
                    <p class="content-title">Desconectar los artefactos electricos</p>
                    <p class="content-subtitle">Por mas que los artefactos no esten en uso, generan un gasto que en multitud impacta sobre nuestra huella.</p>
                    </div>
                </section>
                <section className="background">
                    <div class="content-wrapper">
                    <p class="content-title_special5">Conciénciate a ti mismo y a los demás sobre la importancia de reducir la huella de carbono.</p>
                    <p class="content-subtitle">Es muy importante que todos entendamos el impacto que genera reducir nuestra huella.</p>
                    </div>
                </section>
                <section className="background">
                    <div class="content-wrapper">
                    <p class="content-title">Solos podemos hacer poco,</p>
                    <p class="content-title">juntos podemos hacer mucho</p>
                    <p class="content-subtitle">Helen Keller.</p>
                    </div>
                </section>
                </div>
        </body>
    );
};
