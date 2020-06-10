import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form, Dropdown } from "semantic-ui-react";
import Header from "./Header";
import Navigation from "./Navigation";

class Add extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //web api
   url = `https://shrouded-shelf-91192.herokuapp.com/api/cars`;
  // url = "http://localhost:8080/api/cars";

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

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(e) {
    // alert(this.state.convertable_);
    const newCar = {
      car_make: this.state.car_make,
      car_model: this.state.car_model,
      car_year: this.state.car_year,
      vin_: this.state.vin_,
      msrp_: this.state.msrp_,
      photo_: this.state.photo_,
      color_: this.state.color_,
      convertable_: this.state.convertable_,
      purchase_date: "",
      purchasers_name: "",
      purchasers_email: "",
      price_paid: null
    };

    // add new
    fetch(this.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCar)
    })
      .then(response => {
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
      .then(responseData => {
        // alert("response 2");
        console.log(responseData);
        console.log(responseData._id);
        this.props.history.push(`/cars/detail/${responseData._id}`);
      })
      .catch(error => {
        // alert("response 3");
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

        <div className="add-content">
          <h3>Add New Car {this.props.id}</h3>
          <Form onSubmit={this.handleSubmit}>
            <tbody>
              <tr>
                <td className="add-left">
                  <label className="carmake">Car Make:</label>
                </td>
                <td className="add-right">
                  <input
                    type="text"
                    name="car_make"
                    className="add-innput"
                    value={this.state.car_make}
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
              <br />
              <tr>
                <td className="add-left">
                  <label className="carmodel">Car Model:</label>
                </td>
                <td className="add-right">
                  <input
                    type="text"
                    name="car_model"
                    className="add-innput"
                    value={this.state.car_model}
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
              <br />
              <tr>
                <td className="add-left">
                  <label className="caryear">Car Year:</label>
                </td>
                <td className="add-right">
                  <input
                    type="text"
                    name="car_year"
                    className="add-innput"
                    value={this.state.car_year}
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
              <br />
              <tr>
                <td className="add-left">
                  <label className="VIN">VIN:</label>
                </td>
                <td className="add-right">
                  <input
                    type="text"
                    name="vin_"
                    className="add-innput"
                    value={this.state.vin_}
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
              <br />
              <tr>
                <td className="add-left">
                  <label className="caryear">MSRP:</label>
                </td>
                <td className="add-right">
                  <input
                    type="text"
                    name="msrp_"
                    className="add-innput"
                    value={this.state.msrp_}
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
              <br />
              <tr>
                <td className="add-left">
                  <label className="photo">Photo:</label>
                </td>
                <td className="add-right">
                  <input
                    type="text"
                    name="photo_"
                    className="add-innput"
                    value={this.state.photo_}
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
              <br />
              <tr>
                <td className="add-left">
                  <label className="color">Color:</label>
                </td>
                <td className="add-right">
                  <input
                    type="text"
                    name="color_"
                    className="add-innput"
                    value={this.state.color_}
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
              <br />
              <tr>
                <td className="add-left">
                  <label className="convertable">Convertable:</label>
                </td>
                {/* <td className="add-right">
                  <select>
                    <option
                      onChange={this.handleChange}
                      value="False"
                      name="convertable_"
                      selected
                    >
                      False
                    </option>
                    <option
                      onChange={this.handleChange}
                      value="True"
                      name="convertable_"
                    >
                      True
                    </option>
                  </select>
                </td> */}
                <td className="add-right">
                  <input
                    type="dd"
                    name="convertable_"
                    className="add-innput"
                    value={this.state.convertable_}
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
              <tr className="white">
                <td className="add-b"></td>
                <td className="add-b">
                  <br />
                  <input className="add-bs" type="submit" value="Submit" />
                  {/* <input className="add-bc" type="button" value="Cancel" /> */}
                  <Link to={`/cars`}>
                    <button className="add-bc">Cancel</button>
                  </Link>
                </td>
              </tr>
            </tbody>
          </Form>
        </div>
      </div>
    );
  }
}

export default Add;
