import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { BaseHttpService } from 'src/app/modules/core/services/baseHttp/basehttp.service';
import { URLs } from '../../models/URLs';
import { baseURL } from 'src/app/modules/shared/baseURL';
import { User, LoginData } from '../../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public currentUserSubject!: BehaviorSubject<User>;
  public currentUser!: Observable<User>;

  constructor(private apiService: BaseHttpService) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(sessionStorage.getItem('currentUser')!)
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  register(formData:any): Observable<any> {
    return this.apiService.post(formData, `${baseURL.apiUrl}${URLs.register}`);
  }

  getloginData(logindata: LoginData): Observable<any> {
    return this.apiService.post(logindata, `${baseURL.apiUrl}${URLs.auth}`);
  }

  login(data: LoginData): Observable<any> {
    return this.getloginData(data).pipe(
      map((res) => {
        const user = res;
        if (user && user.access_token) {
          sessionStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          // user role is changed now based on login.
          return user;
        }
      
      })
    );
  }

  allowGoogleLogin(user:any):Observable<any> {
      // sessionStorage.setItem('currentUser', JSON.stringify(user));
      // this.currentUserSubject.next(user);
      return of(user);
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  googleLogin(): Observable<any> {
    return this.apiService.getAll(`${baseURL.apiUrl}${URLs.googleLogin}`);
  }
  googleLoginVerify(data:any): Observable<any> {
    return this.apiService.post(data, `${baseURL.apiUrl}${URLs.googleVerify}`);
  }

  getUserDetails(): Observable<any> {
    return this.apiService.getAll(`${baseURL.apiUrl}${URLs.userDetails}`);
  }

  changePassword(data: any) {
    return this.apiService.post(
      data,
      `${baseURL.apiUrl}${URLs.changePassword}`
    );
  }

  getAllCountries(){
    return this.apiService.post({type:'2'},
      `${baseURL.apiUrl}${URLs.getAllCountries}`
    );
  }

  logout(){
    return this.apiService.post({},
    `${baseURL.apiUrl}${URLs.logout}`
  );
  }

  refreshToken(token: any) {
    return this.apiService.post(token, `${baseURL.apiUrl}/${URLs.refreshToken}`);
  }
}
