import React, { useState } from 'react';
import Services from '../../Services/id_cmdService';
import text_Services from '../../Services/texto_cmdService';
const Prueba = () => {
  // Estados para almacenar los valores de los inputs
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [input4, setInput4] = useState('');

  // Funciones para manejar los cambios en los inputs
  const handleInput1Change = (event) => {
    setInput1(event.target.value);
  };

  const handleInput2Change = (event) => {
    setInput2(event.target.value);
  };

  const handleInput3Change = (event) => {
    setInput3(event.target.value);
  };

  const handleInput4Change = (event) => {
    setInput4(event.target.value);
  };

  // Funciones para manejar los clicks en los botones
  const handleAccept1 = async () => {
    // Lógica para traer toda la tabla de id_cmd
   /* const probando1 = await Services.getAllId_cmd();
    */

    //lógica para traer un texto
    const variable=['WHA'];
   
    const probando1_1 = await text_Services.getOneText(variable);
    
  };

  const handleAccept2 =async() => {
    // Lógica editar id_cmd
   /* var nuevaCMD = ['WHA1','WHA']
    const probando2 = await Services.editId_cmd(nuevaCMD);
    const probando2_1 = await Services.getAllId_cmd();
    */

    // Lógica editar texto_cmd
    var nuevaCMD = ['+504 3342-4985','WHA']
    const probando2 = await text_Services.editText(nuevaCMD);
    const probando2_1 = await text_Services.getAll_Text();
    console.log(probando2_1)
  };
  

  const handleAccept3 = async () => {
    // Lógica Eliminar id_cmd
  /*  const variable='WHA';
    const probando3 = await Services.deleteId_cmd(variable);
    const probando3_1 = await Services.getAllId_cmd();
    
    
    */
    // Lógica Eliminar textos_cmd
    const variable='WHA';
    const probando3 = await text_Services.deleteText(variable);
    const probando3_1 = await text_Services.getAll_Text();
    
    
  };

  const handleAccept4 = async () => {
    // Lógica para el agregar id_cmd
       /* var nuevaCMD2 = ['WHA']
    const probando4 = await Services.postId_cmd(nuevaCMD2);
    const probando4_1 = await Services.getAllId_cmd();
    
    

    */
    // Lógica para el agregar texto_cmd

    var nuevaCMD2 = ['WHA','+504 3342-4985']
    const probando4 = await text_Services.postText(nuevaCMD2);
    const probando4_1 = await text_Services.getAll_Text();
    
    
  };

  return (
    <div>
      <input type="text" value={input1} onChange={handleInput1Change} />
      <button onClick={handleAccept1}>Aceptar</button>

      <br />

      <input type="text" value={input2} onChange={handleInput2Change} />
      <button onClick={handleAccept2}>Aceptar</button>

      <br />

      <input type="text" value={input3} onChange={handleInput3Change} />
      <button onClick={handleAccept3}>Aceptar</button>

      <br />

      <input type="text" value={input4} onChange={handleInput4Change} />
      <button onClick={handleAccept4}>Aceptar</button>
    </div>
  );
};

export default Prueba;
