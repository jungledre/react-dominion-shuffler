import React, { Component, PropTypes } from 'react';
import Sidebar from 'react-sidebar';

export default class Layout extends Component {
  constructor(props) {
    super(props);
    this.menuButtonClick = this.menuButtonClick.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.state = {
      open: true
    };
  }

  menuButtonClick() {
    this.setState({ open: !this.state.open });
  }

  closeMenu() {
    if (this.state.open === true) {
      this.setState({ open: false });
    }
  }

  render() {
    const menuButton = (
      <button id="demo-menu-lower-left" className="mdl-button mdl-js-button mdl-button--icon">
        <i className="material-icons" onClick={this.menuButtonClick}>more_vert</i>
      </button>
    );

    const sideBarStyles = {
      root: {
        top: '60px'
      },
      sidebar: {
        background: 'white',
        width: '200px'
      }
    };

    return (
      <span>
        <div className="navigation">
          <div className="container-fluid u-padding15">
            <span className="u-inline">
              <h5 className="u-inline page-title">
                { menuButton }
                <a href="#?expansion=Dominion"> Dominion Girl</a>
              </h5>
              <a href="#about" className="pull-right">About</a>
            </span>
          </div>
        </div>
        <Sidebar sidebar={ this.props.drawer }
          styles={ sideBarStyles }
          open={ this.state.open}
          docked={ this.state.open}
        >
          <div onClick={ this.closeMenu}>
            {this.props.main}
          </div>
        </Sidebar>
      </span>
    );
  }
}

Layout.propTypes = {
  drawer: PropTypes.node.isRequired,
  main: PropTypes.node.isRequired
};
