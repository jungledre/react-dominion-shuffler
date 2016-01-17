import React, { Component, PropTypes } from 'react';

const propTypes = {
  name: PropTypes.string,
  data: PropTypes.object,
};

export default class Card extends Component {
  render() {
    return (
      <div className="dominion-card col-xs-5ths">
          <img src={this.props.data.image} />
      </div>
    );
  }
}

Card.propTypes = propTypes;
