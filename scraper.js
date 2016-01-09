'use strict';

var request = require('request');
var cheerio = require('cheerio');
var _ = require('lodash');
var fs = require('fs');

var url = 'http://dominiongame.info/2012/08/dominion-cards/';
var attrPath = '#wp-table-reloaded-id-13-no-1 > tbody > tr';

var allCards = [];

var createCard = function (thisCard) {
  var cardDescription = thisCard.children('.column-4').text();
  var cardCost = thisCard.children('.column-2').text();
  var cardName = thisCard.children('.column-1').text();

  var imgPath = 'https://s3-us-west-2.amazonaws.com/dominiongirl/card_images/';

  var card = {
    'name': cardName,
    'expansion': thisCard.children('.column-5').text(),
    'type': thisCard.children('.column-3').text(),
    'trash': !!(cardDescription.match(/Trash/i)),
    'plusAction': parseInt((cardDescription.match(/(\d+) Action/) || [])[1]) || 0,
    'plusCoin': parseInt((cardDescription.match(/(\d+) Coin/) || [])[1]) || 0,
    'plusBuy': parseInt((cardDescription.match(/(\d+) Buy/) || [])[1]) || 0,
    'costTreasure': parseInt((cardCost.match(/(\d+)\+? Coin/) || [])[1]) || 0,
    'costPotions': parseInt((cardCost.match(/(\d+) Potion/) || [])[1]) || 0,
    'image': imgPath + cardName.replace(/[\s-'\u0092]/g, '').toLowerCase() + '.jpg'
  };
  allCards.push(card);
};

var updateCard = function () {
  var updateCards = _.filter(allCards, function (card) {
    var wrongCards = ['Platinum', 'Potion', 'Colony'];
    var updatedCard;
    for (var i = 0; i < wrongCards.length; i++) {
        updatedCard = _.findWhere(allCards, { name: wrongCards[i] });
        updatedCard.cardType = 'Setup';
      }
    return allCards;
  });
};

request(url, function (error, response, body) {
  if (!error && response.statusCode === 200) {
    // console.log(body) // Print the google web page.
    var $ = cheerio.load(body);
    var cards = $(attrPath);

    for (var i = 0; i < cards.length; i++) {
      var thisCard = $(cards[i]);
      createCard(thisCard);
    }

    updateCard();

    allCards = {
      cards: _.toArray(allCards)
    };

    fs.writeFile('./js/data/cards.json', JSON.stringify(allCards, null, '  '), 'utf-8');
  }
});
