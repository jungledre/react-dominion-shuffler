import React from 'react';
import Deck from './Deck';
import DeckStore from '../stores/DeckStore';

export default React.createClass({
    getInitialState: function() {
        return {
            deck: DeckStore.getInitialDeck(),
            options: DeckStore.getDeckOptions(),
            expansions: DeckStore.getExpansionNames()
        };
    },

    componentDidMount: function() {
        DeckStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        DeckStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        this.setState({
            deck: DeckStore.getDeck(),
            options: DeckStore.getDeckOptions()
        });
    },

    render: function() {
        return (
            <Deck
                deck={this.state.deck}
                options={this.state.options}
                expansions={this.state.expansions}
            />
        );
    }
});
