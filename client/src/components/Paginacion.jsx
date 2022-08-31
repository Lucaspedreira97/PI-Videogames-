import React, { useState } from "react";
import "../styles/Paginacion.css"

export const Paginacion = ({pagina, setPagina, maximo}) => {
   const [input, setInput] =  useState(1)
   
   const nextPage = () => {
    setInput(input + 1 )
    setPagina(pagina + 1 )
   }
   
   const previousPage = () => {
    setInput(input - 1 )
    setPagina(pagina - 1 )
   }

  return(
    <div className="containerPag"> 
      <div className="Prev">
        <button className="btnPaginado" disabled={pagina === 1 || pagina <1} onClick={previousPage}>Previous</button>
      </div>
      <div className="Next">
         <button className="btnPaginado" disabled={pagina === maximo || pagina > maximo} onClick={nextPage}>Next</button>
      </div>
    </div>
   );   
}