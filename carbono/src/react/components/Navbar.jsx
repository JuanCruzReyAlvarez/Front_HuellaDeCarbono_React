import React from "react";
import "../styles/Navbar.css";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
const navigate = useNavigate();


const logOut = () =>{
    window.localStorage.setItem(
        "UserLoggedInfo",
        JSON.stringify({})
    );
    navigate("/login");
}

    return (
        
            <nav>

                <div className="Logo">
                    <img
                        src="https://img.icons8.com/fluency/48/000000/natural-food.png"
                        alt="LOGO"
                    />
                </div>
                <div className="nav_">
                    <ul>
                        <li onClick={logOut}>Cerrar Session</li>
                    </ul>
                </div>
            </nav>
        
    );
};
