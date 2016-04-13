var View = require('./ttt-view');
var Game = require('../../ttt-core-solution/game');

$(function () {
  var containerEl = $('.ttt');
  var game = new Game();
  new View(game, containerEl);
});
