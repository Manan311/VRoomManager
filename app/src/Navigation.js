import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.css";

class Navigation extends Component {
  constructor(props){
    super(props);
  }
  
  render() {
    return (
      <div className="topnav">
        <div className="topnavoption">
          <Link className="active" to="/">
            Home
          </Link>
        </div>
        <div className="topnavoption">
          <Link to="/cars">All Cars</Link>
        </div>
        <div className="topnavoption">
          <Link to="/cars/add">Add New Car</Link>
        </div>
      </div>
    );
  }
}

export default Navigation;
