import { useEffect, useState } from "react";

/*INTERFACE ASOCIADOS*/
interface Asociado {
    id: string;
    nombre: string;
    identificacion: string;
    estado_pipeline: string;
    [key: string] : any; // Permite propiedades adicionales de cualquier tipo sin romper la estructura de la interface
}

export function useAsociados() {
    const [asociados, setAsociados] = useState<Asociado[]>([]); // Estado para almacenar la lista de asociados, tipo arreglo Asociado[] - valor inicial []
    const [loading, setLoading] = useState<boolean>(true); // Estado para manejar la carga de datos
    const [error, setError] = useState<string | null>(null); // Estado para manejar errores en la obtención de datos

    useEffect(() => {
        async function fectData() {
             try {
            const response = await fetch('https://raw.githubusercontent.com/managerrojo/COAVANCOL-Prueba-T-cnica-/refs/heads/main/IndexAsociados');

            if (!response.ok) throw new Error('No se pudo obtener la información');
            
            const data: Asociado[] = await response.json();

            const ordenadosAsociados = data.sort((a, b) =>
                (a.nombre ?? "").localeCompare(b.nombre ?? "")
            );

            setAsociados(ordenadosAsociados);
           
        } catch (err: unknown){
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Error Desconocido');
            }
        } finally {
            setLoading(false);
        }
        }
        fectData(); // Llamamos a la función para obtener los datos al montar el componente.
    }, []); // aseguramos que el effect se ejecute solo una vez al montar el componente.

    return { asociados, loading, error }; // Retornamos los estados para ser utilizados en el componente que use este hook personalizado 
}