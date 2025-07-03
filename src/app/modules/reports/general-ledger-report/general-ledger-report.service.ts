import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable,of } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class GeneralLedgerReportService {


 private baseUrl = `${environment.hostUrl}`
  constructor(private http: HttpClient) { }
  getGeneralLedger(accountId: string, startDate: string, endDate: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/erp/generalLedger/account?accountId=${accountId}&startDate=${startDate}&endDate=${endDate}`,).pipe(
      catchError(error => {
        console.error('Error fetching general ledger data:', error);
        return of([]);
      })  
    );
  }

  getAccountGroup():Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/erp/accountGroup`);
  }
  getAccount():Observable<any>{
    return this.http.get<any>(`${environment.hostUrl}/erp/account`);
  }
  
  download(filters: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/download`, { params: filters, responseType: 'blob' });
  }

}
