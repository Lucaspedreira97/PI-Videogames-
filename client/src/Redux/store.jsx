import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";// esto es para que el front pueda realizar pedidos asincronos, sin esto no puede
import reducer from "./reducer";
// Una vez creada la store tengo que encerrar la aplicacion en el <provider/> (index)

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;