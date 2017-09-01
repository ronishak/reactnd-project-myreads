import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'

class Book extends Component {
  update (shelf, book) {
    this.props.bookMover(shelf, book.id, book) // updates on state level
    BooksAPI.update(book, shelf) // updates on the API Level
  }

  render () {
    const book = this.props.book
    const author = book.authors ? book.authors.join(', ') : null
    return (
      <div id={book.id} className='book'>
        <div className='book-top'>
          <img
            className='book-cover'
            alt={this.props.book.title}
            src={this.props.book.imageLinks.smallThumbnail}
          />
          <div className='book-shelf-changer'>
            <select
              value={book.shelf}
              onChange={e => {
                this.update(e.target.value, book)
              }}
            >
              <option value='none' disabled>Move to...</option>
              <option value='currentlyReading'>Currently Reading</option>
              <option value='wantToRead'>Want to Read</option>
              <option value='read'>Read</option>
              <option value='none'>None</option>
            </select>
          </div>
        </div>
        <div className='book-title'>{this.props.book.title}</div>
        <div className='book-authors'>{author}</div>
      </div>
    )
  }
}

export default Book
