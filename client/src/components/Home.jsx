import React, { useEffect, useState } from "react";
import Cards from "./Cards.jsx";
import Nav from "../components/Nav";
import "../styles/Home.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllGames } from "../Redux/actions";

export default function Home() {
  let allGames = useSelector((state) => state.games);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllGames());
  }, [dispatch]);

  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(15);


  return (
    <div className="container">
      <Nav setPagina={setPagina} />
      <div className="Cards">
        {allGames.length === 0 ? 
          <div class="loader">
            <div id="first">
              <div id="second">
                <div id="third"></div>
              </div>
            </div>
          </div>
          : 
          <Cards allGames={allGames} pagina={pagina} setPagina={setPagina} porPagina={porPagina} />
        }
      </div>
    </div>
  );
}
