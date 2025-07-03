import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'app/core/modal/product';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
  private baseUrl = `${environment.hostUrl}`

  constructor(private http: HttpClient) { }
  addProduct(payload: { name: string }): Observable<any> {
    const productData = JSON.stringify(payload)
    console.log('productData', productData);
    
    return this.http.post<any>(`${this.baseUrl}/erp/inventory/product/type`, productData,
    {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
      })
  }
    );
  }
  addCategory(categoryData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/erp/inventory/product/category`, categoryData);
  }
  getProducts():Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/erp/inventory/product/type`);
  }
  getCategories():Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/erp/inventory/product/category`);
  }

  getProductsTableColumn():Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}/erp/inventory/product/productColumns`);
  }
}
