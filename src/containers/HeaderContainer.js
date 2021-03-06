import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toggleSidebar } from '../store/ui/uiActions/uiActions';
import { signOut } from '../store/auth/authActions/authActions';
import PropTypes from 'prop-types';
import Header from '../components/Layout/Header/Header';

/* Header containing logo, app name, main menu, autentication, orders and cart */
const HeaderContainer = (props) => {
  return <Header {...props} />;
};

HeaderContainer.propTypes = {
  quantity: PropTypes.number.isRequired,
  numItemsAdded: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  items: state.cart.items,
  quantity: state.cart.quantity,
  numItemsAdded: state.cart.numItemsAdded,
  isAuthenticated: state.auth.userId,
});

export default connect(mapStateToProps, { toggleSidebar, signOut })(
  withRouter(HeaderContainer)
);
