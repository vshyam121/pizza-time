import React, { Component } from 'react';
import './PizzaBuilderPreview.scss';
import PizzaPreview from '../../PizzaPreview/PizzaPreview';
import PropTypes from 'prop-types';

/* Pizza preview image section of the pizza builder */
class PizzaBuilderPreview extends Component {
  shouldComponentUpdate(prevProps) {
    if (this.props.pizza !== prevProps.pizza) {
      return true;
    }
    return false;
  }
  render() {
    return (
      <div className='pizza-builder-preview'>
        <h2 className='builder-section__title'>Preview</h2>
        <div className='pizza-builder-preview__preview'>
          <PizzaPreview pizza={this.props.pizza} />
        </div>
      </div>
    );
  }
}

PizzaBuilderPreview.propTypes = {
  pizza: PropTypes.object.isRequired,
};

export default PizzaBuilderPreview;
