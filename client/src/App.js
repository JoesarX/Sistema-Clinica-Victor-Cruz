import React from "react";
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Pacientes from "./Modules/Pacientes/Pacientes";
import AddPacientes from "./Modules/Pacientes/AddPacientes";
import EditPacientes from "./Modules/Pacientes/EditPacientes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Pacientes/>}/>
          <Route path="/crear" element={<AddPacientes/>}/>
          <Route path="/:pacienteId" element={<EditPacientes/>}/>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
