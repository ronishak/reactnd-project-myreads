import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';

class Book extends Component {

  update(shelf,book) {
    this.props.bookMover(shelf,book) // updates on state level
    BooksAPI.update(book, shelf) // updates on the API Level
  }

  checkShelf() {
    if (this.props.book.shelf) {
      return this.props.book.shelf
    } else {
      return this.props.shelfCheck(this.props.book);
    }
  }

  render() {
    let selectedBook = this.props.book;
    let author = selectedBook.authors ? selectedBook.authors.join(', ') : null;

    return (
      <div id={selectedBook.id} className="book">
        <div className="book-top">
          <img className="book-cover" alt={selectedBook.title} src={selectedBook.imageLinks.smallThumbnail}></img>
          <div className="book-shelf-changer">
            <select value={this.checkShelf()} onChange={(e)=> {this.update(e.target.value, selectedBook)}}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead" >Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{selectedBook.title}</div>
        <div className="book-authors">{author}</div>
      </div>
    )
  }
}

export default Book
