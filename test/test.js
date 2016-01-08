import 'babel-polyfill'
import DeckStore from '../src/js/stores/DeckStore';
import deckUtils from '../src/js/utils/deck-utils';
import cardData from '../src/js/data/cards';

import chai from 'chai';
chai.should();

let data = {
    deck: cardData.cards,
    options: {
        expansion: "Dominion"
    }
}

describe('Dominion Deck Utils', function() {
    describe('Initial Deck', function () {
        it('should return only cards from Dominion', function () {
            var dominionDeck = deckUtils.getDeckByExpansionName(data.deck, "Dominion");
            dominionDeck.should.be.length(10);
        });
    });
});
