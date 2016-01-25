import React, { Component, PropTypes } from 'react';
import Sidebar from 'react-sidebar';
import Deck from './Deck';

export default class extends Component {

  static propTypes = {
    drawer: PropTypes.node.isRequired,
    main: PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      open: true
    }
  }

  menuButtonClick() {
    this.setState({open: !this.state.open});
  }

  closeMenu() {
    if (this.props.open === true) {
      this.setState({open: false})
    }
  }

  render() {
    const menuButton = (
        <h4 className="glyphicon glyphicon-menu-hamburger"
              aria-hidden="true"
              onClick={this.menuButtonClick.bind(this)}>
        </h4>

    );

    const sidebarContent = (
      <div>
        {menuButton}
        {this.props.drawer}
      </div>
    );

    return (
      <span>
        <Sidebar sidebar={sidebarContent}
                 styles={{sidebar: {background: 'white', width: '200'}, dragHandle: {height:200}}}
                 open={this.state.open}
                 docked={this.state.open}>
          {menuButton}
          <div onClick={this.closeMenu.bind(this)}>
            {this.props.main}
          </div>
        </Sidebar>
      </span>
    )
  }
}
