// src/components/BookList.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../../redux/actions/bookActions';

const BookList = () => {
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => state.books);
  const [sortCriterion, setSortCriterion] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleSortCriterionChange = (e) => {
    setSortCriterion(e.target.value);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const sortBooks = (books) => {
    return [...books].sort((a, b) => {
      // Ensure the properties exist and provide default empty strings if not
      const valueA = a[sortCriterion] ? a[sortCriterion].toString().toLowerCase() : '';
      const valueB = b[sortCriterion] ? b[sortCriterion].toString().toLowerCase() : '';

      if (sortOrder === 'asc') {
        return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
      } else {
        return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
      }
    });
  };

  const sortedBooks = sortBooks(books);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    const errorMessage = typeof error === 'object' && error.message ? error.message : error;
    return <div>Error: {errorMessage}</div>;
  }

  return (
    <div>
      <h1>Book List</h1>
      <div>
        <label>Sort by: </label>
        <select value={sortCriterion} onChange={handleSortCriterionChange}>
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="publisher">Publisher</option>
        </select>
        <label> Order: </label>
        <select value={sortOrder} onChange={handleSortOrderChange}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <ul>
        {sortedBooks.map((book) => (
          <li key={book.id}>
            <h2>{book.title}</h2>
            <p>{book.body}</p>
            <img src="https://via.placeholder.com/150" alt={book.title} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
