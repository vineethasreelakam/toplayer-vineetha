import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { BaseHttpService } from 'src/app/modules/core/services/baseHttp/basehttp.service';
import { baseURL } from 'src/app/modules/shared/baseURL';
import { URLs } from '../models/URLs';

@Injectable({ providedIn: 'root' })
export class AccountService {
 
  constructor(private apiService: BaseHttpService) {
   
  }

  changePassword(data:any): Observable<any> {
    return this.apiService.post(data, `${baseURL.apiUrl}${URLs.changePassword}`);
  }

  createSubAccount(data:any): Observable<any> {
    return this.apiService.post(data, `${baseURL.apiUrl}${URLs.createSubAccount}`);
  }

  getAllSubAccount(data:any): Observable<any> {
    return this.apiService.post(data, `${baseURL.apiUrl}${URLs.subAccountList}`);
  }

  blockSubAccount(data:any): Observable<any> {
    return this.apiService.post(data, `${baseURL.apiUrl}${URLs.subAccountBlock}`);
  }
  
}
