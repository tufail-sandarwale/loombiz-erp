import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BankService {

 
  private baseUrl = `${environment.hostUrl}`

  constructor(private http: HttpClient) { }

  addBank(bankData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.baseUrl}/erp/bankDetails`, bankData, { headers: headers });
  }
  getBank(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/erp/bankDetails`);
  }
  getBankById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/erp/bankDetails/${id}`);
   
  }
  updateBank(id: string, bankDetails: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/erp/bankDetails/${id}`, bankDetails);
  }
  deleteBank(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/erp/bankDetails/` + id);
  }
  getAccountGroups(): Observable<any> {
    return this.http.get<any>(`${environment.hostUrl}/erp/accountGroup`);
  }

}
