import React from 'react';

export default React.createClass({
    render: function() {
        return (
            <div className="col-xs-3">
                <h3>{this.props.data.name}</h3>
                <p>{this.props.data.expansion}</p>
            </div>
        );
    }
});
