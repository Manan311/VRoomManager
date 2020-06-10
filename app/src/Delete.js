import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Header from "./Header";
import Navigation from "./Navigation";

class Delete extends Component {
  //web api
  url = `https://shrouded-shelf-91192.herokuapp.com/api/cars/${this.props.id}`;
  // url = `http://localhost:8080/api/cars/${this.props.id}`;

  state = {
    car_make: [],
    car_model: [],
    car_year: [],
    vin_: [],
    msrp_: [],
    photo_: [],
    color_: [],
    convertable_: [],
    purchase_date: [],
    purchasers_name: [],
    purchasers_email: [],
    price_paid: [],
    redirect: false,
  };

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // Get one
    fetch(this.url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 404) {
          throw Error("HTTP 404, Not found");
        } else {
          throw Error(`HTTP ${response.status}, ${response.statusText}`);
        }
      })
      .then((responseData) => {
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
          price_paid: responseData.price_paid,
        });
        console.log(responseData.data.toString());
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleSubmit(e) {
    // Delete
    fetch(this.url, { method: "DELETE" })
      .then((response) => {
        // alert("response 1");
        if (response.ok) {
          // alert("response 1 if 1");
          return response.json();
        } else if (response.status >= 400 && response.status < 500) {
          // alert("response 1 if 2");
          throw Error(`HTTP ${response.status}, ${response.statusText}`);
        } else {
          // alert("response 1 if 3");
          throw Error(`HTTP ${response.status}, ${response.statusText}`);
        }
      })
      .then((responseData) => {
        // alert("response 3");
        console.log(responseData);
        setTimeout(() => {
              this.props.history.push("/cars");
            }, 3000);
      })
      .catch((error) => {
        // alert("response 3");
        console.log(error);
      });
  }

  render() {
    let convertableValid;
    if (this.state.convertable_){
      convertableValid = <p type="text">{this.state.convertable_.toString()}</p>
    }else{
      convertableValid = <p type="text"></p>
    }
    
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

            <table>
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
                {convertableValid}
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
              <tr className="edit-trr extra-margin-top">
                <td className="edit-trr"></td>
                <td className="edit-trr">
              <Link to={`/cars`}>
                <button onClick={this.handleSubmit} className="getOne-btn getAll-btn-delete">
                  Delete
                </button>
              </Link>
              &nbsp;&nbsp;
              <Link to={`/cars`}>
                <button className="getOne-btn getAll-btn-detail">Cancel</button>
              </Link>
              </td>
              </tr>
            </table>
          </div>
        </div>
      );
  }
}

export default Delete;
