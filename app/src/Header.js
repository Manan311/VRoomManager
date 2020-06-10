import React, { Component } from "react";
import "./style.css";

class Header extends Component {
  constructor(props){
    super(props);
  }
  
  render() {
    return (
      <div className="header">
        <div className="ttl">
          <h1 className="header-h1">VRoomManager</h1>
          {/* <h4 className="header-h4">Manan Patel</h4> */}
        </div>
        <p>
        VRoomManager is a react app that interacts with the web API to manage and store car data for dealerships in MongoDB.
        </p>
      </div>
    );
  }
}

export default Header;
