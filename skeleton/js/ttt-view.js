var Game = require("../../ttt-core-solution/game");
var View = function (game, $el) {
  // $el points to .ttt which is the figure!
  this.game = game;
  this.$el = $el;

  this.setupBoard();

  this.bindEvents();
};

View.prototype.bindEvents = function () {
  this.$el.on("click", "li", (function(clicker) {
    var $square = $(clicker.currentTarget);

    this.makeMove($square);
  }).bind(this));
};

View.prototype.makeMove = function ($square) {
  var pos = $square.attr("pos").split(',')
            .map(function(el){return parseInt(el);});
  var currentPlayer = this.game.currentPlayer;
  var sym = currentPlayer.toString();


  try {
    this.game.playMove(pos);
    $square.addClass(currentPlayer);
    $square.text(sym);
  } catch (e) {
    alert("STUPID!!!");
  }


  if (this.game.isOver()) {
    alert(sym + " Won!");
    this.$el.off("click");
    // this.$el.append('<input class="restart" type="button" value="something" />');
    this.reset();

  }

};

View.prototype.setupBoard = function () {
  var $ul = $("<ul>");
  $ul.addClass("group");

  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      var $li = $("<li>");
      $li.attr("pos", [i,j]);
      $ul.append($li);
    }
  }
  this.$el.append($ul);
};

View.prototype.reset = function() {
  this.$el.children("ul").remove();
  this.game = new Game();
  this.setupBoard();
  this.bindEvents();
};

module.exports = View;
