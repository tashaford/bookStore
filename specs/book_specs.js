var assert = require('assert');
var Book = require('../book.js');

describe('Book', function(){
  var book;

  beforeEach(function(){
    book = new Book('J.R.R. Tolkien', "The Hobbit", "Kids", 7, 100, true);
  });

  it("should be able to get author", function() {
    assert.strictEqual(book.author, "J.R.R. Tolkien");
  });

  it("should be able to get title", function() {
    assert.strictEqual(book.title, "The Hobbit");
  });

  it("should be able to get genre", function() {
    assert.strictEqual(book.genre, "Kids");
  });

  it("should be able to get number of pages", function(){
    assert.strictEqual(book.noOfPages, 100);
  })

  it("should be able to get price", function() {
    assert.strictEqual(book.price, 7);
  });

  it("should be able to get all details of book", function(){
    assert.strictEqual(book.wholeBook(), "Author is J.R.R. Tolkien, title is The Hobbit, genre is Kids, the price is £7, number of pages ages is 100 and the book is controversial: true");
  });

})