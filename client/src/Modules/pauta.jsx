import React from 'react';
import alergiaService from "../Services/ExpedientesAlergiasServices";
import medServices from "../Services/ExpedientesMedServices";
import enfermServices from "../Services/ExpedientesEnfermedadesServices"
function pauta() {

  const handleTraer = async () => {
    //id paciente
    let id = "1204";
    let a = await alergiaService.getAllAlergias(id);
    let m = await medServices.getAllMeds(id);
    let e = await enfermServices.getAllEnfermedades(id);

    console.log("Estas son alergias: " + a[0].id + " " + a[0].alergia);
    console.log("Estas son meds: " + m[0].id + " " + m[0].medicamento);
    console.log("Estas son enferms: " + e[0].id + " " + e[0].enfermedad);

    //deberá recorrer el arreglo que es mandado. 
  };

  const handleAgregar1 = async () => {
    //id paciente
    let id = "1204";
    //nombres campos
    let alergia = "Polvo";
    let med = "Paracetamol";
    let enferm = "anemia";
    const alergias = [id, alergia];
    const meds = [id, med];
    const enferms = [id, enferm];
    await alergiaService.postOneAlergia(alergias);
    await medServices.postOneMed(meds);
    await enfermServices.postOneEnfermedades(enferms);


  };
  const handleAgregarLista = async () => {
    let id = "1204"
    const listaRecetas = {
      recetasLista: [
        {
          "idpaciente": "1204",
          "alergia": "uwu",

        },
        {
          "idpaciente": "1204",
          "alergia": "arroz",
        },
        {
          "idpaciente": "1204",
          "alergia": "chinchllas",
        },
      ]
    }

    // da el mismo error de que no es iterable, tengo sueño y no me acuerdo como se resolvía
    await alergiaService.postAlergiaList(id, listaRecetas);
  };
  const handleEdit1 = async () => {
    //id de alergia
    let id = 4;
    let aler = "camaron"
    let alergia = [id, aler];
    await alergiaService.editOneAlergia(id, alergia);
  };
  const handleEditAll = async () => {

  };
  const handleDel1 = async () => {
    //id de alergia
    let id = 4;

    await alergiaService.deleteOneAlergia(id);
  };
  const handleDelAll = async () => {
  //id de paciente
  let idpaciente = 1204;

    await alergiaService.deleteAllAlergias(idpaciente);
  };

  return (
    <div className="pauta">
      <h1>Botones en React</h1>
      <button onClick={() => handleTraer()}>Traer Todos </button>
      <button onClick={() => handleAgregar1()}>Agregar 1</button>
      <button onClick={() => handleAgregarLista()}>Agregar Lista</button>
      <button onClick={() => handleEdit1()}>Editar uno</button>
      <button onClick={() => handleEditAll()}>Editar todos</button>
      <button onClick={() => handleDel1()}>Eliminar 1</button>
      <button onClick={() => handleDelAll()}>Eliminar todos</button>
    </div>
  );
};

export default pauta;
