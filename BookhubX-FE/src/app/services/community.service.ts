import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {

  private apiUrl = 'http://localhost:8080'; // Adjust the API URL

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/allusers`);
  }

}
