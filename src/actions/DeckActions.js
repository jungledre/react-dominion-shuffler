import AppDispatcher from '../dispatcher/AppDispatcher';
import DeckConstants from '../constants/DeckConstants';

export default {
  /**
   * @param  {string} deck options
   */
  update(options) {
    AppDispatcher.dispatch({
      actionType: DeckConstants.DECK_UPDATE,
      options,
    });
  },
};
