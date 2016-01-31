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
      <i className="glyphicon glyphicon-menu-hamburger"
        aria-hidden="true"
        onClick={this.menuButtonClick}
      >
      </i>
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
              <h4 className="u-inline">
                { menuButton }<a href="#?expansion=Dominion"> Dominion Girl</a>
              </h4>
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
