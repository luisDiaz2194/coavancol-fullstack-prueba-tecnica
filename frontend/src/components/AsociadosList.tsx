import { useAsociados } from '../hooks/useAsociados';
import SelectFiltro from './SelectFiltro';
import React, { useState } from 'react';
const AsociadosList = () => {

  const { asociados, loading, error } = useAsociados();  
  const [filtro, setFiltro] = useState("Todos");

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setFiltro(e.target.value);
  };
   // FILTRAR ASOCIADOS SEGÚN EL SELECT
  const asociadosFiltrados =
    filtro === "Todos"
      ? asociados
      : asociados.filter((a) => a.estado_pipeline === filtro);
  
      if (loading) return <p>Cargando Datos...</p>;
      if (error) return <p>Error: {error} </p> 

  return (
    <div className='Container'>
        <h2>Listado de Asociados</h2>

       <SelectFiltro value={filtro} handleSelectChange={handleSelectChange} />
        {asociadosFiltrados.length === 0 ? (
            <p>No hay asociados disponibles</p>
        ): (
            <table border={1} cellPadding={8} style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Identificación</th>
                                <th>Estado Pipeline</th>
                            </tr>
                        </thead>
                        <tbody>
                            {asociadosFiltrados.map((asociado) => {
                                return (
                                    <tr key ={asociado.id}>
                                    <td>{asociado.Nombre}</td>
                                    <td>{asociado.Identificación}</td>
                                    <td>{asociado.estado_pipeline}</td>
                                </tr>
                                );   
                            })}
                        </tbody>
                    </table>
                    )}    
                    
         </div>
  )
}

export default AsociadosList