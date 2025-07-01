import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  searchText: string = '';
  users: any[] = [];
  private apiUrl = 'http://localhost:8089/public/contact';
  private getData = 'http://localhost:8089/public/contacts'
  private download = 'http://localhost:8089/public/download/contacts'
  private getCountryApiUrl = 'http://localhost:8089/domain/countries'
  private getStateApiUrl ='http://localhost:8089/domain/states'
  private getCitiesApiUrl = 'http://localhost:8089/domain/cities'
  constructor(private http: HttpClient) { }
 

  saveContact(contact: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json' // Adjust based on your data format
    });
    return this.http.post<any>(`${environment.contactApiUrl}`, contact,{ headers: headers });
  }

  getContacts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getContactsByType(page:number,size:number,clientId:string, sortOrder:string, contactType: string): Observable<any[]> {
  let param =   new HttpParams();
    param = param.append('page',page)
    param = param.append('size',size)
    param = param.append('sort',clientId)
    param = param.append('sortOrder',sortOrder)
    param = param.append('contactType',contactType)
    return this.http.get<any[]>(`${this.getData}`,{params:param});
  }
  deleteContact(id: string): Observable<any> {
    console.log(id);
    return this.http.delete(`${this.getData}`+'/'+ id);
  }

  downloadContacts(page: number, size: number, clientId: string, sortOrder: string, contactType: string, format: string): Observable<Blob> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', clientId)
      .set('sortOrder', sortOrder)
      .set('contactType', contactType)
      .set('format', format);

    return this.http.get(`${this.download}`, { params: params, responseType: 'blob' });
  }
  
  getCountries(): Observable<any[]> {
    return this.http.get<any[]>(`${this.getCountryApiUrl}`);
  }

  getStates(countryID: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.getStateApiUrl}?countryID=${countryID}`);
  }

  getDistricts(stateCode: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.getCitiesApiUrl}?stateCode=${stateCode}`);
  }
}
