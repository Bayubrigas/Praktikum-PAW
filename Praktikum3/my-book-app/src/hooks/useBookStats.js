// src/hooks/useBookStats.js
import { useContext } from 'react';
import { BookContext } from '../context/BookContext';

const useBookStats = () => {
  const { allBooks } = useContext(BookContext);

  const stats = {
    owned: allBooks.filter((b) => b.status === 'owned').length,
    reading: allBooks.filter((b) => b.status === 'reading').length,
    toBuy: allBooks.filter((b) => b.status === 'toBuy').length,
    total: allBooks.length,
  };

  return stats;
};

export default useBookStats;