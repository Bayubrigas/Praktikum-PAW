// src/components/BookForm/BookForm.test.js
// (Updated with additional tests for search functionality; total now >5)

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BookForm from './BookForm';
import { BookContext } from '../../context/BookContext';

const mockAddBook = jest.fn();
const mockEditBook = jest.fn();

const MockProvider = ({ children }) => (
  <BookContext.Provider value={{ addBook: mockAddBook, editBook: mockEditBook }}>
    {children}
  </BookContext.Provider>
);

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ docs: [{ title: 'Test Book', author_name: ['Test Author'], key: '/works/OL1W' }] }),
  })
);

test('renders form fields', () => {
  render(<MockProvider><BookForm onClose={() => {}} /></MockProvider>);
  expect(screen.getByLabelText(/Title/)).toBeInTheDocument();
  expect(screen.getByLabelText(/Author/)).toBeInTheDocument();
  expect(screen.getByLabelText(/Status/)).toBeInTheDocument();
});

test('shows errors on invalid submit', () => {
  render(<MockProvider><BookForm onClose={() => {}} /></MockProvider>);
  fireEvent.click(screen.getByText(/Add Book/));
  expect(screen.getByText(/Title is required/)).toBeInTheDocument();
  expect(screen.getByText(/Author is required/)).toBeInTheDocument();
});

test('calls addBook on valid submit', () => {
  render(<MockProvider><BookForm onClose={() => {}} /></MockProvider>);
  fireEvent.change(screen.getByLabelText(/Title/), { target: { value: 'Test Title' } });
  fireEvent.change(screen.getByLabelText(/Author/), { target: { value: 'Test Author' } });
  fireEvent.click(screen.getByText(/Add Book/));
  expect(mockAddBook).toHaveBeenCalledWith(expect.objectContaining({ title: 'Test Title', author: 'Test Author' }));
});

test('calls editBook when editing', () => {
  const book = { id: 1, title: 'Old', author: 'Old', status: 'owned' };
  render(<MockProvider><BookForm bookToEdit={book} onClose={() => {}} /></MockProvider>);
  fireEvent.change(screen.getByLabelText(/Title/), { target: { value: 'New Title' } });
  fireEvent.click(screen.getByText(/Update Book/));
  expect(mockEditBook).toHaveBeenCalledWith(expect.objectContaining({ id: 1, title: 'New Title' }));
});

test('cancels form', () => {
  const mockClose = jest.fn();
  render(<MockProvider><BookForm onClose={mockClose} /></MockProvider>);
  fireEvent.click(screen.getByText(/Cancel/));
  expect(mockClose).toHaveBeenCalled();
});

test('performs book search and displays results', async () => {
  render(<MockProvider><BookForm onClose={() => {}} /></MockProvider>);
  fireEvent.change(screen.getByLabelText(/Search Books/), { target: { value: 'Test' } });
  fireEvent.click(screen.getByText(/Search Books/));
  await waitFor(() => expect(screen.getByText(/Test Book by Test Author/)).toBeInTheDocument());
});

test('selects a search result and populates fields', async () => {
  render(<MockProvider><BookForm onClose={() => {}} /></MockProvider>);
  fireEvent.change(screen.getByLabelText(/Search Books/), { target: { value: 'Test' } });
  fireEvent.click(screen.getByText(/Search Books/));
  await waitFor(() => fireEvent.click(screen.getByText(/Select/)));
  expect(screen.getByLabelText(/Title/).value).toBe('Test Book');
  expect(screen.getByLabelText(/Author/).value).toBe('Test Author');
});