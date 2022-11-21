import React from "react";
import { Navbar } from "./components/Navbar.jsx";
import { Sidebar } from "./components/Sidebar.jsx";
import { Register } from "./components/Register.jsx";
import { Login } from "./components/Login.jsx";
import { Hall } from "./components/Hall.jsx";
import { Request } from "./components/Request.jsx";
import { Route, Routes } from "react-router-dom"; // {libreia,libreria}
import { Advices } from "./components/Advices.jsx";
import { RegisterMeasurements } from "./components/RegisterMeasurements.js";
import { ContactsList } from "./components/ContactsList.jsx";
import { Contacts } from "./components/AddContacts.jsx";
import { Report } from "./components/Report.jsx";
import { Calculator } from "./components/calculators.jsx";
import { Hc_organizacion } from "./components/calculators/Hc_organizacion.jsx"
import { Miembro } from "./components/calculators/Miembro.jsx"
import { Sector } from "./components/calculators/Sector.jsx"
import { Sector_Territorial } from "./components/calculators/Sector_Territorial"
import { RegisterSector } from "./components/RegisterSector";
import { Aplications } from "./components/Aplications.jsx";
import { Transports } from "./components/Transports.jsx";
import { Footer } from "./components/Footer.jsx";
import { Emissions } from "./components/Emissions.jsx";
import { Journeys } from "./components/Journeys.jsx";
import { Trayecto } from "./components/journeys/Trayecto.jsx"


const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

                <Route path="/advices" element={<><Sidebar /><Advices /></>} />
                <Route path="/registerSector" element={<> <Navbar /> <Sidebar /> <RegisterSector /> <Footer /></>} />



                {/* Inicio de Rutas calculators */}
                {/* <Route path="/calculators" element={<> <Navbar /> <Sidebar /><Miembro /> <Footer /> </>} /> */}
                <Route path="/calculators/HcOrg" element={<> <Navbar /> <Sidebar /><Hc_organizacion /> <Footer /> </>} />
                <Route path="/calculators/Sector" element={<> <Navbar /> <Sidebar /><Sector /> <Footer /> </>} />
                <Route path="/calculators/Miembro" element={<> <Navbar /> <Sidebar /><Miembro /> <Footer /> </>} />
                <Route path="/calculators/Sector_Territorial" element={<> <Navbar /> <Sidebar /><Sector_Territorial /> <Footer /> </>} />
                {/* Fin de rutas calculators */}

                <Route path="/registerMeasurements" element={<> <Navbar /> <Sidebar /> <RegisterMeasurements /><Footer /> </>} />
                <Route path="/request" element={<><Navbar /> <Sidebar /> <Request /><Footer /> </>} />

                {/* Trayectos */}

                <Route path="/journeys" element={<><Navbar /> <Sidebar /> <Trayecto /> <Footer /> </>} />


                <Route path="/addContacts" element={<> <Navbar /><Sidebar /> <Contacts /> </>} />
                <Route path="/contactsList" element={<><Navbar /><Sidebar /> <ContactsList /> </>} />
                <Route path="/report" element={<> <Navbar /><Sidebar /> <Report /> <Footer /></>} />
                <Route path="/solMiembro" element={<><Navbar /><Sidebar /><Aplications /> <Footer /></>} />
                <Route path="/transports" element={<><Navbar /><Sidebar /><Transports /><Footer /> </>} />
                <Route path="/emissions" element={<><Navbar /><Sidebar /><Emissions /><Footer /> </>} />
                

                <Route path="/hall" element={<Hall />} />

                <Route
                    exact
                    path="/"
                    element={
                        <>
                            <Sidebar />
                            <Advices />
                        </>
                    }
                />
            </Routes>
        </div>
    );
};

export default App;
