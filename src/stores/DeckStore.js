import assign from 'object-assign';
import _ from 'lodash';

import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import deckUtils from '../utils/deck-utils';
import DeckConstants from '../constants/DeckConstants';

const cardData = require('../data/cards');
const CHANGE_EVENT = 'change';

const data = {
  deck: [],
  options: {}
};

const DeckStore = assign({}, EventEmitter.prototype, {
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

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
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

    case DeckConstants.GET_INITIAL_DECK:
      data.deck = deckUtils.getInitialDeck(cardData.cards);
      DeckStore.emitChange();
      break;

    case DeckConstants.GET_DECK_OPTIONS:
      data.options = DeckStore.getDeckOptions();
      DeckStore.emitChange();
      break;

    default:
      break;
  }
});

module.exports = DeckStore;
