import React from "react";
import { Link } from "react-router-dom";
import "../styles/LandingPage.css"

export default function LandingPage(){
    return( 
        <div className="conatinerLanding">
            <Link to="/home"> 
            <button className="buttonLanding">
                Welcome Games-World
            </button>
            </Link>
      </div>   
      )
    
}