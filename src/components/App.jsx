import React from 'react';
import Deck from './Deck';
import DeckStore from '../stores/DeckStore';

export default React.class({
  getInitialState() {
    return {
      deck: DeckStore.getInitialDeck(),
      options: DeckStore.getDeckOptions(),
      expansions: DeckStore.getExpansionNames(),
    };
  },

  componentDidMount() {
    DeckStore.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    DeckStore.removeChangeListener(this._onChange);
  },

  _onChange() {
    this.setState({
      deck: DeckStore.getDeck(),
      options: DeckStore.getDeckOptions(),
    });
  },

  render() {
    return (
      <Deck
        deck={this.state.deck}
        options={this.state.options}
        expansions={this.state.expansions}
      />
      );
  },
});
