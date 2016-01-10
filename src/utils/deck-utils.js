import _ from 'lodash';

module.exports = {
  getDeckByExpansionName(deck, expansion) {
    return _(deck)
    .where({ expansion: expansion || 'Dominion' })
    .sample(10)
    .sortBy('plusAction').value();
  },

  updateDeckOptions(deck, options) {
    const newDeck = _.where(deck, {
      expansion: (options.expansion || 'Dominion'),
    });
    return newDeck.map(card => {
      if (card.plusAction >= options.plusAction
        && card.plusBuy >= options.plusBuy) {
        return card;
      }
    });
  },

  shuffleDeck(deck, options) {
    return _(this.updateDeckOptions(deck, options))
    .compact()
    .shuffle()
    .take(10)
    .value();
  },
};
