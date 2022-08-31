import React from "react";
import "../styles/Card.css";
//Carta del game
// puedo recibir las props y pasar props.name..., desestructurar (es6)en forma de objeto y devolver directamente la propiedad name.

export default function GameCard({ name, background_image, genres, rating }) {
  return (
    <div class="card">
      <div class="card__content">
        <div class="card__content-heading">
          <div>
          <h1 className="h1Card">{name}</h1>
          </div>
          <br/>
          <img src={background_image} alt="otro" />
        </div>
        <br/>
        <div class="card__content-body">
          <ul><h2>Genres...</h2>{
            genres?.map((e)=>{
            return(
              <li>{e}</li>
              )
            })   
        }
          </ul>
          <p>Game rating: {rating}</p>
        </div>
      </div>
    </div>
  );
}
