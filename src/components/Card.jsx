import React, { Component, PropTypes } from 'react';

export default class extends Component {
  static propTypes = {
    name: PropTypes.string,
    data: PropTypes.object,
  };

  render() {
    return (
      <div className="dominion-card col-xs-6 col-md-4 col-md-5ths">
        <img className="dominion-card-img" src={this.props.data.image} />
      </div>
    );
  }
}
