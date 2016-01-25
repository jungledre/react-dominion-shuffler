import _ from 'lodash';

module.exports = {
  getDeck(deck) {
    return _(deck)
      .where({ expansion: 'Dominion' })
      .sample(10)
      .sortBy('name')
      .value();
  },

  updateDeckOptions(deck, options) {
    let allCards = deck;
    let possibleCards = allCards.map(card => {
      if (_.includes(options.expansions, card.expansion)) {
        allCards = _.reject(allCards, card);
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
            possibleCards = _.reject(possibleCards, card);
            return card;
          }
        });
      });
    }

    const otherCards = possibleCards.slice(0, 10 - _.size(optionsCards));

    const cards = options.checkBoxes ? otherCards.concat(optionsCards) : otherCards;

    return _(cards).sortBy('name').sortBy('expansion').value();
  },

  shuffleDeck(deck, options) {
    return this.updateDeckOptions(_.shuffle(deck), options);
  }
};
