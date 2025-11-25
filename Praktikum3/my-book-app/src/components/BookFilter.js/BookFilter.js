// src/components/BookFilter/BookFilter.js
import { useContext } from 'react';
import { BookContext } from '../../context/BookContext';

const BookFilter = () => {
  const { setFilter, setSearchTerm } = useContext(BookContext);

  return (
    <div>
      <select onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="owned">Owned</option>
        <option value="reading">Reading</option>
        <option value="toBuy">To Buy</option>
      </select>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default BookFilter;