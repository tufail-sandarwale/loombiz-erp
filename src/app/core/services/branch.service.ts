import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor( private _httpClient: HttpClient) { }

  getBranch(id): Observable<any> {
    return this._httpClient.get<any>(`${environment.hostUrl}/branch/${id}`);
}
}
