import React from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BookSearchParams } from './types/books.types';
import Search from './components/Search/Search';
import BookList from './components/Book/BookList';
import { Outlet } from 'react-router';

const App = () => {
  return (
    <div className="App">
      <Search />
      <Outlet />
    </div>
  );
}

export default App;
