import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Mail Address"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    }
  };
  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }
    const form = this.state.controls.map(el => {
          <Input
            changed={event => this.inputChangedHandler(event, el.id)}
            key={el.id}
            shouldValidate={el.config.validation}
            invalid={!el.config.valid}
            touched={el.config.touched}
            elementType={el.config.elementType}
            elementConfig={el.config.elementConfig}
            value={el.config.value}
          />
      });
    return (
      <div>
        <h4>Log in</h4>
        {form}
        <Button />
      </div>
    );
  }
}

export default Auth;
