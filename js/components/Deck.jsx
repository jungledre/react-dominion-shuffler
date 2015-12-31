import React from 'react';
import Card from './Card';
import DeckActions from '../actions/DeckActions';
import _ from 'lodash';

export default React.createClass({
    handleClick: function() {
        DeckActions.update(
            {
                expansion: "Seaside"
            }
        )
    },

    render: function() {
        let self = this;
        let deckArr = _.toArray(self.props.deck)
        let deck = deckArr.map(function(card, idx) {
            return (
                <Card key={'card-' + idx} data={card} />
            )
        })

        return (
            <div className="container">
                <div className="row text-center">
                    <h1>Dominion Girl with React</h1>
                    <button className="btn-info" onClick={this.handleClick}>new deck</button>
                </div>
                <div className="row">
                    {deck}
                </div>
            </div>
        );
    }
});
