// src/components/BookForm/BookForm.js
import { useState, useContext } from 'react';
import { BookContext } from '../../context/BookContext';

const BookForm = ({ bookToEdit, onClose }) => {
  const { addBook, editBook } = useContext(BookContext);
  const [title, setTitle] = useState(bookToEdit ? bookToEdit.title : '');
  const [author, setAuthor] = useState(bookToEdit ? bookToEdit.author : '');
  const [status, setStatus] = useState(bookToEdit ? bookToEdit.status : 'owned');
  const [errors, setErrors] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!author.trim()) newErrors.author = 'Author is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const book = { title, author, status };
    if (bookToEdit) {
      editBook({ ...book, id: bookToEdit.id });
    } else {
      addBook(book);
    }
    onClose();
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setSearchLoading(true);
    try {
      const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(searchQuery)}&limit=5`);
      const data = await response.json();
      setSearchResults(data.docs.map(doc => ({
        title: doc.title,
        author: doc.author_name ? doc.author_name.join(', ') : 'Unknown',
        key: doc.key
      })));
    } catch (error) {
      console.error('Search error:', error);
    }
    setSearchLoading(false);
  };

  const selectBook = (book) => {
    setTitle(book.title);
    setAuthor(book.author);
    setSearchResults([]);
    setSearchQuery('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Search Books (via Open Library):</label>
        <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        <button type="button" onClick={handleSearch} disabled={searchLoading}>
          {searchLoading ? 'Searching...' : 'Search Books'}
        </button>
      </div>
      {searchResults.length > 0 && (
        <ul>
          {searchResults.map((result, index) => (
            <li key={index}>
              {result.title} by {result.author}
              <button type="button" onClick={() => selectBook(result)}>Select</button>
            </li>
          ))}
        </ul>
      )}
      <div>
        <label>Title:</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        {errors.title && <span>{errors.title}</span>}
      </div>
      <div>
        <label>Author:</label>
        <input value={author} onChange={(e) => setAuthor(e.target.value)} />
        {errors.author && <span>{errors.author}</span>}
      </div>
      <div>
        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="owned">Owned</option>
          <option value="reading">Reading</option>
          <option value="toBuy">To Buy</option>
        </select>
      </div>
      <button type="submit">{bookToEdit ? 'Update' : 'Add'} Book</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default BookForm;