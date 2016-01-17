import React, { Component, PropTypes } from 'react';
import Card from './Card';
import DeckActions from '../actions/DeckActions';
import _ from 'lodash';

const propTypes = {
  deck: PropTypes.array,
  expansions: PropTypes.array,
};

export default class Deck extends Component {
  constructor(props) {
    super(props);
    this.handleChangeCheckboxes = this.handleChangeCheckboxes.bind(this);
    this.handleChangeExpansion = this.handleChangeExpansion.bind(this);
    this.shuffleDeck = this.shuffleDeck.bind(this);
    this.state = {
      options: {
        expansions: ['Dominion'],
        checkBoxes: [],
      },
    };
  }

  shuffleDeck() {
    DeckActions.update(this.state.options);
  }

  handleChangeExpansion(val) {
    const options = this.state.options;
    const selectedOptions = _.toArray(val.target.selectedOptions);

    options.expansions = selectedOptions.map(opt => {
      return opt.label;
    });

    this.setState(options);
    DeckActions.update(this.state.options);
  }

  handleChangeCheckboxes(val) {
    const value = val.target.value;
    const options = this.state.options;
    if (options.checkBoxes[value]) {
      options.checkBoxes.splice(value, 1);
    } else {
      options.checkBoxes.push(value);
    }
    DeckActions.update(options);
  }

  render() {
    const deckArr = _.toArray(this.props.deck);
    let deck;
    if (deckArr.length === 10) {
      deck = deckArr.map((card, idx) => {
        return (
          <Card key={'card-' + idx} data={card} />
        );
      });
    } else {
      deck = <p>Select fewer options</p>;
    }


    let checkboxes = ['plusAction', 'plusBuy'];
    checkboxes = checkboxes.map(name => {
      return (
        <span key={'opt-' + name}>
          <input
            className={'opt-' + name}
            onChange={this.handleChangeCheckboxes}
            type="checkbox"
            value={name}
          />
          {name}
        </span>
      );
    });

    const selectedOptions = this.props.expansions.map(function buildOptions(name, idx) {
      return <option key={'expansion-' + idx} value={name}>{name}</option>;
    });

    return (
      <div className="container">
        <div className="row text-center">
          <h1>Dominion Girl with React</h1>
          <button className="btn-info" onClick={this.shuffleDeck}>shuffle deck</button>
          <select
            multiple
            className="opt-expansion"
            onChange={this.handleChangeExpansion}
            defaultValue={this.state.expansions}
          >{selectedOptions}
          </select>
          {checkboxes}
        </div>
        <div className="row">
          {deck}
        </div>
      </div>
    );
  }
}

Deck.propTypes = propTypes;
