import React, { Component } from "react";
import "./Auth.css";
import Button from "../../component/UI/Button/Button";
import Input from "../../component/UI/Input/Input";
import Axios from "axios";

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

class Auth extends Component {
  state = {
    formControls: {
      email: {
        value: "",
        type: "email",
        label: "Email",
        errorMessage: "Введіть коректний емеіл",
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true,
        },
      },
      password: {
        value: "",
        type: "password",
        label: "Пароль",
        errorMessage: "Введіть коректний пароль",
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6,
        },
      },
    },
  };

  loginHandler = async () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true,
    };
    try {
      const respons = await Axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA4vXb2sEgTxuhrv-iAu27ftCjikTN0J6k",
        authData
      );
    } catch(e) {
      console.log(e)
    }
  };

  registerHandler = async () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true,
    };
    try {
      const respons = await Axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA4vXb2sEgTxuhrv-iAu27ftCjikTN0J6k",
        authData
      );
    } catch(e) {
      console.log(e)
    }
  };

  submitHandler = (event) => {
    event.preventDefault();
  };

  validateControl(value, validation) {
    if (!validation) {
      return true;
    }
    let isInvalid = true;

    if (validation.required) {
      isInvalid = value.trim() !== "" && isInvalid;
    }

    if (validation.email) {
      isInvalid = validateEmail(value) && isInvalid;
    }

    if (validation.minLength) {
      isInvalid = value.length >= validation.minLength && isInvalid;
    }

    return isInvalid;
  }

  onChangeHandler = (event, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);

    formControls[controlName] = control;

    this.setState({
      formControls,
    });
  };

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          errorMessage={control.errorMessage}
          shouldValidate={!!control.validation}
          onChange={(event) => this.onChangeHandler(event, controlName)}
        />
      );
    });
  }

  render() {
    return (
      <div className="Auth">
        <div>
          <h1>Авторизація</h1>

          <form onSubmit={this.submitHandler} className="AuthFrom">
            {this.renderInputs()}

            <Button type="success" onClick={this.loginHandler}>
              Увійти
            </Button>
            <Button type="primary" onClick={this.registerHandler}>
              Реєстрація
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default Auth;
