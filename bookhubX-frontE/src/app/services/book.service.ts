import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../components/models/book.model';
@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl = 'http://localhost:8080'

  constructor(private http:HttpClient) { }

  getAllBooks(): Observable<Book[]> {
    const url = `${this.baseUrl}/books`;
    return this.http.get<Book[]>(url);
  }
  
}
