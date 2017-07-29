var _ = require("lodash");

var BookStore = function(storeName, storeCity, balance){
  this.storeName = storeName;
  this.storeCity = storeCity;
  this.balance = balance;
  this.inventory = [];
};

BookStore.prototype = {
  addBookToInventory: function(book){
    this.inventory.push(book);
  },

  fullInventoryList: function(){
    var list = this.inventory.map(function(book){
       return book.wholeBook();
    });
    return list;
  },

  sellBook: function(sellBook, customer){
    this.balance += sellBook.price;
    customer.buyBook(sellBook);
    _.remove(this.inventory, sellBook);
  },

  financeSit: function(){
    var bookTotal = _.sumBy(this.inventory, "price");
    return bookTotal + this.balance;
  },

  booksByGenre: function(genre){
    return this.inventory.filter(function(book){
      if(book.genre === genre){
        return book;
      };
    })
  },

  buyBook: function(buyBook, customer){
    this.balance -= buyBook.price;
    this.addBookToInventory(buyBook);
    customer.sellBook(buyBook);
  }

};

module.exports = BookStore;