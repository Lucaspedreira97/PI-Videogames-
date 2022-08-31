import axios from "axios";
export const post = "http://localhost:3001/videogames/create";
export const backAllGames = "http://localhost:3001/videogames";
export const backendGenres = "http://localhost:3001/genres";
export const GET_ALLGAMES = "GET_ALLGAMES";
export const GET_DETAIL = "GET_DETAIL";
export const GET_BYNAME = "GET_BYNAME";
export const GET_GENRES = "GET_GENRES";
export const POST_GAMES = "POST_GAMES";
export const SORT_AZ = "SORT_AZ";
export const FILTER_GENRES = "FILTER_GENRES";
export const FILTER_DB = "FILTER_DB";
export const CLEAN_DETAIL = "CLEAN_DETAIL";

// Hago get a mi back, y devuelvo dispatch que es una funcion que devuelve un objeto en la data(payload) y el type es un nombre referencia
export function getAllGames() {
  try {
    return async function getBackend(dispatch) {
      let aux = await axios.get(backAllGames);
      return dispatch({
        type: GET_ALLGAMES,
        payload: aux.data,
      });
    };
  } catch (e) {
    console.log(e);
  }
}

export function getDetail(id) {
  return async function getDetail(dispatch) {
    let aux = await axios.get(`http://localhost:3001/videogames/${id}`);
    return dispatch({
      type: GET_DETAIL,
      payload: aux.data,
    });
  };
}

export default function getByName(name) {
  try {
    return async function (dispatch) {
      let aux = await axios.get(
        `http://localhost:3001/videogames?name=${name}`
      );
      console.log(aux.data);
      return dispatch({
        type: GET_BYNAME,
        payload: aux.data,
      });
    };
  } catch (e) {
    console.log(e);
  }
}

export function getGenres() {
  return async function getDetail(dispatch) {
    let aux = await axios.get(backendGenres);
    return dispatch({
      type: GET_GENRES,
      payload: aux.data,
    });
  };
}

export function postGames(payload) {
  return async function gamePost(dispatch) {
    let aux = await axios.post(
      "http://localhost:3001/videogames/create",
      payload
    ); //action
    return dispatch({
      type: POST_GAMES,
      payload: aux.data,
    });
  };
}

export function Sort(payload) {
  return async function SortAz(dispatch) {
    console.log("acaSort", payload);
    return dispatch({
      type: SORT_AZ,
      payload: payload,
    });
  };
}

export const filterGenres = (payload) => {
  console.log(payload, "filter genres");
  return {
    type: FILTER_GENRES,
    payload: payload,
  };
};

export const filterDb = (payload) => {
  console.log(payload, "Filter data base");
  return {
    type: FILTER_DB,
    payload: payload,
  };
};

export const cleanDetail = (payload) => {
  return {
    type: CLEAN_DETAIL,
    payload: payload,
  };
};
