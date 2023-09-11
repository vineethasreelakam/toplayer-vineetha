import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthService } from '../../login/services/auth/auth.service';
import { ToastrControlService } from '../../shared/services/toastr.service';

const TOKEN_HEADER_KEY = 'Authorization';
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(private authService: AuthService, private router: Router, public toastr: ToastrControlService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<Object>> {
    let authReq = req;
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      const token = currentUser.access_token;
      authReq = this.addTokenHeader(req, token);
    }

    return next.handle(authReq).pipe(
      catchError((error) => {
        console.log('error',error);
        if (
          error instanceof HttpErrorResponse &&
          !authReq.url.includes('auth/login') &&
          error.status === 401
        ) {
          return this.handle401Error(authReq, next);
        }
        return throwError(error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      const currentUser = this.authService.currentUserValue;
      const refreshToken = `${currentUser.refresh_token}`;
      if (refreshToken) {
        let refreshToken_ = {
          refresh_token: refreshToken,
        };
        return this.authService.refreshToken(refreshToken_).pipe(
          switchMap((user: any) => {
            this.isRefreshing = false;
            this.refreshTokenSubject.next(user.access_token);
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            this.authService.currentUserSubject.next(user);
            return next.handle(this.addTokenHeader(request, user.access_token));
          }),
          catchError((err) => {
            console.log('refresh',err)
            this.router.navigateByUrl('/user/login');
            this.toastr.showErrorToastr('Your session has expired!')
            this.isRefreshing = false;
            return throwError(err);
          })
        );
      }
    }
    return this.refreshTokenSubject.pipe(
      filter((token) => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }
  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token),
    });
  }



  // constructor(private authService: AuthService) {}
  // intercept(
  //   request: HttpRequest<any>,
  //   next: HttpHandler
  // ): Observable<HttpEvent<any>> {
  //   const currentUser = this.authService.currentUserValue;
  //   if (currentUser && currentUser.access_token) {
  //     request = request.clone({
  //       headers: request.headers.set(
  //         'Authorization',
  //         `Bearer ${currentUser.access_token}`
  //       ),
  //       // headers: request.headers.set("Access-Control-Allow-Origin", "*")
  //       // setHeaders: { 'Authorization', `Bearer  ${currentUser.access_token}` }
  //     });
  //     // request = request.clone({
  //     //   headers: request.headers.set('Access-Control-Allow-Origin', `*`),
  //     // });
  //   }
  //   return next.handle(request);
  //   // .pipe(retry(3));
  // }
}

// JWT Interceptor intercepts http requests from the application
//  to add a JWT
// auth token to the Authorization header if the user is logged in.
