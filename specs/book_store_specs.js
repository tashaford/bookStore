var assert = require('assert');
var BookStore = require('../book_store.js');
var Book = require('../book.js');
var BookWorm = require('../book_worm.js')

describe('Book Store', function(){
  var bookStore;
  var book1;
  var book2;
  var book3;
  var bw;

  beforeEach(function(){
    bookStore = new BookStore('Waterstones', 'Glasgow', 100);
    book1 = new Book('J.R.R. Tolkein', "The Hobbit", "Kids", 7, 1389, true);
    book2 = new Book('Patrick Rothfuss', "The Name of the Wind", "Fantasy", 8, 1345, true);
    book3 = new Book('Patrick Rothfuss', "A Wise Man's Fears", "Fantasy", 8, 976, true);
    bw = new BookWorm("Natasha", 10);
    bookStore.addBookToInventory(book1);
    bookStore.addBookToInventory(book2);
    bookStore.addBookToInventory(book3);
  });

  it("should be able to get store name", function() {
    assert.strictEqual(bookStore.storeName, "Waterstones");
  });

  it("should be able to get store city", function() {
    assert.strictEqual(bookStore.storeCity, "Glasgow");
  });

  it("should be able to get store balance", function(){
    assert.strictEqual(bookStore.balance, 100);
  })

  it("should be able to add book to inventory", function(){
    assert.strictEqual(bookStore.inventory.length, 3);
  });

  it("should be able to get full inventory list", function(){
    var expected = ["Author is J.R.R. Tolkein, title is The Hobbit, genre is Kids, the price is £7, number of pages ages is 1389 and the book is controversial: true", "Author is Patrick Rothfuss, title is The Name of the Wind, genre is Fantasy, the price is £8, number of pages ages is 1345 and the book is controversial: true", "Author is Patrick Rothfuss, title is A Wise Man's Fears, genre is Fantasy, the price is £8, number of pages ages is 976 and the book is controversial: true"];
    assert.deepEqual(bookStore.fullInventoryList(), expected);
  });

  it("should be able to change balance when book sold", function(){
    bookStore.sellBook(book1, bw);
    assert.strictEqual(bookStore.balance, 107);
    var expected = ["Author is Patrick Rothfuss, title is The Name of the Wind, genre is Fantasy, the price is £8, number of pages ages is 1345 and the book is controversial: true", "Author is Patrick Rothfuss, title is A Wise Man's Fears, genre is Fantasy, the price is £8, number of pages ages is 976 and the book is controversial: true"];
    assert.deepEqual(bookStore.fullInventoryList(), expected);
    assert.strictEqual(bw.cash, 3);
  });

  it("should be able to get financial situation of store", function(){
    assert.strictEqual(bookStore.financeSit(), 123)
  });

  it("should be able to get all books of a genre", function(){
    expected = [book2, book3];
    assert.deepEqual(bookStore.booksByGenre("Fantasy"), expected);
  });

  it("should be able to buy a book from customer", function(){
    var book = new Book('Richard Castle', "Heat Rises", "Crime", 4);
    bookStore.buyBook(book, bw);
    assert.strictEqual(bookStore.balance, 96);
    assert.strictEqual(bookStore.inventory.length, 4);
    assert.strictEqual(bw.cash, 14);
  })

})