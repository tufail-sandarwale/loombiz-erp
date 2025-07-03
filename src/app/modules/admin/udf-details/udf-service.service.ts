import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UdfService {

  udfBaseUrl = `${environment.hostUrl}/erp/inventory/product/udf`;
  constructor(private httpClient: HttpClient) { }
  getUdfFields():Observable<any>{
    return this.httpClient.get<any>(this.udfBaseUrl);
  }
}
