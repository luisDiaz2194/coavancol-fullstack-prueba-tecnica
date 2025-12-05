import { useAsociados } from '../hooks/useAsociados';

const AsociadosList = () => {

  const { asociados, loading, error } = useAsociados();  
  
  if (loading) return <p>Cargando Datos...</p>;
  if (error) return <p>Error: {error} </p> 


  return (
    <div className='Container'>
        <h2>Listado de Asociados</h2>

        <table border={1} cellPadding={8} style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
                <th>Nombre</th>
                <th>Identificación</th>
                <th>Estado Pipeline</th>
            </thead>

            <tbody>
                {asociados.map((asociado) => {
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
    </div>
  )
}

export default AsociadosList