import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IntegrationService {
  private baseUrl = `${environment.hostUrl}`
  constructor(private http: HttpClient) { }
  addwhatsAppProvider(payload: { accountGroup: any}): Observable<any> {
    const accountData = JSON.stringify(payload)
    // console.log('accountgroup', groupData);
  
    return this.http.post<any>(`${this.baseUrl}/erp/notificationProvider`, accountData,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    );
  }
  updatewhatsAppProvider(id: any, accountGroupData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/erp/notificationProvider/` + id, accountGroupData);
  }
  getwhatsAppProvider():Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/erp/notificationProvider`);
  }
  // getAccountGroup():Observable<any>{
  //   return this.http.get<any>(`${this.baseUrl}/erp/accountGroup`);
  // }

  deletewhatsAppProvider(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/erp/notificationProvider/` + id);
  }
  
  
  download(filters: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/download`, { params: filters, responseType: 'blob' });
  }

 
}
