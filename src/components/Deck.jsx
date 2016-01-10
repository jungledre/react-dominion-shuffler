import React from 'react';
import Card from './Card';
import DeckActions from '../actions/DeckActions';
import _ from 'lodash';

export default React.class({
  getInitialState() {
    return {
      options: {
        expansion: 'Dominion',
        type: null,
        plusAction: 0,
        plusCoin: 0,
        plusBuy: 0,
        costTreasure: 0,
        costPotions: 0,
      },
    };
  },

  shuffleDeck() {
    DeckActions.update(this.state.options);
  },

  handleChangeExpansion(val) {
    const options = this.state.options;
    options.expansion = val.target.value;
    this.setState(options);
    DeckActions.update(this.state.options);
  },

  handleChangeCheckboxes(val) {
    const value = val.target.value;
    const options = this.state.options;
    if (options[value]) {
      options[value] = 0;
    } else {
      options[value] = 1;
    }
    DeckActions.update(options);
  },

  render() {
    const deckArr = _.toArray(self.props.deck);
    const deck = deckArr.map((card, idx) => {
      return (
        <Card key={'card-' + idx} data={card} />
      );
    });


    let checkboxes = ['plusAction', 'plusBuy'];
    checkboxes = checkboxes.map(function buildCheckboxes(name) {
      return (
        <span key={'opt-' + name}>
          <input
            className={'opt-' + name}
            onChange={self.handleChangeCheckboxes}
            type="checkbox"
            value={name}
          />
          {name}
        </span>
      );
    });

    return (
      <div className="container">
        <div className="row text-center">
          <h1>Dominion Girl with React</h1>
          <button className="btn-info" onClick={this.shuffleDeck}>shuffle deck</button>
          <select
            className="opt-expansion"
            onChange={this.handleChangeExpansion}
            defaultValue="Dominion"
          >
            {self.props.expansions.map(function buildOptions(name, idx) {
              return <option key={'expansion-' + idx} value={name}>{name}</option>;
            })};
          </select>
          {checkboxes}
        </div>
        <div className="row">
          {deck}
        </div>
      </div>
    );
  },
});
