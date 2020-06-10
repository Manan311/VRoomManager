import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Header from "./Header";
import Navigation from "./Navigation";
import "./style.css";

const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th className="getAll-thea">Make</th>
        <th className="getAll-thea">Model</th>
        <th className="getAll-thea">Year</th>
        <th className="getAll-thea"></th>
        <th className="getAll-thea"></th>
        <th className="getAll-thea"></th>
      </tr>
    </thead>
  );
};


const TableBody = props => {
  // Using the array of objects, create a new array of React elements
  let rows = props.cars.map((car, index) => {
    return <TableRow car={car} key={index} />;
  });

  return <tbody>{rows}</tbody>;
};

// Function component
const TableRow = props => {
  const c = props.car;
  return (
    <tr >
      <td className="getAll-tdwidth">{c.car_make}</td>
      <td className="getAll-tdwidth">{c.car_model}</td>
      <td className="getAll-tdwidth">{c.car_year}</td>
      <td className="getAll-tdwidth"></td>
      <td className="getAll-tdwidth"></td>
      <td className="getAll-tdwidth">
        <Link className="getAll-btn getAll-btn-detail" to={`/cars/detail/${c._id}`}>
          Details
        </Link>
        &nbsp;&nbsp;
        <Link className="getAll-btn getAll-btn-edit" to={`/cars/edit/${c._id}`}>
          Edit
        </Link>
        &nbsp;&nbsp;
        <Link className="getAll-btn getAll-btn-delete" to={`/cars/delete/${c._id}`}>
          Delete
        </Link>
      </td>
    </tr>
  );
};

class GetAll extends Component {

  state = { cars: [] };
  
  //web api
  url = "https://shrouded-shelf-91192.herokuapp.com/api/cars";
  // url = "http://localhost:8080/api/cars";

  constructor(props){
    super(props);
  }

  componentDidMount() {
    // Get all
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
        this.setState({ cars: responseData });
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

        <div className="getAll-content">
          <tbody className="getAll-contentTBody">
            <TableHeader />
            {/* <TableBody /> */}
            <TableBody cars={this.state.cars} />
          </tbody>
        </div>
      </div>
    );
  }
}

export default GetAll;
