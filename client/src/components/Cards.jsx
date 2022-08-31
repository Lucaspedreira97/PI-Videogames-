import React, { useState } from "react";
import GameCard from "./VideogameCard";
import { Paginacion } from "./Paginacion";
import "../styles/Cards.css";
import { Link } from "react-router-dom";

export default function Cards({ allGames, pagina, porPagina, setPagina }) {
const maximo = allGames.length / porPagina;

  return (
    <div>
      <div className="Cards">
        {allGames
          .slice((pagina - 1) * porPagina, (pagina - 1) * porPagina + porPagina)
          .map((e, i) => (
            <Link to={`/home/${e.id}`}>
              <GameCard
                key={e.id}
                name={e.name}
                background_image={e.background_image}
                genres={e.genres}
                rating={e.rating}
                platform={e.platform}
              />
            </Link>
          ))}
      </div>
        <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo} />
    </div>
  );
}
