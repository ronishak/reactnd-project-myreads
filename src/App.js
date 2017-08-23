import React, { Component } from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Bookshelf from './Bookshelf'
import './App.css'

class BooksApp extends Component {

  constructor() {
    super();
    this.moveBook = this.moveBook.bind(this)
  }

  state = {
    books: [],
    shelves: [{
        shelfName:"Currently Reading",
        shelfId:"currentlyReading"
      },{
        shelfName:"Want to Read",
        shelfId:"wantToRead"
      },{
        shelfName:"Read",
        shelfId:"read"
      }
    ]
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  bookFilter(shelfId) {
    return this.state.books.filter((book) => (
      book.shelf === shelfId
    ))
  }

  moveBook(shelf, bookId) {
    const newBooks = this.state.books.map((book) => {
      if (book.id === bookId) {
        book.shelf = shelf;
      }
      return book;
    })

    this.setState({
      books: newBooks
    })
  }

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Route exact path='/' render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  {this.state.shelves.map((shelf) => (
                    <Bookshelf
                      shelf={shelf.shelfName}
                      key={shelf.shelfId}
                      books={this.bookFilter(shelf.shelfId)}
                      moveFunction={this.moveBook}
                    />
                  ))}
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          )}/>
          <Route path='/search' render={() => (
            <div className="search-books">
              <div className="search-books-bar">
                <Link className="close-search" to="/">Close</Link>
                <div className="search-books-input-wrapper">
                  {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                    */}
                  <input type="text" placeholder="Search by title or author"/>
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
                  
                </ol>
              </div>
            </div>
          )}/>
        </div>
      </BrowserRouter>
    )
  }
}

export default BooksApp
