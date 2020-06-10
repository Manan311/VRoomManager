import React, { Component } from "react";
import Header from "./Header";
import Navigation from "./Navigation";
import "./style.css";

class Home extends Component {
  constructor(props){
    super(props);
  }
  
  render() {
    return (
      <div>
        <div className="hed">
          <Header />
        </div>
        <div className="nnn">
          <Navigation />
        </div>
        <br />
        <div className="home">
            <a
            className="home-link"
              href="https://shrouded-shelf-91192.herokuapp.com/api/cars"
              target="blank"
            >
              Web API
            </a>
            <ul>
              Paths:
              <ul>
                <li>
                <b>GetAll:</b> "/api/cars"
                </li>
                <li>
                <b>GetOne:</b> "/api/cars/:carId"
                </li>
                <li>
                <b>Add:</b> "/api/cars"
                </li>
                <li>
                <b>Edit:</b> "/api/cars/:carId"
                </li>
                <li>
                <b>Delete:</b> "/api/cars/:carId"
                </li>
              </ul>
            </ul>
            <a 
            className="home-link"
            href="https://thawing-sands-24683.herokuapp.com/cars"
            target="blank">
              ReactApp
            </a>
            <ul>
              Paths:
              <ul>
              <li>
                <b>GetAll:</b> "/cars"
                </li>
                <li>
                <b>GetOne:</b> "/cars/detail/:id"
                </li>
                <li>
                <b>Add:</b> "/cars/add"
                </li>
                <li>
                <b>Edit:</b> "/cars/edit/:id"
                </li>
                <li>
                <b>Delete:</b> "/cars/delete/:id"
                </li>
              </ul>
            </ul>
        </div>
      </div>
    );
  }
}

export default Home;
