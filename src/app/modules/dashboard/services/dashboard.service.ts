import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseHttpService } from 'src/app/modules/core/services/baseHttp/basehttp.service';
import { URLs } from '../models/URLs';
import { baseURL } from 'src/app/modules/shared/baseURL';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(private apiService: BaseHttpService) {}

  getUserPlans() {
    return this.apiService.getAll(`${baseURL.apiUrl}${URLs.userPlans}`);
  }
}
