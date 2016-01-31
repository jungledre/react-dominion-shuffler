import React, { Component, PropTypes } from 'react';

export default class Card extends Component {
  render() {
    return (
      <div className="dominion-card col-xs-6 col-md-4 col-md-5ths">
        <img className="dominion-card-img" src={this.props.data.image} />
      </div>
    );
  }
}

Card.propTypes = {
  name: PropTypes.string,
  data: PropTypes.object
};
