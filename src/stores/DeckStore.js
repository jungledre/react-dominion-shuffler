import assign from 'object-assign';
import _ from 'lodash';

import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import deckUtils from '../utils/deck-utils';
import DeckConstants from '../constants/DeckConstants';

const cardData = require('../data/cards');
const CHANGE_EVENT = 'change';

const data = {
  deck: cardData.cards,
  options: {},
};

const DeckStore = assign({}, EventEmitter.prototype, {
  getInitialDeck() {
    return deckUtils.getDeckByExpansionName(data.deck, data.options.expansion);
  },

  getDeck() {
    return data.deck;
  },

  updateDeck(options) {
    return deckUtils.shuffleDeck(cardData.cards, options);
  },

  getDeckOptions() {
    return data.options;
  },

  getExpansionNames() {
    return _(cardData.cards)
      .pluck('expansion')
      .uniq()
      .value();
  },

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

    /**
    * @param {function} callback
    */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

    /**
    * @param {function} callback
    */
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
});

// Register callback to handle all updates
AppDispatcher.register(function handleUpdates(action) {
  switch (action.actionType) {
    case DeckConstants.DECK_UPDATE:
      if (action.options) {
        data.options = action.options;
        data.deck = DeckStore.updateDeck(data.options);
        DeckStore.emitChange();
      } else {
        DeckStore.emitChange();
      }

      break;

    default:
      break;
  }
});

module.exports = DeckStore;
