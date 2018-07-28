import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
  componentDidMount() {
    console.log(this.props);
    this.props.onFetchSuccess();
  }
  render() {
    let orderList = <Spinner />;
    if (!this.props.loading) {
      orderList = this.props.orders.map(order => {
        return (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            totalPrice={order.price}
          />
        );
      });
    }
    return <div>{orderList}</div>;
  }
}
const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onFetchSuccess: () => dispatch(actions.fetchOrders())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
