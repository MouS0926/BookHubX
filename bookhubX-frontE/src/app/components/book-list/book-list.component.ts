import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Observable} from "rxjs"
import { Book } from '../models/book.model';
import { Store } from '@ngrx/store';
import * as BookSelectors from "../../store/selectors/book.selectors"
import * as BookActions from "../../store/actions/book.actions"
@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit{

  books$: Observable<Book[]>;
  loading$: Observable<boolean>;
  error$: Observable<string|null>;

  constructor(private store: Store) {
    this.books$ = this.store.select(BookSelectors.selectAllBooks);
    this.loading$ = this.store.select(BookSelectors.selectBooksLoading);
    this.error$ = this.store.select(BookSelectors.selectBooksError);
  }



  ngOnInit(): void {
   

    this.store.dispatch(BookActions.loadBooks())
  }

  
}
