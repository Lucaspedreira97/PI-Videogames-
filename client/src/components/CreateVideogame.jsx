import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getGenres, postGames} from "../Redux/actions"
import { Link } from "react-router-dom";
import "../styles/Create.css"
import Nav from "./Nav"

export default function CreateGame() {
  const dispatch = useDispatch()
  const platforms = ['PC', 'PlayStation 5', 'Xbox One', 'PlayStation 4', 'Xbox Series S/X', 'Nintendo Switch', 'iOS', 'Android', 'Nintendo 3DS', 'Nintendo DS', 'Nintendo DSi', 'macOS']
  const [games, setGames] = useState({
    name: "",
    description: "",
    reldate: "",
    rating: "3",
    platform: [],
    genre: [],
    webSite:""
  });

  const [errorForm, setErrorForm] = useState({})
  const [errorButton, setErrorButton] = useState(false)
   
  const handleChange = function (e) {
    setGames({
      ...games,
      [e.target.name]: e.target.value,
    });
    setErrorForm(validation(games))
    setErrorButton(Object.keys(errorForm).length < 1 ? false : true)
    console.log(games)
  };
  
  const handleGenre = function (e) {
    setGames({
      ...games,
      // genre: [new Set([...games.genre, e.target.value])]
      genre: [...games.genre, e.target.value]
    });      
  };
  
  const handlePlataform = function (e) {
    if(games.platform.indexOf(e.target.value) === -1){
      setGames({
        ...games,
        // platform: [new Set([...games.platform, e.target.value])]
        platform: [...games.platform, e.target.value]
      });      
    } else {
      return games
    }
  };
  
  const validation = function (data) {
    let error = {}
    if(validationDescription(data.description)) error.description ="Invalid description"
    if(validationName(data.name)) error.name = "Invalid name"
    return error // si este objeto tiene errores quiere decir que hay errores en el form
  }

  const validationName = function (str) {
    if(typeof str !== "string") return true;
    if(str.length < 3 || str.length > 10) return true
  }

  const validationDescription = function (str) {
    if(typeof str !== "string") return true;
    if(str.length < 10 || str.length > 300) return true
  }
  
  async function handleSubmit (e) {
   e.preventDefault()
   setErrorForm(validation(games))
   dispatch(postGames(games))
   alert("Game created")
   setGames({
      name: "",
    description: "",
    reldate: "",
    rating: "3",
    platform: [],
    genre: [],
    webSite:""
    })
  };
  
  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);
  const estadoGenres = useSelector((state) => state.genres);
  console.log(games);

  return (
    <div className="containerCreate">
     <div className="linkHomeCreate"> 
         <Link to="/home">
          <button className="btnPaginado">Go Home!</button>
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          
          {/* //        ------name------ */}
          <label>Name</label>
          <div>
             <input className="createInput" 
            name="name"
            value={games.name}
            onChange={handleChange}>
            </input>
          {errorForm.name ? <h4><small>{errorForm.name}</small></h4>: false}
          </div>
          {/* //----Description */}
          <label>Description</label>
          <div>
             <input className="createInput" 
            name="description"
            value={games.description}
            onChange={handleChange}>
            </input>
            {errorForm.description ? <h4><small>{errorForm.description}</small></h4>: false}
          </div>

          {/* //       -----height_min---- */}
          <label>Reldate</label>
          <div>
             <input type="date" className="createInput"
            name="reldate"
            value={games.reldate}
            onChange={handleChange}
          ></input>
          </div>
         
          {/* //       -----weight_max---- */}
          <label>Rating</label>
          <div>
            <input type="range"  min="1" max="5" className="createInput"
            name="rating"
            value={games.rating}
            onChange={handleChange}
          ></input>
          </div>
          <label>Web Site</label>
          <div>
            <input className="createInput"
            name="webSite"
            value={games.webSite}
            onChange={handleChange}
          ></input>
          </div>

          {/* //       -----genres---- */}
          </div>
          <label>Genre </label>
        <select className="select-css" onChange={handleGenre}>
        {
            estadoGenres.map(c => (
             <option value={c.name}
              key={c.id}>{c.name}</option>))
          }
        </select>
        <div>

          {/* //       -----plataforms---- */}
        </div>
        <label>Plataforms </label>
        <select className="select-css" onChange={handlePlataform}>
        {
            platforms?.map((e)=>{
            return(
              <option value={e}>{e}</option>
              )
            })   
        }
       </select>
         {/* submit */}
        <div>
          <button className="btnPaginado"
           type="submit" 
           disabled={errorButton}>
            CREATE GAME
          </button>
        </div>
      </form>
    </div>
  );
}

