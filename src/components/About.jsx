import React, { Component } from 'react';

export default class extends Component {
  render() {
    return (
      <div className="container u-topSpace">
        <div className="col-md-6 col-sm-12">
          <h4>About</h4>
          <p>I built this app to explore webpack, es6, babel, react and the react router.</p>
          <p>If you have any special requests for this shuffler, please file a github issue
            and consider contributing!</p>
          <a href="https://github.com/jungledre/react-dominion-shuffler">
            <i className="fa fa-3x fa-github"></i>
          </a>
        </div>
      </div>
    );
  }
}
