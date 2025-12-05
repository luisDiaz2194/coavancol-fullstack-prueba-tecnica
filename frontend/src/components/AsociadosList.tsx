import { useAsociados } from '../hooks/useAsociados';

const AsociadosList = () => {

  const { asociados, loading, error } = useAsociados();  
  
  if (loading) return <p>Cargando Datos...</p>;
  if (error) return <p>Error: {error} </p> 


  return (
    <div className='Container'>
        <h2>Listado de Asociados</h2>

        <table>
            <thead>
                <th>Nombre</th>
                <th>Identificación</th>
                <th>Estado Pipeline</th>
            </thead>

            <tbody>
                {asociados.map((asociado) => {
                    return (
                        <tr key ={asociado.id}>
                        <td>{asociado.nombre}</td>
                        <td>{asociado.identificacion}</td>
                        <td>{asociado.estado_pipeline}</td>
                    </tr>
                    );   
                })}
            </tbody>
        </table>
    </div>
  )
}

export default AsociadosList