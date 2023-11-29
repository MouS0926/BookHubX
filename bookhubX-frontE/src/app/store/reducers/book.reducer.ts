import { createReducer, on } from "@ngrx/store";
import { Book } from "../../components/models/book.model";
import * as BookActions from "../actions/book.actions"

export interface BookState{
    books:Book[];
    loading:boolean,
    error:string |null
}

export const initialState:BookState={
    books:[],
    loading:false,
    error:null
}


export const bookReducer=createReducer(initialState,

on(BookActions.loadBooks,(state)=>({...state,loading:true})), 

on(BookActions.loadBooksSuccess, (state, { books }) => ({
    ...state,
    books,
    loading: false,
    error: null,
  })),
  
  on(BookActions.loadBooksfailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))

)