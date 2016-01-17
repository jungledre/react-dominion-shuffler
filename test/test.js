import 'babel-polyfill';
import DeckStore from '../src/stores/DeckStore';
import deckUtils from '../src/utils/deck-utils';
import cardData from '../src/data/cards';

import chai from 'chai';
chai.should();

let data = {
  deck: cardData.cards,
  options: {
    expansion: 'Dominion',
    checkBoxes: []
  }
};

describe('Dominion Deck Utils', function () {
  describe('Initial Deck', function () {
    it('should return only cards from Dominion', function () {
      var dominionDeck = deckUtils.getInitialDeck(data.deck);
      dominionDeck.should.be.length(10);
    });
  });

  describe('Initial Deck', function () {
    it('Should return cards from both Dominion, Seaside and at least one plusAction card', function () {
      var dominionDeck = deckUtils.updateDeckOptions(data.deck, {
        expansions: ['Dominion', 'Seaside'],
        checkBoxes: ['plusAction']
      });
      dominionDeck.should.be.length(10);
    });
  });
});
