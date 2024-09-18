import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transport } from '../../models/transport'; // Adjust the import path as needed

@Injectable({
  providedIn: 'root'
})
export class TransportService {
  private apiUrl = 'http://localhost:8081/api/transport';

  constructor(private http: HttpClient) {}

  getTransports(): Observable<Transport[]> {
    return this.http.get<Transport[]>(this.apiUrl);
  }
}
