import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:8081/api/users/role'; // URL of your backend API

  constructor(private http: HttpClient) {}

  // Accept role as an argument in the login method
  login(username: string, password: string, role: string): Observable<boolean> {
    const url = `${this.apiUrl}/${role}`; // Append role to the API URL

    return this.http.get<any[]>(url).pipe(
      map((users) => {
        const user = users.find(
          (user) => user.username === username && user.password === password
        );
        return !!user; // Returns true if user is found, false otherwise
      })
    );
  }
}
