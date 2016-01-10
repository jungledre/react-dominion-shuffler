import React from 'react';
import Card from './Card';
import DeckActions from '../actions/DeckActions';
import _ from 'lodash';
import Select from 'react-select';

export default React.createClass({
    getInitialState: function() {
        return {
            options: {
                expansion: "Dominion",
                type: null,
                plusAction: 0,
                plusCoin: 0,
                plusBuy: 0,
                costTreasure: 0,
                costPotions: 0,
            }
        }
    },

    shuffleDeck: function() {
        DeckActions.update(this.state.options);
    },

    handleChangeExpansion: function(val) {
        let options = this.state.options
        options.expansion = val.target.value;
        this.setState(options);
        DeckActions.update(this.state.options);
    },

    handleChangeCheckboxes: function(val) {
        val = val.target.value;
        let options = this.state.options
        if (options[val]) {
            options[val] = 0
        } else {
            options[val] = 1;
        }
        DeckActions.update(options);
    },

    render: function() {
        let self = this;
        let deckArr = _.toArray(self.props.deck);
        let deck = deckArr.map(function(card, idx) {
            return (
                <Card key={'card-' + idx} data={card} />
            )
        });


        let checkboxes = ['plusAction', 'plusBuy'];
        checkboxes = checkboxes.map(function(name) {
            return (
                <span key={"opt-" + name}>
                    <input className={"opt-" + name} onChange={self.handleChangeCheckboxes} type="checkbox" value={name} />
                    {name}
                </span>
            )
        });

        return (
            <div className="container">
                <div className="row text-center">
                    <h1>Dominion Girl with React</h1>
                    <button className="btn-info" onClick={this.shuffleDeck}>shuffle deck</button>
                    <select className="opt-expansion" onChange={this.handleChangeExpansion} defaultValue="Dominion">
                        {self.props.expansions.map(function(name, idx) {
                            return <option key={'expansion-' + idx} value={name}>{name}</option>
                        })}
                    </select>
                    {checkboxes}
                </div>
                <div className="row">
                    {deck}
                </div>
            </div>
        );
    }
});
