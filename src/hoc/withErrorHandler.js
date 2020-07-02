import React, { Component } from "react";
import Modal from "../components/UI/Modal/Modal";
import { connect } from "react-redux";

/* Axios error handler HOC */
const withErrorHandler = (WrappedComponent, axios) => {
  class HOComponent extends Component {
    _isMounted = false;

    state = {
      error: null,
    };

    componentDidMount() {
      this._isMounted = true;
      axios.interceptors.request.use((req) => {
        if (this._isMounted) {
          this.setState({ error: null });
        }
        return req;
      });

      axios.interceptors.response.use(
        (res) => res,
        (error) => {
          if (this._isMounted) {
            console.log(error);
            this.setState({ error: error });
          }
          return Promise.reject(error);
        }
      );
    }

    componentWillUnmount() {
      this._isMounted = false;
    }

    handleModalClosed = () => {
      this.setState({ error: null });
    };

    render() {
      let erroredAction = "perform action";
      erroredAction = this.props.erroredAction || erroredAction;

      return (
        <React.Fragment>
          <Modal
            error
            show={this.state.error}
            modalClosed={this.handleModalClosed}
          >
            {this.state.error
              ? "Unable to " + erroredAction + ": " + this.state.error.message
              : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </React.Fragment>
      );
    }
  }

  const mapStateToProps = (state) => ({
    erroredAction: state.ui.erroredAction,
  });

  return connect(mapStateToProps, null)(HOComponent);
};

export default withErrorHandler;