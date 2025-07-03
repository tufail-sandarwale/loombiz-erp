import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

private baseUrl = `${environment.hostUrl}`
constructor(private http: HttpClient) { }

  getBranchList(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/branch`);
  } 

  createBranch(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(`${this.baseUrl}/branch`, data, { headers: headers });
  }
  updateOrganization(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/branch/${id}`, data);
  }
  getStoreDataById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/branch/${id}`);
  }
}
