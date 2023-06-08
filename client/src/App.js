import React from "react";
import {
  BrowserRouter,
  //createBrowserRouter,
  Route,
  //RouterProvider,
  Routes,
} from "react-router-dom";
import Home from "./Modules/Home/Home";
import Citas from "./Modules/Home/Citas";
import IniciarSesion from "./Modules/Home/IniciarSesion";
import Servicios from "./Modules/Home/Servicios";
import Acercade from "./Modules/Home/Acercade";
import Laboratorio from "./Modules/Home/Laboratorio";
import RegistrarUser from "./Modules/Home/RegistrarUser";
import Expedientes from "./Modules/Expedientes/Expedientes";
import AddExpedientes from "./Modules/Expedientes/AddExpedientes";
import EditExpedientes from "./Modules/Expedientes/EditExpedientes";
import Administrador from "./Modules/usuario_admin/administrador";
import Medicamentos from "./Modules/Medicamentos/Medicamentos";

import Dashboard from "./Modules/Dashboard/Dashboard";
import Contactanos from "./Modules/Home/Contactanos";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/iniciarsesion" element={<IniciarSesion/>}/>
          <Route path="/acerca-de" element={<Acercade/>}/>
          <Route path="/servicios" element={<Servicios/>}/>
          <Route path="/laboratorio" element={<Laboratorio/>}/>
          <Route path="/registrar-user" element={<RegistrarUser/>}/>
          <Route path="/citas" element={<Citas/>}/>
          <Route path ="/administrador" element={<Administrador/>}/>
          <Route path="/expedientes" element={<Expedientes/>}/>
          <Route path="/expedientes/crear" element={<AddExpedientes/>}/>
          <Route path="/expedientes/dashboard/:expedienteId" element={<Dashboard/>}/>
          <Route path="/medicamentos" element={<Medicamentos/>}/>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contactanos" element={<Contactanos />} />

          {/* <Route path="/dashboard" element={<Dashboard/>}/> */}

          <Route path="*" element={<p>No encontramos lo que buscas:(</p>} />

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
