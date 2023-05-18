import React from "react";
import {
  BrowserRouter,
  //createBrowserRouter,
  Route,
  //RouterProvider,
  Routes,
} from "react-router-dom";
import Home from "./Modules/Home/Home";
import Pacientes from "./Modules/Pacientes/Pacientes";
import AddPacientes from "./Modules/Pacientes/AddPacientes";
import EditPacientes from "./Modules/Pacientes/EditPacientes";
import IniciarSesion from "./Modules/Home/IniciarSesion";
import Laboratorio from "./Modules/Home/Laboratorio";
import RegistrarUser from "./Modules/Home/RegistrarUser";
import Expedientes from "./Modules/Expedientes/Expedientes";
import AddExpedientes from "./Modules/Expedientes/AddExpedientes";
import EditExpedientes from "./Modules/Expedientes/EditExpedientes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/iniciarsesion" element={<IniciarSesion/>}/>
          <Route path="/laboratorio" element={<Laboratorio/>}/>
          <Route path="/registrar-user" element={<RegistrarUser/>}/>
          <Route path="/pacientes" element={<Pacientes/>}/>
          <Route path="/pacientes/crear" element={<AddPacientes/>}/>
          <Route path="/pacientes/:pacienteId" element={<EditPacientes/>}/>
          <Route path="/expedientes" element={<Expedientes/>}/>
          <Route path="/expedientes/crear" element={<AddExpedientes/>}/>
          <Route path="/expedientes/:expedienteId" element={<EditExpedientes/>}/>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
