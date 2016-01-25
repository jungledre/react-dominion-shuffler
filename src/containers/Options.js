import Options from '../components/Options';
import connectToStore from '../hocs/connectToStore';
import DeckStore from '../stores/DeckStore';

export default connectToStore(Options, DeckStore, function () {
  return {
    options: DeckStore.getDeckOptions(),
    expansions: DeckStore.getExpansionNames()
  };
});
