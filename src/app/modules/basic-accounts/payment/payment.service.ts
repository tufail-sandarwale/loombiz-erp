import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'app/core/modal/product';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService { 

paymentBaseUrl = `${environment.hostUrl}/erp/payment`;

 constructor(private httpClient: HttpClient) { }


//  getPayments(): Observable<any[]> { 
//   return this.httpClient.get<any>(`${this.paymentBaseUrl}`);
// }

 getPayments(pageNumber, page, sort, extraParamObject): Observable<any> {
   let params = new HttpParams();
   if (extraParamObject && Object.keys(extraParamObject).length) {
     params = new HttpParams({ fromObject: extraParamObject })
   }
   params = params.append("page", pageNumber)
   params = params.append("size", page)
   params = params.append("sort", sort)
   return this.httpClient.get<any>(this.paymentBaseUrl, { params: params });
 }
 
 addPayment(paymentData: any): Observable<any> {
   return this.httpClient.post<any>(this.paymentBaseUrl, paymentData);
 }

 updatePayment(id: string, payment: any): Observable<any> {
   return this.httpClient.put<any>(`${this.paymentBaseUrl}/${id}`, payment);
 }
 getPaymentById(id: string): Observable<any> {
   return this.httpClient.get<any>(`${this.paymentBaseUrl}/${id}`);
 }

 
 deletePayment(id: string): Observable<any> {
   return this.httpClient.delete<any>(`${this.paymentBaseUrl}/${id}`);
 }



 download(filters: any): Observable<any> {
   return this.httpClient.get(`${this.paymentBaseUrl}/download`, { params: filters, responseType: 'blob' });
 }

 getCashAccountGroups(): Observable<any> {
  return this.httpClient.get<any>(`${environment.hostUrl}/erp/accountGroup/type?keyword=cash`);
}

getBankAccountGroups(): Observable<any> {
  return this.httpClient.get<any>(`${environment.hostUrl}/erp/accountGroup/type?keyword=bank`);
}

getAccount():Observable<any>{
  return this.httpClient.get<any>(`${environment.hostUrl}/erp/account`);
}
}
