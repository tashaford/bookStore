var assert = require('assert');
var BookWorm = require('../book_worm.js');
var Book = require('../book.js');

describe('Book Worm', function(){
  var bookWorm;
  var bw;
  var book1;
  var book2;
  var book3;
  var book4;

  beforeEach(function(){
    bookWorm = new BookWorm("Natasha", 20);
    bw = new BookWorm("Euan", 30);
    book1 = new Book('Patrick Rothfuss', "The Name of the Wind", "Fantasy", 8, 1345, true);
    book2 = new Book('Patrick Rothfuss', "A Wise Man's Fears", "Fantasy", 8, 976, false);
    book3 = new Book('Richard Castle', "Heat Rises", "Crime", 6, 234, false);
    book4 = new Book('Richard Castle', "Frozen Heat", "Crime", 5, 275, false);
    bw.buyBook(book1);
    bw.buyBook(book2);
    bw.buyBook(book3);
    bw.buyBook(book4);
  });

  it("should be able to get cash", function() {
    assert.strictEqual(bookWorm.cash, 20);
  });

  it("should be able to buy book", function(){
    bookWorm.buyBook(book1);
    assert.strictEqual(bookWorm.collection.length, 1);
    assert.strictEqual(bookWorm.cash, 12);
  });

  it("should be able to sell book", function(){
    bookWorm.sellBook(book1);
    assert.strictEqual(bookWorm.collection.length, 0);
    assert.strictEqual(bookWorm.cash, 28);
  });

  it("should not be able to buy book if not enough in cash", function(){
    bookWorm.buyBook(book1);
    bookWorm.buyBook(book2);
    bookWorm.buyBook(book3);
    bookWorm.buyBook(book4);
    assert.strictEqual(bookWorm.cash, 4);
  });

  it("should be able to view total worth of book collection", function(){
    bookWorm.buyBook(book3);
    bookWorm.buyBook(book4);
    assert.strictEqual(bookWorm.collectionValue(), 11);
  });

  it("should be able to view total worth by genre", function(){
    bookWorm.buyBook(book2);
    bookWorm.buyBook(book3);
    bookWorm.buyBook(book4);
    assert.strictEqual(bookWorm.collectionValueByGenre("Crime"), 11);
  });

  it("should be able to get the book with the largest number of pages", function(){
    bookWorm.buyBook(book1);
    bookWorm.buyBook(book2);
    assert.strictEqual(bookWorm.largestBook(), book1);
  });

  it("should be able sort books by value", function(){
    bookWorm.buyBook(book2);
    bookWorm.buyBook(book3);
    bookWorm.buyBook(book4);
    assert.deepEqual(bookWorm.sortByValue("low"), [book4, book3, book2]);
    assert.deepEqual(bookWorm.sortByValue("high"), [book2, book3, book4]);
  });

  it("should be able to compare bookworms collection value", function(){
    bookWorm.buyBook(book2);
    bookWorm.buyBook(book3);
    assert.deepEqual(bookWorm.compareWith(bw), "Euan has the highest collection value");
  })

})