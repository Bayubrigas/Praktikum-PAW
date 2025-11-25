// src/components/BookList/BookList.js
import { useState, useContext } from 'react';
import { BookContext } from '../../context/BookContext';
import BookForm from '../BookForm/BookForm';

const BookList = () => {
  const { books, deleteBook } = useContext(BookContext);
  const [editingBook, setEditingBook] = useState(null);

  return (
    <div>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} by {book.author} - {book.status}
            <button onClick={() => setEditingBook(book)}>Edit</button>
            <button onClick={() => deleteBook(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {editingBook && (
        <BookForm bookToEdit={editingBook} onClose={() => setEditingBook(null)} />
      )}
    </div>
  );
};

export default BookList;