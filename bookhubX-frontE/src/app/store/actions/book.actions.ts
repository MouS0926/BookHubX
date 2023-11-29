import { createAction, props } from "@ngrx/store";
import { Book } from "../../components/models/book.model";


export const loadBooks=createAction('[Book] Load Books')

export const loadBooksSuccess=createAction('[Book] Load Books Success', props<{books:Book[]}>())

export const loadBooksfailure= createAction('[Book] Load Books Failure', props<{error:string}>())