var assert = require('assert');
var BookWorm = require('../book_worm.js');
var Book = require('../book.js');
var AngryBookWorm = require('../book_worm.js');

describe('Angry Book Worm', function(){
  var angryBookWorm;
  var bw;
  var book1;
  var book2;
  var book3;

  beforeEach(function(){
    angry = new AngryBookWorm("Natasha", 20);
    bw = new BookWorm("Euan", 30);
    book1 = new Book('Patrick Rothfuss', "The Name of the Wind", "Fantasy", 12, 1345, true);
    book2 = new Book('Patrick Rothfuss', "A Wise Man's Fears", "Fantasy", 12, 976, false);
    book3 = new Book('Richard Castle', "Heat Rises", "Crime", 6, 234, false);
    bw.buyBook(book1);
    bw.buyBook(book2);
  });

  it("should be able to get cash", function() {
    assert.strictEqual(angry.cash, 20);
  });

  it("should be able to buy book", function(){
    angry.buyBook(book1);
    assert.strictEqual(angry.collection.length, 1);
    assert.strictEqual(angry.cash, 8);
  });

  it("should be able to sell book", function(){
    angry.sellBook(book1);
    assert.strictEqual(angry.collection.length, 0);
    assert.strictEqual(angry.cash, 32);
  });

  it("should not be able to buy book if not enough in cash", function(){
    angry.buyBook(book1);
    angry.buyBook(book2);
    assert.strictEqual(angry.cash, 8);
  });

  it("should be able to view total worth of book collection", function(){
    angry.buyBook(book1);
    angry.buyBook(book3);
    assert.strictEqual(angry.collectionValue(), 18);
  });

  it("should be able to view total worth by genre", function(){
    angry.buyBook(book2);
    angry.buyBook(book3);
    assert.strictEqual(angry.collectionValueByGenre("Fantasy"), 12);
  });

  it("should be able to get the book with the largest number of pages", function(){
    angry.buyBook(book1);
    angry.buyBook(book3);
    assert.strictEqual(angry.largestBook(), book1);
  });

  it("should be able sort books by value", function(){
    angry.buyBook(book2);
    angry.buyBook(book3);
    assert.deepEqual(angry.sortByValue("low"), [book3, book2]);
    assert.deepEqual(angry.sortByValue("high"), [book2, book3]);
  });

  it("should be able to compare bookworms collection value", function(){
    angry.buyBook(book2);
    angry.buyBook(book3);
    assert.deepEqual(angry.compareWith(bw), "Euan has the highest collection value");
  });

  it("should be able to burn controversial books", function(){
    assert.strictEqual(angry.burnBook(book1), "This book is concontroversial and has been burned");
  });

  it("should be able to rip out random num of pages from controversial book", function(){
    var before = book1.noOfPages;
    angry.ripPages(book1);
    assert.strictEqual(book1.noOfPages < before, true);
  });

  it("shouldn't be able to read a controversial book", function(){
    assert.strictEqual(angry.readBook(book1), "Oh no!");
    assert.strictEqual(angry.readBook(book2), "I like this book!");
  });


})