var _ = require('lodash');

var Book = function(author, title, genre, price, noOfPages, controversial){
  this.author = author;
  this.title = title;
  this.genre = genre;
  this.price = price;
  this.noOfPages = noOfPages;
  this.controversial = controversial;
}

Book.prototype = {

  wholeBook: function(){
    return "Author is " + this.author + ", title is " + this.title +", genre is " + this.genre + ", the price is £" + this.price + ", number of pages ages is " + this.noOfPages + " and the book is controversial: " + this.controversial;
  }

}

module.exports = Book;