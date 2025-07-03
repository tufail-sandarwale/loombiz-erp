import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'app/core/modal/product';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {


  receiptBaseUrl = `${environment.hostUrl}/erp/receipt`;
  saleOrder = `${environment.hostUrl}/erp/pos/saleOrder`;

  constructor(private httpClient: HttpClient) { }


  //   getReceipts(): Observable<any[]> { 
  //    return this.httpClient.get<any>(`${this.receiptBaseUrl}`);
  //  }

  getReceipts(pageNumber, page, sort, extraParamObject): Observable<any> {
    let params = new HttpParams();
    if (extraParamObject && Object.keys(extraParamObject).length) {
      params = new HttpParams({ fromObject: extraParamObject })
    }
    params = params.append("page", pageNumber)
    params = params.append("size", page)
    params = params.append("sort", sort)
    return this.httpClient.get<any>(this.receiptBaseUrl, { params: params });
  }
  addReceipt(paymentData: any): Observable<any> {
    return this.httpClient.post<any>(this.receiptBaseUrl, paymentData);
  }

  updateReceipt(id: string, receipt: any): Observable<any> {
    return this.httpClient.put<any>(`${this.receiptBaseUrl}/${id}`, receipt);
  }
  getReceiptById(id: string): Observable<any> {
    return this.httpClient.get<any>(`${this.receiptBaseUrl}/${id}`);
  }


  deleteReceipt(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.receiptBaseUrl}/${id}`);
  }

  getCashAccountGroups(): Observable<any> {
    return this.httpClient.get<any>(`${environment.hostUrl}/erp/accountGroup/type?keyword=cash`);
  }

  getBankAccountGroups(): Observable<any> {
    return this.httpClient.get<any>(`${environment.hostUrl}/erp/accountGroup/type?keyword=bank`);
  }

  getAccount(): Observable<any> {
    return this.httpClient.get<any>(`${environment.hostUrl}/erp/account`);
  }
  download(filters: any): Observable<any> {
    return this.httpClient.get(`${this.receiptBaseUrl}/download`, { params: filters, responseType: 'blob' });
  }

  getSeleOrderByAccountAndPaymentStatus(id: string): Observable<any> {
    return this.httpClient.get<any>(`${this.saleOrder}/account`, { params: { accountId: id }, responseType: 'json' });
  }

  getAdvanceReceiptByAccountDetails(accountDetailId: any): Observable<any> {
    return this.httpClient.get<any>(`${this.receiptBaseUrl}/advance/byAccountDetail/${accountDetailId}`);
  }

}
