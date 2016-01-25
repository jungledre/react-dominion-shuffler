import React, { Component } from 'react';

export default (C, store, callback) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = callback();
    }
    handleChange = () => {
      this.setState(callback());
    };
    componentDidMount() {
      store.addChangeListener(this.handleChange);
    }
    componentWillUnmount() {
      store.removeChangeListener(this.handleChange);
    }
    render() {
      return <C {...this.props} {...this.state} />;
    }
  }
}
