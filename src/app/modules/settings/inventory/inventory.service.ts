import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventryService {
  posBaseUrl = `${environment.hostUrl}/erp/inventory/product/udf`;
  settingsUrl = `${environment.hostUrl}/erp/default/settings/group`;
  constructor(private httpClient: HttpClient) { }
  
  getDefaultProductSettings(groupName:any): Observable<any> {
    return this.httpClient.get(`${this.settingsUrl}/${groupName}`); // Fetch product settings from API
  }

  updateProductSettings(updatedSettings: any): Observable<any> {
    return this.httpClient.post(`${this.settingsUrl}/productAttributes`, updatedSettings); // Update settings
  }
  updatePosTop(id: string, posElement: any): Observable<any> {
    return this.httpClient.put(`${this.posBaseUrl}/${id}`, posElement);
  }

  getPosBottom(): Observable<any> {
    return this.httpClient.get<any[]>(`${this.posBaseUrl}/group/pos_bottom`);
  }

  updatePosBottom(id: string, posElement: any): Observable<any> {
    return this.httpClient.put(`${this.posBaseUrl}/${id}`, posElement);
  }

  getDataGrid(): Observable<any> {
    return this.httpClient.get<any[]>(`${this.posBaseUrl}/group/pos_grid`);
  }

  updateDataGrid(id: string, posElement: any): Observable<any> {
    return this.httpClient.put(`${this.posBaseUrl}/${id}`, posElement);
  }
  getDefaultUdfValues(): Observable<any> {
    return this.httpClient.get<any[]>(`${this.posBaseUrl}/group/udf`);
  }

  updateDefaultUDFValue(settingGrp:string, code:string,  formData: any): Observable<any> {
    return this.httpClient.put(`${this.settingsUrl}/${settingGrp}/${code}`, formData);
  }
  getUdfDefaultValues(settingGrp:string, code:string,): Observable<any> {
    return this.httpClient.get<any[]>(`${this.settingsUrl}/${settingGrp}/${code}`);
  }
}
