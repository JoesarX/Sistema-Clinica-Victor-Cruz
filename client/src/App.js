import React from "react";
import {
  BrowserRouter,
  //createBrowserRouter,
  Route,
  //RouterProvider,
  Routes,
} from "react-router-dom";
import Home from "./Modules/Home/Home";
import Citas from "./Modules/Citas_files/Citas";
import Citas_Doc from "./Modules/Citas_files/Citas_Doc";
import IniciarSesion from "./Modules/Home/IniciarSesion";
import Servicios from "./Modules/Home/Servicios";
import Acercade from "./Modules/Home/Acercade";
import Laboratorio from "./Modules/Home/Laboratorio";
import RegistrarUser from "./Modules/Home/RegistrarUser";
import Expedientes from "./Modules/Expedientes/Expedientes";
import Administrador from "./Modules/usuario_admin/administrador";
import Medicamentos from "./Modules/Medicamentos/Medicamentos";
import LandingPage from "./Modules/Home/LandingPage";
import CitasTabla from "./Modules/CitasTabla/CitasTabla";
import Dashboard from "./Modules/Dashboard/Dashboard";
import Contactanos from "./Modules/Home/Contactanos";
import Prueba from "./Modules/CMD/prueba";
import HistorialCita from "./Modules/CitasTabla/HistorialCita";
import Examenes from "./Modules/Examenes/Examenes";

import PruebaRecetas from "./Modules/Recetas/PruebaRecetas";
import PagoPrueba1 from "./Modules/PayPal/PayPalCheckOut"
import Checkout from "./Modules/PayPal/Checkout"
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function App() {
  return (
    <PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/iniciarsesion" element={<IniciarSesion />} />
            <Route path="/acerca-de" element={<Acercade />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/laboratorio" element={<Laboratorio />} />
            <Route path="/registrar-user" element={<RegistrarUser />} />
            <Route path="/citas" element={<Citas />} />
            <Route path="/Prueba" element={<Prueba />} />
            <Route path="/administrador" element={<Administrador />} />
            <Route path="/expedientes" element={<Expedientes />} />
            <Route path="/expedientes/dashboard/:expedienteId" element={<Dashboard />} />
            <Route path="/medicamentos" element={<Medicamentos />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/contactanos" element={<Contactanos />} />
            <Route path="/userpage" element={<LandingPage />} />
            <Route path="/citas_tabla" element={<CitasTabla />} />
            <Route path="//citas_tabla/citas_expedientes" element={<Citas_Doc />} />
            <Route path="/citas_tabla/historial_cita" element={<HistorialCita />} />
            <Route path="/examenes" element={<Examenes />} />
            <Route path="/laboratorio" element={<Laboratorio />} />

            <Route path="/prueba-recetas" element={<PruebaRecetas />} />
            {/* <Route path="/PagoPrueba1" element={<PagoPrueba1 />} /> */}
            <Route path="/checkout" element={<Checkout />} />

            <Route path="*" element={<p>No encontramos lo que buscas D:</p>} />
          </Routes>
        </BrowserRouter>
      </div>
    </PayPalScriptProvider>
  );
}

export default App;