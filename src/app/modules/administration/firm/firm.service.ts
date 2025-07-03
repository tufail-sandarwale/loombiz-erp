import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirmService {

private baseUrl = `${environment.hostUrl}`
constructor(private http: HttpClient) { }

  getOrganizationList(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/organization`);
  } 

  createOrganization(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(`${this.baseUrl}/organization`, data, { headers: headers });
  }
  updateOrganization(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/organization/${id}`, data);
  }
  getFirmDataById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/organization/${id}`);
  }
}
