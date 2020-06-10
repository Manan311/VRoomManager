import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form } from "semantic-ui-react";
import Header from "./Header";
import Navigation from "./Navigation";
import "./style.css";

function validateDate(date) {
  let regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
  if (!regex.test(date)) {
    return false;
  }
  return true;
}

function validateName(name) {
  let regex = /^[A-Za-z]+$/;
  if (!regex.test(name)) {
    return false;
  }
  return true;
}

function validateEmail(email) {
  let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!regex.test(email)) {
    return false;
  }
  return true;
}

function validatePrice(price) {
  let regex = /^\d+(?:\.\d{0,2})$/;
  if (!regex.test(price)) {
    return false;
  }
  return true;
}

class Edit extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

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
    // httpStatusCode: 0,
    // httpStatusOk: false
  };

  componentDidMount() {
    // get one
    fetch(this.url)
      .then((response) => {
        this.setState({
          httpStatusCode: response.status,
          httpStatusOk: response.ok,
        });
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
        console.log(responseData.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(e) {
    const editedCar = {
      _id: this.props.id,
      car_make: this.state.car_make,
      car_model: this.state.car_model,
      car_year: this.state.car_year,
      vin_: this.state.vin_,
      msrp_: this.state.msrp_,
      photo_: this.state.photo_,
      color_: this.state.color_,
      convertable_: this.state.convertable_,
      purchase_date: this.state.purchase_date,
      purchasers_name: this.state.purchasers_name,
      purchasers_email: this.state.purchasers_email,
      price_paid: this.state.price_paid,
    };

    if (
      validateDate(this.state.purchase_date) &&
      validateName(this.state.purchasers_name) &&
      validateEmail(this.state.purchasers_email) &&
      validatePrice(this.state.price_paid)
    ) {
      // Edit existing
      fetch(this.url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedCar),
      })
        .then((response) => {
          // alert("response 1");
          if (response.ok) {
            // alert("response 1 of 1");
            return response.json();
          } else if (response.status >= 400 && response.status < 500) {
            // alert("response 1 of 2");
            throw Error(`HTTP ${response.status}, ${response.statusText}`);
          } else {
            // alert("response 1 of 3");
            throw Error(`HTTP ${response.status}, ${response.statusText}`);
          }
        })
        .then((responseData) => {
          // alert("response 2");
          console.log(this.props.id);
          setTimeout(() => {
            this.props.history.push(`/cars/detail/${this.props.id}`);
          }, 1000);
        })
        .catch((error) => {
          // alert("response 3");
          console.log(error);
        });
    } else {
      alert("Invalid Input");
    }
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
          <h3>Edit Car {this.props.id}</h3>
          <Form onSubmit={this.handleSubmit}>
            <tbody>
              <tr>
                <td className="add-left">
                  <label className="carmake">Car Make:</label>
                </td>
                <td className="add-right">
                  <input
                    disabled
                    type="text"
                    name="car_make"
                    className="add-innput"
                    value={this.state.car_make}
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
                    disabled
                    type="text"
                    name="carModel_"
                    className="add-innput"
                    value={this.state.car_model}
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
                    disabled
                    type="text"
                    name="carYear_"
                    className="add-innput"
                    value={this.state.car_year}
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
                    disabled
                    type="text"
                    name="vin_"
                    className="add-innput"
                    value={this.state.vin_}
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
                    disabled
                    type="text"
                    name="msrp_"
                    className="add-innput"
                    value={this.state.msrp_}
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
                    disabled
                    type="text"
                    name="photo_"
                    className="add-innput"
                    value={this.state.photo_}
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
                    disabled
                    type="text"
                    name="color_"
                    className="add-innput"
                    value={this.state.color_}
                  />
                </td>
              </tr>
              <br />
              <tr>
                <td className="add-left">
                  <label className="convertable">Convertable:</label>
                </td>
                <td className="add-right">
                  <input
                    disabled
                    type="text"
                    name="convertable_"
                    className="add-innput"
                    value={this.state.convertable_}
                  />
                </td>
              </tr>
              <br />
              <tr>
                <td className="add-left">
                  <label className="purchasedate">Purchase Date:</label>
                </td>
                <td className="add-right">
                  <input
                    type="text"
                    name="purchase_date"
                    className="add-innput"
                    value={this.state.purchase_date}
                    onChange={this.handleChange}
                  />
                </td>
                <td>
                  <label className="edit-dExample"> (mm/dd/yyyy)</label>
                </td>
              </tr>
              <br />
              <tr>
                <td className="add-left">
                  <label className="purchasersname">Purchasers Name:</label>
                </td>
                <td className="add-right">
                  <input
                    type="text"
                    name="purchasers_name"
                    className="add-innput"
                    value={this.state.purchasers_name}
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
              <br />
              <tr>
                <td className="add-left">
                  <label className="purchasersemail">Purchasers Email:</label>
                </td>
                <td className="add-right">
                  <input
                    type="text"
                    name="purchasers_email"
                    className="add-innput"
                    value={this.state.purchasers_email}
                    onChange={this.handleChange}
                  />
                </td>
                <td>
                  <label className="edit-dExample"> (username@email.com)</label>
                </td>
              </tr>
              <br />
              <tr>
                <td className="add-left">
                  <label className="pricepaid">Purchase Price:</label>
                </td>
                <td className="add-right">
                  <input
                    type="text"
                    name="price_paid"
                    className="add-innput"
                    value={this.state.price_paid}
                    onChange={this.handleChange}
                  />
                </td>
                <td>
                  <label className="edit-dExample"> (0.00)</label>
                </td>
              </tr>
              <tr className="edit-trr">
                <td className="edit-b"></td>
                <td className="edit-b">
                  <br />
                  <input className="add-bs" type="submit" value="Submit" />
                  {/* <input className="bc" type="button" value="Cancel" /> */}
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

export default Edit;
