import React, { Component } from "react";
import "./PizzaBuilderPreview.scss";
import PizzaPreview from "../../PizzaPreview/PizzaPreview";

/* Pizza preview image section of the pizza builder */
class PizzaBuilderPreview extends Component {
  render() {

    return (
      <div className="pizza-builder-preview">
        <h4 className="builder-section__title">Preview</h4>
        <div className="pizza-builder-preview__preview">
          <PizzaPreview pizza={this.props.pizza} />
        </div>
      </div>
    );
  }
}

export default PizzaBuilderPreview;