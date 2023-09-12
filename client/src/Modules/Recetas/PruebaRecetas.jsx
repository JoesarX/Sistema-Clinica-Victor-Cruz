import React, { useState, useEffect } from 'react';


import RecetasService from '../../Services/RecetasService';
import FacturasService from '../../Services/FacturasService';
import Services from '../../Services/PreciosService';
const PrescriptionManagement = () => {
    const [recetas, setRecetas] = useState([]);
    const citaId = 504; // Replace with the desired cita_id

    const getRecetasByCita = async () => {
        try {
            const recetasProvisional = await RecetasService.getRecetasByCita(citaId)
            setRecetas(recetasProvisional);
            

        } catch (error) {
            console.error('Error fetching recetas:', error);
        }
    };

    const postRecetasByCita = async () => {
        /*  const listaRecetas = {
              recetasLista: [
                  {
                      "nombre_medicamento": "Prueba en vivo 1",
                      "dosis": "uwu",
                      "cant_dias": 11,
                      "frequencia_horas": 1,
                      "cant_unidades": null,
                      "notas_adicionales": "ogo"
                  },
                  {
                      "nombre_medicamento": "Prueba en vivo 2",
                      "dosis": "uwu",
                      "cant_dias": 11,
                      "frequencia_horas": 1,
                      "cant_unidades": null,
                      "notas_adicionales": "ogo"
                  },
                  {
                      "nombre_medicamento": "Prueba en vivo 3",
                      "dosis": "uwu",
                      "cant_dias": 11,
                      "frequencia_horas": 1,
                      "cant_unidades": null,
                      "notas_adicionales": "ogo"
                  },
              ]
          }
  
          try {
              console.log("Post recetas. citaId: ", citaId, "newRecetas: ", listaRecetas)
              await RecetasService.postRecetasByCita(citaId, listaRecetas);
              await getRecetasByCita()
          } catch (error) {
              console.error('Error creating prescriptions:', error);
          }*/
        // const precioValue =  {
        //         nombre_servicio : "Examen oral",
        //         precio : 500
        // };
        // await  Services.postPrecios(precioValue);
        const factura = {
            nombre_paciente: "Juan",
            isPagada: 0,
            idCita: 1884,
            total: 500,
        };
        await FacturasService.postFactura(factura);

    };

    const editRecetasByCita = async () => {
        /* const updatedRecetas = {
             recetasLista: [
                 {
                     "idreceta": recetas[0].idreceta, 
                     "nombre_medicamento": "Prueba en vivo 1 Editada",
                     "dosis": "uwu",
                     "cant_dias": 11,
                     "frequencia_horas": 1,
                     "cant_unidades": null,
                     "notas_adicionales": "ogo"
                 },
                 {
                     "idreceta": recetas[1].idreceta,
                     "nombre_medicamento": "Prueba en vivo 2",
                     "dosis": "uwu",
                     "cant_dias": 11,
                     "frequencia_horas": 1,
                     "cant_unidades": null,
                     "notas_adicionales": "ogo"
                 },
                 {
                     "idreceta": recetas[2].idreceta,
                     "nombre_medicamento": "Prueba en vivo 3 Editada",
                     "dosis": "uwu",
                     "cant_dias": 11,
                     "frequencia_horas": 1,
                     "cant_unidades": null,
                     "notas_adicionales": "ogo"
                 },
             ]
         }
 
         try {
             await RecetasService.editRecetasByCita(citaId, updatedRecetas);
             
             await getRecetasByCita();
         } catch (error) {
             console.error('Error updating prescriptions:', error);
         }*/

        // const precioValue = {
        //     id: 134,
        //     nombre_servicio: "Examen bucal",
        //     precio: 500

        // };


        // await Services.editPrecios(precioValue);


        const factura = {
            nombre_paciente: "Juan Editado",
            isPagada: 1,
            total: 999,
        };


        await FacturasService.editFacturaByCita(1884,factura);
        

    };

    const deleteRecetasByCita = async () => {
        /* try {
             await RecetasService.deleteRecetasByCita(citaId);
             
             setRecetas([]);
         } catch (error) {
             console.error('Error deleting prescriptions:', error);
         }*/

        // await Services.deletePrecios(164);

        await FacturasService.deleteFacturaByCita(1884);
    };

    useEffect(() => {
        getRecetasByCita();
    }, []);

    return (
        <div>
            <h1>Prescription Management</h1>
            <button onClick={postRecetasByCita}>Add Prescriptions</button>
            <button onClick={editRecetasByCita}>Edit Prescriptions</button>
            <button onClick={deleteRecetasByCita}>Delete Prescriptions</button>
            <ul>
                {recetas.map(receta => (
                    <li key={receta.idreceta}>
                        Medicina: {receta.nombre_medicamento}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PrescriptionManagement;
