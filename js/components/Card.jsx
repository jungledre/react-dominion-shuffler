import React from 'react';

export default React.createClass({
    render: function() {
        return (
            <div className="dominion-card col-xs-5ths">
                <img src={this.props.data.image} />
            </div>
        );
    }
});
