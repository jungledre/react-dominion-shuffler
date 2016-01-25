import AppDispatcher from '../dispatcher/AppDispatcher';
import DeckConstants from '../constants/DeckConstants';

export default {
  updateDeck(options) {
    AppDispatcher.dispatch({
      actionType: DeckConstants.DECK_UPDATE,
      options
    });
  },

  getDeck() {
    AppDispatcher.dispatch({
      actionType: DeckConstants.DECK_CREATE
    });
  }
};
