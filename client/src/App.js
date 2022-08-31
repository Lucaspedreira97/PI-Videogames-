import './styles/App.css';
import React from "react"
import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage"
import Home from './components/Home';
import GameDetail from "./components/GameDetail";
import CreateVideogame from './components/CreateVideogame';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <Route exact path = '/' component={LandingPage}/>
        <Route exact path = '/home' component={Home}/>
        <Route path = '/home/:id' component={GameDetail}/>
        <Route path = '/create' component={CreateVideogame}/>
      </BrowserRouter>
    </div>
  );
}
export default App;
