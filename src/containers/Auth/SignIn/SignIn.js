import React, { Component } from "react";
import "./SignIn.scss";
import Button, { secondary } from "../../../components/UI/Button/Button";
import { signIn, authReset } from "../../../store/auth/authActions";
import { connect } from "react-redux";
import { SyncLoader } from "react-spinners";
import { lookupErrorCode } from "../../../shared/errorMessages";
import { Redirect } from "react-router-dom";
import Form from "../../../containers/Form/Form";
import { Link } from "react-router-dom";
import axios from "axios";
import withErrorHandler from "../../../hoc/withErrorHandler";

class SignIn extends Component {
  state = {
    form: {
      email: {
        elementType: "input",
        elementConfig: {
          placeholder: "Email",
        },
        value: "",
        errorMessage: "Please enter a valid email address",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        errorMessage: "Password has to be at least 6 characters long",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
      },
    },
    formIsValid: false,
    formSubmitted: false,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ formSubmitted: true });
    if (this.state.formIsValid) {
      this.props.signIn(
        this.state.form.email.value,
        this.state.form.password.value
      );
    }
  };

  updateForm = (stateUpdate) => {
    this.setState(stateUpdate);
  };

  componentDidMount() {
    if (this.props.error) {
      this.props.authReset();
    }
  }

  render() {
    let form = (
      <Form
        {...this.state}
        onSubmit={this.handleSubmit}
        updateForm={this.updateForm}
      />
    );
    if (this.props.loading) {
      form = (
        <div className="spinner">
          <SyncLoader />
        </div>
      );
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = (
        <div className="form-component__error">
          <p>{lookupErrorCode(this.props.error.message)}</p>
        </div>
      );
    }

    let redirect = null;
    if (this.props.isAuthenticated) {
      if (this.props.location.fromCheckout) {
        redirect = <Redirect to="/checkout/order-type" />;
      } else {
        redirect = <Redirect to="/" />;
      }
    }

    return (
      <div className="form-container">
        <div className="form-component">
          <h3 className="form-component__title">
            Please sign in to your account
          </h3>
          {redirect}
          {errorMessage}
          {form}
          <div className="signup">
            <Link to="/signup">
              <Button type={secondary}>Sign Up</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: state.auth.idToken,
});

export default connect(mapStateToProps, { signIn, authReset })(withErrorHandler(SignIn, axios));
