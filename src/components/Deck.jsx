import React, { Component, PropTypes } from 'react';
import Card from './Card';

export default class Deck extends Component {
  render() {
    let deck = this.props.deck;

    if (!deck) {
      return <p>Select fewer options</p>;
    }

    deck = deck.map((card, idx) => {
      return (
        <Card key={'card-' + idx} data={card} />
      );
    });

    return (
      <div className="container u-topSpace">
        {deck}
      </div>
    );
  }
}

Deck.propTypes = {
  deck: PropTypes.array
};
