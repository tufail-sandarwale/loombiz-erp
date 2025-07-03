import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductSubCategoryItemService {

  private baseUrl = `${environment.hostUrl}`

  constructor(private http: HttpClient) { }
  addProductSubCategory(payload: { name: string }): Observable<any> {
    const productData = JSON.stringify(payload)
    console.log('ProductSubCategory', productData);
    
    return this.http.post<any>(`${this.baseUrl}/erp/inventory/product/subcategory`, productData,
    {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
      })
  }
    );
  }
  addProductSubCate(subCatData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/erp/inventory/product/item`, subCatData);
  }
  getProductSubCategories():Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/erp/inventory/product/subcategory`);
  }
  updateSubCategory(id: string,subCatData: any):Observable<any>{
      return this.http.put<any>(`${this.baseUrl}/erp/inventory/product/subcategory/${id}`, subCatData);
   }
  addItemName(itemData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/erp/inventory/product/item`, itemData);
  }
  getItemNames():Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/erp/inventory/product/item`);
  }
  updateItemName(id: string,itemNameData: any):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/erp/inventory/product/item/${id}`, itemNameData);
 }
  getProductsTableColumn():Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}/erp/inventory/product/productColumns`);
  }
}
