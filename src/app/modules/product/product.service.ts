import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'app/core/modal/product';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productBaseUrl = `${environment.hostUrl}/erp/inventory/product`;
  constructor(private httpClient: HttpClient) { }

  getProducts():Observable<any>{
    return this.httpClient.get<any>(this.productBaseUrl);
  }

  getProductsTableColumn():Observable<any[]>{
    return this.httpClient.get<any[]>(`${environment.hostUrl}/productColumns`);
  }

  getNextBarCode():Observable<any>{
    return this.httpClient.get<any>(`${this.productBaseUrl}/nextId`);
  }

  getProductTypes():Observable<any[]>{
    return this.httpClient.get<any[]>(`${this.productBaseUrl}/type`);
  }

  getProductUnits():Observable<any[]>{
    return this.httpClient.get<any[]>(`${this.productBaseUrl}/unit`);
  }

  getProductCategories():Observable<any[]>{
    return this.httpClient.get<any[]>(`${this.productBaseUrl}/category`);
  }

  getAllProductUDF(){
    return this.httpClient.get<any[]>(`${this.productBaseUrl}/udf`);
  }
}
