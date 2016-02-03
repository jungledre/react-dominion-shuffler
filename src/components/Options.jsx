import React, { Component, PropTypes } from 'react';
import DeckActions from '../actions/DeckActions';
import _ from 'lodash';

export default class Options extends Component {
  constructor() {
    super();
    this.handleChangeCheckboxes = this.handleChangeCheckboxes.bind(this);
    this.handleChangeExpansion = this.handleChangeExpansion.bind(this);
    this.shuffleDeck = this.shuffleDeck.bind(this);
    this.updateRouter = this.updateRouter.bind(this);
    this.state = {
      options: {
        expansions: ['Dominion'],
        checkBoxes: []
      }
    };
  }

  componentDidMount() {
    this.setState({
      options: {
        expansions: [this.props.options.expansions] || ['Dominion'],
        checkBoxes: [this.props.options.options] || []
      }
    });
  }

  shuffleDeck() {
    DeckActions.updateDeck(this.state.options);
  }

  updateRouter() {
    this.context.router.replace({
      pathname: '/',
      query: {
        expansion: this.state.options.expansions,
        checkbox: this.state.options.checkBoxes
      }
    });
  }

  handleChangeExpansion(val) {
    const options = this.state.options;
    const selectedOptions = _.toArray(val.target.selectedOptions);

    options.expansions = selectedOptions.map(opt => {
      return opt.label;
    });
    this.updateRouter();
    this.setState(options);
    DeckActions.updateDeck(this.state.options);
  }

  handleChangeCheckboxes(val) {
    const value = val.target.value;
    const options = this.state.options;
    if (_.includes(options.checkBoxes, value)) {
      options.checkBoxes.splice(value, 1);
    } else {
      options.checkBoxes.push(value);
    }
    this.updateRouter();
    this.setState(options);
    DeckActions.updateDeck(options);
  }

  render() {
    let checkboxes = [
      {
        name: 'plusAction',
        displayName: 'Plus Action'
      },
      {
        name: 'plusBuy',
        displayName: 'Plus Buy'
      },
      {
        name:  'plusCoin',
        displayName: 'Plus Coin'
      }
    ];
    checkboxes = checkboxes.map(checkBox => {
      return (
        <div key={'opt-' + checkBox.name}>
          <input
            onChange={this.handleChangeCheckboxes}
            type="checkbox"
            value={checkBox.name}
            checked={_.includes(this.state.options.checkBoxes, checkBox.name)}
          />
          {checkBox.displayName}
        </div>
      );
    });

    const selectedOptions = this.props.expansions.map((name, idx) => {
      return (
        <option
          key={'expansion-' + idx}
          value={name}
          selected={_.includes(this.state.options.expansions, name)}
        >{name}
        </option>
      );
    });

    return (
      <div className="text-center">
        <div className="u-topSpace">
          <select
            multiple
            className="opt-expansion"
            onChange={this.handleChangeExpansion}
          >{selectedOptions}
          </select>
        </div>
        <div className="u-topSpace">
          {checkboxes}
        </div>
        <div className="u-topSpace">
          <button
            className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
            onClick={this.shuffleDeck}
          >{'shuffle'}
          </button>
        </div>
      </div>
    );
  }
}
Options.contextTypes = {
  router: PropTypes.object
};

Options.propTypes = {
  expansions: PropTypes.array,
  options: PropTypes.object
};
