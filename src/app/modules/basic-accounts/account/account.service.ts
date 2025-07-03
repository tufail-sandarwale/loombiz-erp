import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl = `${environment.hostUrl}`
  constructor(private http: HttpClient) { }
  addAccount(payload: { accountGroup: any}): Observable<any> {
    const accountData = JSON.stringify(payload)
    // console.log('accountgroup', groupData);
  
    return this.http.post<any>(`${this.baseUrl}/erp/account`, accountData,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    );
  }
  updateAccount(id: any, accountGroupData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/erp/account/` + id, accountGroupData);
  }
  getAccount():Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/erp/account`);
  }
  getAccountGroup():Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/erp/accountGroup`);
  }

  deleteAccount(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/erp/account/` + id);
  }
  
  
  download(filters: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/download`, { params: filters, responseType: 'blob' });
  }

  getAccountsByParentGroup(parentGroupName: string):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/erp/account/byParentGroup/${parentGroupName}`);
  }
}
