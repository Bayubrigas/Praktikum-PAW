// src/pages/Home/Home.js
import { useState } from 'react';
import BookForm from '../../components/BookForm/BookForm';
import BookList from '../../components/BookList/BookList';
import BookFilter from '../../components/BookFilter/BookFilter';

const Home = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <h1>Book Management</h1>
      <BookFilter />
      <button onClick={() => setShowForm(true)}>Add New Book</button>
      {showForm && <BookForm onClose={() => setShowForm(false)} />}
      <BookList />
    </div>
  );
};

export default Home;