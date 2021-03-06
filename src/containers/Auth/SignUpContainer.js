import React, { Component } from 'react';
import { signUp, authReset } from '../../store/auth/authActions/authActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SignUp from '../../components/Forms/SignUp/SignUp';

/* User sign up form */
class SignUpContainer extends Component {
  state = {
    form: {
      email: {
        elementType: 'input',
        elementConfig: {
          placeholder: 'Email',
        },
        value: '',
        errorMessage: 'Please enter a valid email address',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
        },
        value: '',
        errorMessage: 'Password has to be at least 6 characters long',
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
      this.props.signUp(
        this.state.form.email.value,
        this.state.form.password.value
      );
    }
  };

  updateForm = (stateUpdate) => {
    this.setState(stateUpdate);
  };

  componentWillUnmount() {
    this.props.authReset();
  }

  render() {
    return (
      <SignUp
        {...this.state}
        {...this.props}
        handleSubmit={this.handleSubmit}
        updateForm={this.updateForm}
      />
    );
  }
}

SignUpContainer.propTypes = {
  loadingUser: PropTypes.bool,
  error: PropTypes.object,
  isAuthenticated: PropTypes.string,
};

const mapStateToProps = (state) => ({
  loadingUser: state.auth.loadingUser,
  error: state.auth.signUpError,
  isAuthenticated: state.auth.userId,
});

export default connect(mapStateToProps, { signUp, authReset })(SignUpContainer);
