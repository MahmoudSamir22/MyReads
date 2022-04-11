import React from "react";
import { Route, Routes } from "react-router-dom";
import { getAll, update } from "./BooksAPI";
import "./App.css";
import BookList from "./bookList";
import Search from "./search";

class BooksApp extends React.Component {
  state = {
    books: [],
  };
  componentDidMount = async () => {
    let books = await getAll();
    this.setState({ books });
  };

  bookUpdate = async (book, shelf) => {
    await update(book, shelf);
    let books = await getAll();
    this.setState({ books });
  };

  render() {
    return (
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <BookList
                updateBook={this.bookUpdate}
                books={this.state.books}
                displayBooks={this.displayBooks}
              />
            }
          />
          <Route
            path="/search"
            element={<Search updateBook={this.bookUpdate} />}
          />
        </Routes>
      </div>
    );
  }
}

export default BooksApp;
