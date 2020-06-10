import React from "react";
import "./style.css";
import { Route, Switch } from "react-router-dom";
import Navigation from "./Navigation";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import GetAll from "./GetAll";
import Add from "./Add";
import GetOne from "./GetOne";
import Edit from "./Edit";
import Delete from "./Delete";

function App() {
  return (
    <Switch>
      <Route exact path="/" render={() => <Home />} />
      <Route exact path="/header" render={() => <Header />} />
      <Route exact path="/footer" render={() => <Footer />} />
      <Route exact path="/navigation" render={() => <Navigation />} />
      <Route exact path="/cars" render={() => <GetAll />} />
      <Route exact path="/cars/add" render={() => <Add />} />
      {/* To get input from url like, 'api/:id' */}
      <Route
        exact
        path="/cars/detail/:id"
        render={(props) => <GetOne id={props.match.params.id} />}
      />
      <Route
        exact
        path="/cars/edit/:id"
        render={(props) => <Edit id={props.match.params.id} />}
      />
      <Route
        exact
        path="/cars/delete/:id"
        render={(props) => <Delete id={props.match.params.id} />}
      />
      <Route render={() => <h1>Page Not Found</h1>} />
    </Switch>
  );
}

export default App;
