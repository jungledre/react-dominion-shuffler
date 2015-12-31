import AppDispatcher from '../dispatcher/AppDispatcher';
import DeckConstants from '../constants/DeckConstants';

export default {
  /**
   * @param  {string} id The ID of the plant
   * @param  {string} deck
   */
  update: function(options) {
    AppDispatcher.dispatch({
      actionType: DeckConstants.DECK_UPDATE,
      options: options
    });
  },
};
