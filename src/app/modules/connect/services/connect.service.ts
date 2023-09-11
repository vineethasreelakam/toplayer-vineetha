import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { BaseHttpService } from 'src/app/modules/core/services/baseHttp/basehttp.service';
import { baseURL } from 'src/app/modules/shared/baseURL';
import { URLs } from '../models/URLs';

@Injectable({ providedIn: 'root' })
export class ConnectService {
 
  constructor(private apiService: BaseHttpService) {
   
  }

  getAllFollowing(): Observable<any> {
    return this.apiService.post({type: 2}, `${baseURL.apiUrl}${URLs.allProfiles}`);
  }
  getMyFollowing(): Observable<any> {
    return this.apiService.post({type: 2}, `${baseURL.apiUrl}${URLs.myFollowing}`);
  }

  followProfile(data:any): Observable<any> {
    return this.apiService.post(data, `${baseURL.apiUrl}${URLs.followProfile}`);
  }

//   validatePromoCode(data:any): Observable<any> {
//     return this.apiService.post(data, `${baseURL.apiUrl}${URLs.validatePromocode}`);
//   }

//   createPayment(data:any): Observable<any> {
//     return this.apiService.post(data, `${baseURL.apiUrl}${URLs.createPayment}`);
//   }

//   getPaymentStatus(): Observable<any> {
//     return this.apiService.post({}, `${baseURL.apiUrl}${URLs.payment_status}`);
//   }

  
}
