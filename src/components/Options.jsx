import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Card from './Card';
import DeckActions from '../actions/DeckActions';
import _ from 'lodash';

export default class extends Component {
  static propTypes = {
    expansions: PropTypes.array,
    options: PropTypes.object
  };

  constructor() {
    super();
    this.handleChangeCheckboxes = this.handleChangeCheckboxes.bind(this);
    this.handleChangeExpansion = this.handleChangeExpansion.bind(this);
    this.shuffleDeck = this.shuffleDeck.bind(this)
    this.state = {
      options: {
        expansions: ['Dominion'],
        checkBoxes: [],
      },
    };
  }

  shuffleDeck() {
    DeckActions.updateDeck(this.state.options);
  }

  handleChangeExpansion(val) {
    const options = this.state.options;
    const selectedOptions = _.toArray(val.target.selectedOptions);

    options.expansions = selectedOptions.map(opt => {
      return opt.label;
    });

    this.setState(options);
    DeckActions.updateDeck(this.state.options);
  }

  handleChangeCheckboxes(val) {
    const value = val.target.value;
    const options = this.state.options;
    if (options.checkBoxes[value]) {
      options.checkBoxes.splice(value, 1);
    } else {
      options.checkBoxes.push(value);
    }
    this.setState(options);

    DeckActions.updateDeck(options);
  }

  render() {
    let checkboxes = ['plusAction', 'plusBuy', 'plusCoin'];
    checkboxes = checkboxes.map(name => {
      return (
        <div key={'opt-' + name}>
          <input
            onChange={this.handleChangeCheckboxes}
            type="checkbox"
            value={name}
          />
          {name}
        </div>
      );
    });

    const selectedOptions = this.props.expansions.map(function buildOptions(name, idx) {
      return <option key={'expansion-' + idx} value={name}>{name}</option>;
    });

    return (
      <div className="text-center">
        <div>
          <select
            multiple
            className="opt-expansion"
            onChange={this.handleChangeExpansion}
            >{selectedOptions}
          </select>
        </div>
        <div>
          {checkboxes}
        </div>
        <div>
          <button
            className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
            onClick={this.shuffleDeck}>
            {'shuffle'}
          </button>
        </div>
      </div>
    );
  }
}
