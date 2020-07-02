import React from "react";
import "./Button.scss";
import PropTypes from "prop-types";

export const primary = "button";
export const secondary = "button button--secondary"
export const tertiary = "button button--tertiary";

/* Standard button across entire app */
const Button = props => {
  
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className={props.type}
    >
      {props.children}
    </button>
  );
};

Button.propTypes = {
  disabled: PropTypes.bool,
  type: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
}

export default Button;