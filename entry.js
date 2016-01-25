import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';
import { createHashHistory } from 'history';
import Layout from './src/components/Layout';
import Deck from './src/containers/Deck';
import Options from './src/containers/Options';
import About from './src/components/About';
import DeckActions from './src/actions/DeckActions';
import './src/assets/app.less'

const history = createHashHistory({ queryKey: false });

const onEnter = function(nextState, replaceState) {
  DeckActions.updateDeck({
    expansions: nextState.params.expansions,
    options: nextState.location.query.options
  });
};

render((
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute onEnter={onEnter} components={{main: Deck, drawer: Options}} />
      <Route onEnter={onEnter} path="/expansion/:expansions" components={{main: Deck, drawer: Options}} />
      <Route path="/about" components={{main: About, drawer: About}} />
    </Route>
  </Router>
), document.getElementById('main'));
