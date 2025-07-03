import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditNoteService {

  private baseUrl = `${environment.hostUrl}`

  constructor(private http: HttpClient) { }

  addCreditNote(creditData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.baseUrl}/erp/creditDebit`, creditData, { headers: headers });
  }
  getCreditNote(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/erp/creditDebit`);
  }
  getCreditNoteById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/erp/creditDebit/${id}`);
   
  }
  updateCreditNote(id: string, CreditNoteDetails: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/erp/creditDebit/${id}`, CreditNoteDetails);
  }
  deleteCreditNote(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/erp/creditDebit/` + id);
  }
 
  getAccount():Observable<any>{
    return this.http.get<any>(`${environment.hostUrl}/erp/account`);
  }
  download(filters: any): Observable<any> {
    return this.http.get(`${environment.hostUrl}/download`, { params: filters, responseType: 'blob' });
  }
}
