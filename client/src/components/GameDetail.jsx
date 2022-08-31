import React, { useEffect } from "react";
import { getDetail, cleanDetail } from "../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "../styles/GameDetail.css";
import { Link } from "react-router-dom";

export default function GetDetail() {
  const dispatch = useDispatch();
  const { name, background_image, genres, description, rating, platform, webSite } =
    useSelector((state) => state.detail);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetail(id));
    return () => {
      dispatch(cleanDetail({}));
    };
  }, [id, dispatch]);

  return (
    // esto es lo que se renderiza
    <div className="DetailContainer">
      <div>
        <div>
          <Link to="/home">
            <button className="btnDetailHome">Go Home!</button>
          </Link>
        </div>
      </div>
      {name ? (
        <div>
          <div className="DetailCard">
            <h1 className="h1Card">{name}</h1>
            <br />
            <div>
              <img src={background_image} alt="otro" />
            </div>
            <div>
              <br />
              <ul>
                <h2>Genres...</h2>
                {genres?.map((e) => {
                  return <li>{e.name}</li>;
                })}
              </ul>
              <br />
              <p>{description}</p>
              <br />
              <p>Game rating {rating}</p>
              <br/>
              <p>Web Site {webSite}</p>
              <br />
              <ul>
                <h2>Available plataforms...</h2>
                {platform?.map((e) => {
                  return <li>{e}</li>;
                })}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div class="loader">
          <div id="first">
            <div id="second">
              <div id="third"></div>
            </div>
          </div>
        </div>
      )}
      <div>
        <Link to="/create">
          <button className="btnDetailCreate">Create new game!</button>
        </Link>
      </div>
    </div>
  );
}
