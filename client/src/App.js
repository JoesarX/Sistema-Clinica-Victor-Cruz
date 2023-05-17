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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/pacientes" element={<Pacientes/>}/>
          <Route path="/pacientes/crear" element={<AddPacientes/>}/>
          <Route path="/pacientes/:pacienteId" element={<EditPacientes/>}/>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
