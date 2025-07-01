import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http: HttpClient) { }

  getRoles(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.hostUrl}/role`);
  }

  addRole(role): Observable<any> {
    return this.http.post<any>(`${environment.hostUrl}/role`, role);
  }

  getRole(id): Observable<any> {
    return this.http.get<any>(`${environment.hostUrl}/role/${id}`);
  }

  updateRole(id, role): Observable<any> {
    return this.http.put<any>(`${environment.hostUrl}/role/` + id, role);
  }

  deleteRole(id): Observable<any> {
    return this.http.delete<any>(`${environment.hostUrl}/role/` + id);
  }
}
