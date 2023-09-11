import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable , of} from 'rxjs';
import { map, switchMap, tap} from 'rxjs/operators';
import { BaseHttpService } from 'src/app/modules/core/services/baseHttp/basehttp.service';
import { baseURL } from 'src/app/modules/shared/baseURL';
import { URLs } from '../models/URLs';

@Injectable({ providedIn: 'root' })
export class SharedService {
  data1: any;
  data2: any;
  singleDetails: any;



  constructor(private apiService: BaseHttpService) {
  }



  getAllCountries(){
    return this.apiService.post({type:'2'},
      `${baseURL.apiUrl}${URLs.getAllCountries}`
    );
  }

  imageUpload(data:any){
    return this.apiService.post(data,
      `${baseURL.apiUrl}${URLs.imagUpload}`
    );
  }

  getPublicIdData(data:any){
    return this.apiService.post(data,
      `${baseURL.apiUrl}${URLs.getPublicData}`
    );
  }

  getSnapData(data:any){
    return this.apiService.post(data,
      `${baseURL.apiUrl}${URLs.getSnapList}`
    );
  }

  domainCheck(data:any){
    return this.apiService.post(data,
      `${baseURL.apiUrl}${URLs.domainCheck}`
    );
  }

}
