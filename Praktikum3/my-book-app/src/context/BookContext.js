// src/context/BookContext.js
import { createContext, useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useLocalStorage('books', []);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const addBook = (book) => {
    setBooks([...books, { ...book, id: Date.now() }]);
  };

  const editBook = (updatedBook) => {
    setBooks(books.map((b) => (b.id === updatedBook.id ? updatedBook : b)));
  };

  const deleteBook = (id) => {
    setBooks(books.filter((b) => b.id !== id));
  };

  const filteredBooks = books
    .filter((book) => {
      if (filter === 'all') return true;
      return book.status === filter;
    })
    .filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <BookContext.Provider
      value={{
        books: filteredBooks,
        addBook,
        editBook,
        deleteBook,
        setFilter,
        setSearchTerm,
        allBooks: books, // For stats
      }}
    >
      {children}
    </BookContext.Provider>
  );
};