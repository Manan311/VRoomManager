import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Navigation from "./Navigation";
import "./style.css";

class GetOne extends Component {

  //web api
   url = `https://shrouded-shelf-91192.herokuapp.com/api/cars/${this.props.id}`;
  // url = `http://localhost:8080/api/cars/${this.props.id}`;

  state = {
    car_make: "",
    car_model: "",
    car_year: null,
    vin_: "",
    msrp_: null,
    photo_: "",
    color_: "",
    convertable_: false,
    purchase_date: "",
    purchasers_name: "",
    purchasers_email: "",
    price_paid: ""
  };

constructor(props){
    super(props);
  }

  componentDidMount() {
    // Get one
    fetch(this.url)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 404) {
          throw Error("HTTP 404, Not found");
        } else {
          throw Error(`HTTP ${response.status}, ${response.statusText}`);
        }
      })
      .then(responseData => {
        this.setState({
          car_make: responseData.car_make,
          car_model: responseData.car_model,
          car_year: responseData.car_year,
          vin_: responseData.vin_,
          msrp_: responseData.msrp_,
          photo_: responseData.photo_,
          color_: responseData.color_,
          convertable_: responseData.convertable_,
          purchase_date: responseData.purchase_date,
          purchasers_name: responseData.purchasers_name,
          purchasers_email: responseData.purchasers_email,
          price_paid: responseData.price_paid
        });
        console.log(responseData.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {

    return (
      <div>
        <div className="top">
          <div className="hed">
            <Header />
          </div>
          <div className="nnn">
            <Navigation />
          </div>
        </div>

        <div className="getOne-content">
          <h3>Details for Car {this.props.id}</h3>

          <div>
            <th className="getOne-left">
              <label>Car Make:</label>
              <br /> <label>Car Model:</label>
              <br /> <label>Car Year:</label>
              <br /> <label>VIN:</label>
              <br /> <label>MSRP:</label>
              <br /> <label>Photo:</label>
              <br /> <label>Color:</label>
              <br /> <label>Convertable:</label>
              {this.state.purchase_date ? (
                <div>
                  <label>Purchase Date:</label>
                  <br /> <label>Purchaser's Name:</label>
                  <br /> <label>Purchaser's Email:</label>
                  <br /> <label>Purchase Price:</label>
                </div>
              ) : (
                <br />
              )}
            </th>
            <th className="getOne-right">
              <p type="text">{this.state.car_make}</p>
              <p type="text">{this.state.car_model}</p>
              <p type="text">{this.state.car_year}</p>
              <p type="text">{this.state.vin_}</p>
              <p type="text">{this.state.msrp_}</p>
              <p type="text">{this.state.photo_}</p>
              <p type="text">{this.state.color_}</p>
              <p type="text">{this.state.convertable_.toString()}</p>
              {this.state.purchase_date ? (
                <div>
                  <p type="text">{this.state.purchase_date}</p>
                  <p type="text">{this.state.purchasers_name}</p>
                  <p type="text">{this.state.purchasers_email}</p>
                  <p type="text">{this.state.price_paid}</p>
                </div>
              ) : (
                <br />
              )}
            </th>
            <br />
            <br />
            <br />
            <Link to={`/cars`}>
              <button className="getOne-btn getAll-btn-detail">Back</button>
            </Link>
            <Link to={`/cars/edit/${this.props.id}`}>
              <button className="getOne-btn getAll-btn-edit">Edit</button>
            </Link>
            &nbsp;&nbsp;
            <Link to={`/cars/delete/${this.props.id}`}>
              <button className="getOne-btn getAll-btn-delete">Delete</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default GetOne;
