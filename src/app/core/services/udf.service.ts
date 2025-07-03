import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UdfService {

  productUDFBaseUrl = `${environment.hostUrl}/erp/inventory/product/udf`;
  constructor(private httpClient: HttpClient) { }


  getUDFByGroup(group: string): Observable<any> {
    return this.httpClient.get<any[]>(`${this.productUDFBaseUrl}/group/${group}`);
  }

  getProductUDFValues(code?: string, value?: string, neededCode?: string): Observable<any> {
    let params = new HttpParams();
    if (code) {
      params = params.append(code, value)
    }
    if (neededCode)
      params = params.append("neededCode", neededCode)
    return this.httpClient.get<any[]>(`${this.productUDFBaseUrl}/unique`, { params: params });
  }

  updateUDF(id: string, udfElement: any): Observable<any> {
    return this.httpClient.put(`${this.productUDFBaseUrl}/${id}`, udfElement);
  }

  getUdfById(id: string): Observable<any> {
    return this.httpClient.get(`${this.productUDFBaseUrl}/${id}`);
  }

  addUdfFieldValue(udfId, value): Observable<any> {
    return this.httpClient.post(`${this.productUDFBaseUrl}/${udfId}/value`, value);
  }

  updateUdfFieldValue(udfValueId, value): Observable<any> {
    return this.httpClient.put(`${this.productUDFBaseUrl}/${udfValueId}/value`, value);
  }
}
