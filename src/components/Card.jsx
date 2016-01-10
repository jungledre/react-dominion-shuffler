import React from 'react';

export default React.class({
  render() {
    return (
      <p>{this.props.data.name + ': ' + this.props.data.plusAction
        + ' ' + this.props.data.plusBuy}</p>
    );
  },
});
