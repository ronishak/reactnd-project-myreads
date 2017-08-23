import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';

class Book extends Component {

  // Todo: selected on option

  update(shelf,book) {
    this.props.bookMover(shelf,book.id)
    BooksAPI.update(book, shelf)
  }

  render() {
    const book = this.props.book
    return (
      <div className="book">
        <div className="book-top">
          <img className="book-cover" alt={this.props.book.title} src={this.props.book.imageLinks.smallThumbnail}></img>
          <div className="book-shelf-changer">
            <select onChange={(e)=> {this.update(e.target.value, book)}}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.book.title}</div>
        <div className="book-authors">{this.props.book.authors[0]}</div>
      </div>
    )
  }
}

export default Book
