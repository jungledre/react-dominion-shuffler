import _ from 'lodash';

module.exports = {
    getDeckByExpansionName: function (deck, expansion) {
        return _(deck)
            .where({ expansion: expansion })
            .sample(10)
            .sortBy('plusAction').value();
    }
}
