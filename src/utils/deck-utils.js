import _ from 'lodash';

module.exports = {
  getInitialDeck(deck) {
    return _(deck)
      .where({ expansion: 'Dominion' })
      .sample(10)
      .sortBy('name')
      .value();
  },

  updateDeckOptions(deck, options) {
    const possibleCards = deck.map(card => {
      if (_.includes(options.expansions, card.expansion)) {
        return card;
      }
    }).filter(card => {
      return card !== undefined;
    });

    let optionsCards;
    if (options.checkBoxes) {
      optionsCards = options.checkBoxes.map(opt => {
        return _.find(possibleCards, (card) => {
          if (card[opt] > 0) {
            possibleCards.slice(card);
            return card;
          }
        });
      });
    }

    const otherCards = possibleCards.slice(0, 10 - optionsCards.length);

    const cards = optionsCards.concat(otherCards);

    return _.sortBy(cards, 'name');
  },

  shuffleDeck(deck, options) {
    return this.updateDeckOptions(_.shuffle(deck), options);
  },
};
