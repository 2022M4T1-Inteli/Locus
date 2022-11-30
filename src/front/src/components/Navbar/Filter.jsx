import "./Filter.css"

export function Filter(){
    return(
    <div className="justify">
        <select name="Filtrar por: ">
            <option value="laboratorios">Laboratórios</option>
            <option value="equipamentos">Equipamentos A - Z</option>
        </select>
    </div>
    )
}