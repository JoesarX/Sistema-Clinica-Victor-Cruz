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
import Laboratorio from "./Modules/Home/Laboratorio";
import RegistrarUser from "./Modules/Home/RegistrarUser";
import Expedientes from "./Modules/Expedientes/Expedientes";
import AddExpedientes from "./Modules/Expedientes/AddExpedientes";
import EditExpedientes from "./Modules/Expedientes/EditExpedientes";


function App() {
  // Obtén el estado de autenticación desde localStorage
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  window.addEventListener("beforeunload", function(event) {
    // Borrar el almacenamiento local
    localStorage.clear();
  })
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/iniciarsesion" element={<IniciarSesion/>}/>
          <Route path="/laboratorio" element={<Laboratorio/>}/>
          <Route path="/registrar-user" element={<RegistrarUser/>}/>
          <Route path="/citas" element={<Citas/>}/>
          <Route path="/expedientes" element={<Expedientes/>}/>
          <Route path="/expedientes/crear" element={<AddExpedientes/>}/>
          <Route path="/expedientes/:expedienteId" element={<EditExpedientes/>}/>
          
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
