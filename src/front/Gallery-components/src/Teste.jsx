export function Teste() {
  return (
    <div>
      {json.map((element)=>{
        return(
        <div>
            <h1>{element.nome}</h1>
        </div>)
      })}
    </div>
  );
}
