import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountGroupService {
 private baseUrl = `${environment.hostUrl}`
  constructor(private http: HttpClient) { }
  addAccountGroup(payload: { tax: any}): Observable<any> {
    const groupData = JSON.stringify(payload)
    // console.log('accountgroup', groupData);
  
    return this.http.post<any>(`${this.baseUrl}/erp/accountGroup`, groupData,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    );
  }
  updateAccountGroup(id: any, accountGroupData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/erp/accountGroup/` + id, accountGroupData);
  }
  getAccountGroup():Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/erp/accountGroup`);
  }
  deleteAccountGroup(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/erp/accountGroup/` + id);
  }
  
  getParentGroup(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/erp/parentGroup`);
  }
  download(filters: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/download`, { params: filters, responseType: 'blob' });
  }

}
