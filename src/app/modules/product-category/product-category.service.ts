import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'app/core/modal/product';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  constructor(private http: HttpClient) { }
  addProduct(productData: any): Observable<any> {
    return this.http.post<any>(`${environment.contactApiUrl}`, productData);
  }
  addCategory(productData: any): Observable<any> {
    return this.http.post<any>(`${environment.contactApiUrl}`, productData);
  }
  getProducts():Observable<any>{
    return this.http.get<any>(`${environment.apiRVHostUrl}/products`);
  }
  getCategories():Observable<any>{
    return this.http.get<any>(`${environment.apiRVHostUrl}/category`);
  }

  getProductsTableColumn():Observable<any[]>{
    return this.http.get<any[]>(`${environment.apiRVHostUrl}/productColumns`);
  }
}
