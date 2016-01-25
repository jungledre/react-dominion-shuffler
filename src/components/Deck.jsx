import React from 'react';
import Card from './Card';

export default props => {
  let deck = props.deck;

  if (!deck) {
    return <p>Select fewer options</p>;
  }

  deck = deck.map((card, idx) => {
    return (
      <Card key={'card-' + idx} data={card} />
    );
  });

  return (
    <div className="container">
      {deck}
    </div>
  );
};
