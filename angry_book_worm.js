var BookWorm = require('./book_worm.js');
var _ = require('lodash');

var AngryBookWorm = function(name, cash){
  BookWorm.call(this, name, cash);
};

AngryBookWorm.prototype = _.extend(BookWorm.prototype, {
  burnBook: function(book){
    return book.controversial ? "This book is concontroversial and has been burned" : "This book is not concontroversial.";
  },

  readBook:function(book){
    return book.controversial ? "Oh no!" : "I like this book!";
  },

  ripPages: function(book){
    book.controversial ? book.noOfPages -= _.random(1, book.noOfPages) : book.noOfPages;
  }

});

module.exports = AngryBookWorm;