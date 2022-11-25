import "./Filter.css"

export function Filter(){
    return(
        <div className="filterArea">
     <select name="Filtrar por:">
         <option value="laboratorios">Laboratórios</option>
         <option value="equipamentos">Equipamentos A - Z</option>
     </select>
</div>
    )
}