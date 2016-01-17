import React, { Component } from 'react';
import Deck from './Deck';
import DeckStore from '../stores/DeckStore';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: DeckStore.getInitialDeck(),
      options: DeckStore.getDeckOptions(),
      expansions: DeckStore.getExpansionNames(),
    };
  }

  componentDidMount() {
    DeckStore.addChangeListener(this.handleChange.bind(this));
  }

  componentWillUnmount() {
    DeckStore.removeChangeListener(this.handleChange.bind(this));
  }

  handleChange() {
    this.setState({
      deck: DeckStore.getDeck(),
      options: DeckStore.getDeckOptions(),
    });
  }

  render() {
    return (
      <Deck
        deck={this.state.deck}
        options={this.state.options}
        expansions={this.state.expansions}
      />
    );
  }
}
