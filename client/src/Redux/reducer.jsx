import sortFilter from "../Functions.jsx/Sorts.js";
//Desde el reducer voy a llamar a la action para que se ejecute, el reducer recibe un estado inicial y envia la action a renderizar.
import {
  GET_ALLGAMES,
  GET_DETAIL,
  GET_BYNAME,
  GET_GENRES,
  POST_GAMES,
  SORT_AZ,
  FILTER_GENRES,
  FILTER_DB,
  CLEAN_DETAIL
} from "./actions.jsx";
const initialState = {
  games: [], // Cards pide este estado
  genres: [],
  detail: {},
  allgames: [],
};

// el reducer se fija el tipo de action y en el caso de que sea GET_ALLDOGS, la ejecuta
export default function rootReducer(state = initialState, { type, payload }) {
  const auxAllGames = state.allgames;
  switch (type) {
    case GET_ALLGAMES:
      return {
        ...state,
        games: payload, // guarda el estado=[]+lo que traiga.
        allgames: payload, // copia del estado con todos los games
      };
    case GET_DETAIL:
      let detail1 = payload[0] ? payload[0] : payload;
      return {
        ...state,
        detail: detail1,
      };
    case GET_BYNAME:
      return {
        ...state,
        games: payload,
      };
    case GET_GENRES:
      return {
        ...state,
        genres: payload,
      };
    case POST_GAMES:
      return {
        ...state,
        games: [...state.games, payload],
      };
    case SORT_AZ:
      return {
        ...state,
        games: sortFilter(state.allgames, payload).map((e) => e),
      };
    case FILTER_GENRES:
        const genrefilter = auxAllGames?.filter(e => e.genres.includes(payload))
        if (genrefilter.length === 0) {
            alert(`No videogames found for ${payload} genre`)
            return state
        } else {
            return {
               ...state,
               games: genrefilter 
           }
       };
    case FILTER_DB:
        const dbFilter = auxAllGames?.filter((e) => e.createdInDb === true); // filtro y si tiene la propiedad createdInDb del model en true es de db
        const apiFilter = auxAllGames?.filter((e) => !e.createdInDb === true);
        return {
          ...state,
          games: payload === "createdInDb" ? dbFilter : apiFilter
        };
    case CLEAN_DETAIL:
          return {
            ...state,
            detail: payload,
          };
    default:
      return state;
  }
}
