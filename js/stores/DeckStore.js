import AppDispatcher from '../dispatcher/AppDispatcher';
import { EventEmitter } from 'events';
import assign from 'object-assign';
import _ from 'lodash';

import DeckConstants from '../constants/DeckConstants';
var cardData = require('../data/cards');
const CHANGE_EVENT = 'change';

let data = {
  options: {
    expansion: "Dominion"
  }
}

let DeckStore = assign({}, EventEmitter.prototype, {
  getDeck: function(options) {
    let cards = [];
    let deck = cardData.cards;
    deck = _.where(deck, {expansion: data.options.expansion})
    deck = _.sample(deck, 10);
    deck = _.sortBy(deck, 'cost')
    return deck;
  },

  getDeckOptions: function() {
    return data.options;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  switch(action.actionType) {
    case DeckConstants.DECK_UPDATE:
      let options = action.options;
      if (options) {
        data.options = options;
        DeckStore.emitChange();
      }
      break;

    default:
      break;
  }
});

module.exports = DeckStore;
