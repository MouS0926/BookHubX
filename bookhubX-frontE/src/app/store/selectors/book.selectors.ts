// book.selectors.ts

import { createSelector, createFeatureSelector } from '@ngrx/store';
import { BookState } from '../reducers/book.reducer';


// Select the feature state
export const selectBookState = createFeatureSelector<BookState>('books');

// Select the books from the state
export const selectAllBooks = createSelector(
  selectBookState,
  (state) => state.books
);

// Select the loading state
export const selectBooksLoading = createSelector(
  selectBookState,
  (state) => state.loading
);

// Select the error state
export const selectBooksError = createSelector(
  selectBookState,
  (state) => state.error
);
