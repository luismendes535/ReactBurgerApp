import React, { useState, useEffect } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

const orders = props => {
  useEffect(() => {
    props.onFetchSuccess(props.token, props.userId);
  }, []);

  let orderList = <Spinner />;
  if (!props.loading) {
    orderList = props.orders.map(order => {
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
};
const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onFetchSuccess: (token, userId) =>
      dispatch(actions.fetchOrders(token, userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(orders, axios));
