import React from 'react';

export default React.createClass({
    render: function() {
        return (
                <p>{this.props.data.name + ': ' + this.props.data.plusAction + " " + this.props.data.plusAction}</p>
        );
    }
});
