import React, { Component } from "react";
import { Link } from "react-router-dom";

class Footer extends Component {
  render() {
    return (
      <div>
        <Link to="/header">Header</Link>
        <div>Footer</div>
      </div>
    );
  }
}

export default Footer;
