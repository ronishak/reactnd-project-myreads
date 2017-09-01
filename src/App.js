import React, { Component } from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Bookshelf from './Bookshelf'
import Search from './Search'
import './App.css'

class BooksApp extends Component {

  constructor() {
    super();
    this.moveBook = this.moveBook.bind(this)
    this.shelfCheck = this.shelfCheck.bind(this)
    this.search = this.search.bind(this)
    this.timeout =  0;
  }

  state = {
    books: [],
    searchResults: [],
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

  shelfCheck(selectedBook) {
    // TODO: REFACTOR THIS
    var matchingBookArray = this.state.books.filter((book) => {
      return book.id === selectedBook.id
    })
    if (matchingBookArray.length === 1 ) {
      return matchingBookArray[0].shelf
    } else {
      return 'none'
    }
  }

  clearSearch() {
    this.setState({
      searchResults: []
    })
  }

  search(query) {
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      if(query){ // catch empty query
        BooksAPI.search(query,20).then(results => {
          if (!results.error) {
            this.setState({
              searchResults: results
            })
          } else {
            alert(results.error)
            this.clearSearch()
          }
        })
      } else {
        this.clearSearch()
      }
    }, 500);
  }

  moveBook(shelf, selectedBook) {
    let newBooks = this.state.books.filter( book => {
      return book.id !== selectedBook.id;
    });
    selectedBook.shelf = shelf;
    newBooks.push(selectedBook)
    this.setState({
      books: newBooks
    });
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
            <Search
              searchFunction={this.search}
              searchResults={this.state.searchResults}
              moveFunction={this.moveBook}
              shelfCheck={this.shelfCheck}
            />
          )}/>
        </div>
      </BrowserRouter>
    )
  }
}

export default BooksApp
