import React, { Component } from "react";
import Aux from "../../hoc/AuxHoc";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../axios-orders';

const INGREDIENT_PRICE = {
  salad: 0.5,
  cheese: 0.6,
  meat: 1.4,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false
  };

  updatePurchaseState(updatedPrice) {
    if (updatedPrice > 4) {
      this.setState({ purchasable: true });
    } else {
      this.setState({ purchasable: false });
    }
  }

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICE[type];
    const updatedPrice = this.state.totalPrice + priceAddition;
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice
    });
    this.updatePurchaseState(updatedPrice);
  };

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICE[type];
    const updatedPrice = this.state.totalPrice - priceDeduction;
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice
    });
    this.updatePurchaseState(updatedPrice);
  };

  purchaseHandler=()=>{
    this.setState({purchasing: true})
  }
  purchaseCancelHandler=()=>{
    this.setState({purchasing: false})
  }
  purchaseContinueHandler=()=>{
    //alert('You continue!')
    this.setState({loading:true})
    const order={
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer:{
        name:'Luis',
        address:{
          street: 'Rua S.Vicente',
          zipcode: '4835-140',
          country: 'Portugal'  
        },
        email:'luismends535@gmail.com'
      },
      deliveryMethod:'fastest'
    }
    axios.post('/orders.json', order)
    .then(response=>{
      this.setState({loading:false})
      console.log(response)
    })
    .catch(err=>{
      this.setState({loading:false})
      console.log(err)
    })
  }
  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = <OrderSummary price={this.state.totalPrice} purchaseCancelled={this.purchaseCancelHandler} purchaseContinued={this.purchaseContinueHandler} ingredients={this.state.ingredients}/>;
    if(this.state.loading){
      orderSummary = <Spinner/>
    }
    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
        {orderSummary}
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          totalPrice={this.state.totalPrice}
          disabled={disabledInfo}
          purchasable={this.state.purchasable}
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          ordered={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
