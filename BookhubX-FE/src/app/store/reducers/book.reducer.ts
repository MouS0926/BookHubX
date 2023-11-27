import { Book } from "src/app/components/models/book.model";
import { createReducer, on } from '@ngrx/store'
import * as BookActions from '../actions/book.actions'

export interface BookState {
    books: Book[];
    loading: boolean;
    error: string | null;
  }
  
  export const initialState: BookState = {
    books: [],
    loading: false,
    error: null,
  };
  

  export const bookReducer = createReducer(
    initialState,
    on(BookActions.loadBooks, (state) => ({ ...state, loading: true })),
    on(BookActions.loadBooksSuccess, (state, { books }) => ({
      ...state,
      books,
      loading: false,
      error: null,
    })),
    on(BookActions.loadBooksFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    }))
  );