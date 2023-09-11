import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { BaseHttpService } from 'src/app/modules/core/services/baseHttp/basehttp.service';
import { baseURL } from 'src/app/modules/shared/baseURL';
import { URLs } from '../models/URLs';
// import  {PlanData} from '../models/plans.model';

@Injectable({ providedIn: 'root' })
export class ProfileService {
 
  constructor(private apiService: BaseHttpService) {
   
  }

  addProfileId(data:any): Observable<any> {
    return this.apiService.post(data, `${baseURL.apiUrl}${URLs.profileAdd}`);
  }

  getProfileList(data:any): Observable<any> {
    return this.apiService.post(data, `${baseURL.apiUrl}${URLs.profileList}`);
  }

  profileEdit(data:any): Observable<any> {
    return this.apiService.post(data, `${baseURL.apiUrl}${URLs.profileEdit}`);
  }

  getProfileBio(data:any): Observable<any> {
    return this.apiService.post(data, `${baseURL.apiUrl}${URLs.getProfileBio}`);
  }

  // Profile Link

  addProfileLink(data:any): Observable<any> {
    return this.apiService.post(data, `${baseURL.apiUrl}${URLs.addProfileLink}`);
  }

  getProfileLink(data:any): Observable<any> {
    return this.apiService.post(data, `${baseURL.apiUrl}${URLs.getProfileLink}`);
  }

  editProfileLink(data:any): Observable<any> {
    return this.apiService.post(data, `${baseURL.apiUrl}${URLs.editProfileLink}`);
  }

  deleteProfileLink(data:any): Observable<any> {
    return this.apiService.post(data, `${baseURL.apiUrl}${URLs.deleteLink}`);
  }

  updateLinkClickCount(data:any): Observable<any> {
    return this.apiService.post(data, `${baseURL.apiUrl}${URLs.linkClickCount}`);
  }

  // Themes
  getAllThemes(): Observable<any> {
    return this.apiService.post({}, `${baseURL.apiUrl}${URLs.getThemes}`);
  }

  applyThemes(data:any): Observable<any> {
    return this.apiService.post(data, `${baseURL.apiUrl}${URLs.applyTheme}`);
  }

  applyCustomTheme(data:any): Observable<any> {
    return this.apiService.post(data, `${baseURL.apiUrl}${URLs.customTheme}`);
  }
  
  // profile search
  searchProfile(data:any): Observable<any> {
    return this.apiService.post(data, `${baseURL.apiUrl}${URLs.profileSearch}`);
  }
}
