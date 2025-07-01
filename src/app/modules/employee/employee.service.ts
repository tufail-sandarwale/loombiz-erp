import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.hostUrl}` + '/user');
  }

  getUser(id: string) {
    return this.http.get<any>(`${environment.hostUrl}` + '/user/' + id);
  }

  createUser(user: any): Observable<any> {
    return this.http.post<any>(`${environment.hostUrl}` + '/user', user);
  }

  updateUser(id: string, user: any): Observable<any> {
    return this.http.put(`${environment.hostUrl}` + '/user/' + id, user);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${environment.hostUrl}` + '/user/' + id);
  }

  updatePreference(id: string, preferences: any) {
    return this.http.patch(`${environment.hostUrl}/user/${id}/preference`, preferences);
  }
}
