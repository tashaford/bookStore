var _ = require('lodash');

var BookWorm = function(name, cash){
  this.name = name;
  this.cash = cash;
  this.collection = [];
};

BookWorm.prototype = {

  buyBook: function(buyBook){
    if(this.cash - buyBook.price > 0){
      this.collection.push(buyBook);
      this.cash -= buyBook.price;
    }
  },

  sellBook: function(sellBook){
    _.remove(this.collection, function(book){
      return book === sellBook;
    });
    this.cash += sellBook.price;
  },

  collectionValue: function(){
    return _.sumBy(this.collection, "price");
  },

  collectionValueByGenre: function(genre){
    var total = 0;
    this.collection.filter(function(book){
      if(book.genre === genre){
        return total += book.price;
      };
    })
    return total;
  },

  largestBook: function(){
    return _.maxBy(this.collection, "noOfPages");
  },

  sortByValue: function(highLow){
    return highLow === "low" ? _.sortBy(this.collection, "price") : highLow === "high" ? _.sortBy(this.collection, "price").reverse() : "error";
  },

  compareWith: function(bookworm){
    return this.collectionValue() > bookworm.collectionValue() ? this.name + " has the highest collection value" : bookworm.name + " has the highest collection value";
  }

};


module.exports = BookWorm;