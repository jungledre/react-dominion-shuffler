import React from 'react';
import Card from './Card';
import DeckActions from '../actions/DeckActions';
import _ from 'lodash';
import Select from 'react-select';

export default React.createClass({
    getInitialState: function() {
        return {
            localExpansion: "Dominion"
        }
    },

    shuffleDeck: function() {
        DeckActions.update(
            {
                expansion: this.state.localExpansion
            }
        )
    },

    logChange: function(val) {
        val = val.target.value
        DeckActions.update(
            {
                expansion: val
            }
        )
        this.setState({localExpansion: val})
    },

    render: function() {
        let self = this;
        let deckArr = _.toArray(self.props.deck);
        let deck = deckArr.map(function(card, idx) {
            return (
                <Card key={'card-' + idx} data={card} />
            )
        });

        let expansionOptions = self.props.expansions.map(function(name, idx) {
            return (
                <option key={'expansion-' + idx} value={name}>{name}</option>
            )
        });

        return (
            <div className="container">
                <div className="row text-center">
                    <h1>Dominion Girl with React</h1>
                    <button className="btn-info" onClick={this.shuffleDeck}>shuffle deck</button>
                    <select onChange={this.logChange} defaultValue="Dominion">
                        {expansionOptions}
                    </select>
                </div>
                <div className="row">
                    {deck}
                </div>
            </div>
        );
    }
});
