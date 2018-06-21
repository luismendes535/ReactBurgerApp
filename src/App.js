import React, { Component } from "react";
import Layout from "../src/hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from './containers/Checkout/Checkout';
import {BrowserRouter,Switch, Route} from 'react-router-dom';
import Orders from './containers/Orders/Orders'


class App extends Component {
  render() {
    return (
      <div className="App">
      <BrowserRouter>
        <Layout>
          <Switch>
          <Route path="/orders" component={Orders}/>
          <Route path="/checkout" component={Checkout}/>
          <Route path='/' component={BurgerBuilder}/>
          </Switch>
        </Layout>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
