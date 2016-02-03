import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link } from 'react-router';
import { createHashHistory } from 'history';
import Layout from './src/components/Layout';
import Deck from './src/containers/Deck';
import Options from './src/containers/Options';
import About from './src/components/About';
import AboutDrawer from './src/components/AboutDrawer';
import DeckActions from './src/actions/DeckActions';
import './src/assets/app.less'

const history = createHashHistory({ queryKey: false });

const onEnter = function(nextState, replaceState) {
  DeckActions.updateDeck({
    expansions: nextState.location.query.expansion,
    options: nextState.location.query.checkbox
  });
};

render((
  <Router history={history}>
    <Route path="/" component={Layout}>
      <IndexRoute onEnter={onEnter} components={{main: Deck, drawer: Options}} />
      <Route path="/about" components={{main: About, drawer: AboutDrawer}} />
    </Route>
  </Router>
), document.getElementById('main'));
