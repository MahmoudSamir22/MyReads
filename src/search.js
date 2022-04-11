import React, { Component } from "react";
import { Link } from "react-router-dom";
import Book from "./book";
import { search } from "./BooksAPI";

class Search extends Component {
  state = {
    data: [],
  };
  searchBooks = async (e) => {
    e.preventDefault();
    let newQuery = e.target.value;
    let data = await search(newQuery);
    if (Array.isArray(data)) {
      this.setState({ data });
    } else this.setState({ data: [] });
    // console.log(data);
  };
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to="/"
            className="close-search"
            // onClick={() => this.setState({ showSearchPage: false })}
          >
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.searchBooks}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.data.map((book) => (
              <Book
                key={book.id}
                bookData={book}
                updateBook={this.props.updateBook}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
