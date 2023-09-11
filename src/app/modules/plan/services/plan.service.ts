import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { BaseHttpService } from 'src/app/modules/core/services/baseHttp/basehttp.service';
import { baseURL } from 'src/app/modules/shared/baseURL';
import { URLs } from '../models/URLs';
import  {PlanData} from '../models/plans.model';

@Injectable({ providedIn: 'root' })
export class PlanService {
 
  constructor(private apiService: BaseHttpService) {
   
  }

  getAllPlans(data:any): Observable<PlanData> {
    return this.apiService.post(data, `${baseURL.apiUrl}${URLs.allPlans}`);
  }

  getMetaTable(data:any): Observable<any> {
    return this.apiService.post(data, `${baseURL.apiUrl}${URLs.getMetaTable}`);
  }

  validatePromoCode(data:any): Observable<any> {
    return this.apiService.post(data, `${baseURL.apiUrl}${URLs.validatePromocode}`);
  }

  createPayment(data:any): Observable<any> {
    return this.apiService.post(data, `${baseURL.apiUrl}${URLs.createPayment}`);
  }

  getPaymentStatus(): Observable<any> {
    return this.apiService.post({}, `${baseURL.apiUrl}${URLs.payment_status}`);
  }

  
}
