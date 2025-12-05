interface Props {
    value: string;
    handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectFiltro = ({ value, handleSelectChange }: Props) => {
  return (
     <select value={value}
        onChange={handleSelectChange}>
            <option value={"Todos"}>Todos</option>
            <option value="Prospecto">Prospecto</option>
            <option value="Expediente en Construcción">Expediente en Construcción</option>
            <option value="Pendiente Jurídico">Pendiente Jurídico</option>
            <option value="Pendiente Cierre de Crédito">Pendiente Cierre de Crédito</option>
    </select>
  )
}

export default SelectFiltro