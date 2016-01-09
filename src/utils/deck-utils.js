import _ from 'lodash';

module.exports = {
  getDeckByExpansionName(deck, expansion) {
    return _(deck)
        .where({ expansion })
        .sample(10)
        .sortBy('plusAction').value();
  },
};
