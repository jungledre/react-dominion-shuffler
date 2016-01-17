import React, { Component, PropTypes } from 'react';

const propTypes = {
  name: PropTypes.string,
  data: PropTypes.object,
};

export default class Card extends Component {
  render() {
    return (
      <p>{this.props.data.name + ': ' + this.props.data.plusAction
        + ' ' + this.props.data.plusBuy}</p>
    );
  }
}

Card.propTypes = propTypes;
