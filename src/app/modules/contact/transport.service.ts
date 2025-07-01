import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransportService {

  constructor(private http: HttpClient) { }

  getTransports(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.hostUrl}` + '/transport');
  }

  getTransport(id: string) {
    return this.http.get<any>(`${environment.hostUrl}` + '/transport/' + id);
  }

  createTransport(transport: any): Observable<any> {
    return this.http.post<any>(`${environment.hostUrl}` + '/transport', transport);
  }

  updateTransport(id: string, transport: any): Observable<any> {
    return this.http.put(`${environment.hostUrl}` + '/transport/' + id, transport);
  }

  deleteTransport(id: string): Observable<any> {
    return this.http.delete(`${environment.hostUrl}` + '/transport/' + id);
  }

  
}
