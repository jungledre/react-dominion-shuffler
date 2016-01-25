import Deck from '../components/Deck';
import connectToStore from '../hocs/connectToStore';
import DeckStore from '../stores/DeckStore';

export default connectToStore(Deck, DeckStore, function () {
  return {
    deck: DeckStore.getDeck()
  };
});
