import React, { Component } from 'react';
import Deck from './Deck';
import DeckStore from '../stores/DeckStore';
import '../assets/app.less';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      deck: DeckStore.getInitialDeck(),
      options: DeckStore.getDeckOptions(),
      expansions: DeckStore.getExpansionNames(),
    };
  }

  componentDidMount() {
    DeckStore.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    DeckStore.removeChangeListener(this.handleChange);
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
