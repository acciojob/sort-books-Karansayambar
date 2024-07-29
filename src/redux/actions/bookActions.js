// src/redux/actions/bookActions.js
import axios from "axios";
import {
  FETCH_BOOKS_FAILURE,
  FETCH_BOOKS_REQUEST,
  FETCH_BOOKS_SUCCESS,
} from "../actionTypes";

export const fetchBooksRequest = () => ({
  type: FETCH_BOOKS_REQUEST,
});

export const fetchBooksSuccess = (books) => ({
  type: FETCH_BOOKS_SUCCESS,
  payload: books,
});

export const fetchBooksFailure = (error) => ({
  type: FETCH_BOOKS_FAILURE,
  payload: error.message || "An error occurred",
});

export const fetchBooks = () => {
  return async (dispatch) => {
    dispatch(fetchBooksRequest());
    try {
      const url = "https://jsonplaceholder.typicode.com/posts";
      const response = await axios.get(url);
      const books = response.data;
      dispatch(fetchBooksSuccess(books));
    } catch (error) {
      console.log(error);
      dispatch(fetchBooksFailure(error));
    }
  };
};
