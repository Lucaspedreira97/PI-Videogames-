import React, { useEffect } from "react";
import "../styles/Nav.css";
import { Link } from "react-router-dom";
import Search from "./Search";
import {
  filterGenres,
  Sort,
  filterDb,
  getAllGames,
  getGenres,
} from "../Redux/actions";
import { useDispatch, useSelector } from "react-redux";

export default function Nav({setPagina}) {
  const AllGenres = useSelector((state) => state.genres);
  
  const dispatch = useDispatch();


  const handleChange = (e) => {
    e.preventDefault();
    dispatch(Sort(e.target.value));
    setPagina(1)
  };

  const handleChangeGenreDb = (e) => {
    e.target.value === "createdInDb" ||
    e.target.value === "apiFilter"
    ? dispatch(filterDb(e.target.value))
    : dispatch(filterGenres(e.target.value));
    setPagina(1)
  };

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  return (
    <div className="filters">
      <div className="navContainer">
        <input
          className="LogoNav"
          type="image"
          src="https://besthqwallpapers.com/Uploads/15-1-2020/118939/thumb2-4k-rog-violet-logo-3d-art-republic-of-gamers-metal-grid-background.jpg"
          onClick={() => dispatch(getAllGames())}
        ></input>
        <div className="ContainerSearchNav">
          <Search setPagina={setPagina}/>
        </div>
        <Link to="/create">
          <button className="btnCreateNav">Create Videogame...</button>
        </Link>
        <div>
          <select className="btnPaginado" onChange={handleChange}>
          <option hidden disabled selected value>Order by</option>
            <option value={"A-Z"}>Order A-Z</option>
            <option value={"Z-A"}>Order Z-A</option>
            <option value={"1-5"}>Order rate 1-5</option>
            <option value={"5-1"}>Order rate 5-1</option>
          </select>
          <select className="btnPaginado" onChange={(e) => handleChangeGenreDb(e)}>
          <option hidden disabled selected value>Select by</option>
            <optgroup label="Created games">
              <option value="createdInDb">Created</option>
              <option value="apiFilter">Default</option>
            </optgroup>
            <optgroup label="Genres">
              {AllGenres?.map((e, i) => {
                return (
                  <option key={i} value={e.name}>
                    {e.name}
                  </option>
                );
              })}
            </optgroup>
          </select>
        </div>
      </div>
    </div>
  );
}
