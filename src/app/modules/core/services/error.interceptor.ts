import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Observable, throwError as observableThrowError ,retry} from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../login/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Injectable({
    providedIn: 'root',
})
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private authservice: AuthService,
        private toaster: ToastrService,
        private router: Router
    ) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            // retry(3),
            catchError((err: HttpErrorResponse) => {
                // this.parseError(err);
                console.log('HttpErrorResponse', err);
                if(err.error.errors){
                    this.toaster.error(err.error.errors);
                }else{
                    this.toaster.error('Something went wrong!');
                }
               
                return observableThrowError(err);
            })
        );
    }

      private parseError(err: HttpErrorResponse): void {
    if (err.message) {
      this.handleSpringError(err);
    } else if (err.error.error) {
      this.handleBaseHttpServiceError(err);
    } else {
      this.toaster.error('Handling unknown error format');
    }

    console.error(err);
  }

  private async handleSpringError(err: HttpErrorResponse): Promise<void> {
    switch (err.status) {
      case 401:
        this.toaster.error(err.error.message, '', {
          positionClass: 'toast-top-right',
          progressBar: true,
          closeButton: true,
        });
        this.router.navigateByUrl('/user/login');
        // this.authservice.logout();
        break;

      case 404:
      case 403:
        this.toaster.error(err.error.message, '', {
          positionClass: 'toast-top-right',
          progressBar: true,
          closeButton: true,
        });
        break;

      case 400:
        if (!err.error?.type) {
          this.toaster.error(err.error.message, '', {
            positionClass: 'toast-top-right',
            progressBar: true,
            closeButton: true,
          });
        } else {
          const message = JSON.parse(await err.error.text()).message;
          this.toaster.error(message, '', {
            positionClass: 'toast-top-right',
            progressBar: true,
            closeButton: true,
          });
        }
        break;

      case 422:
      case 424:
        const data = err.error.errors;
        Object.values<string>(data).forEach((element) => {
          Object.values<string>(element).forEach((item) => {
            if (item) {
              this.toaster.error(item, '', {
                positionClass: 'toast-top-right',
                progressBar: true,
                closeButton: true,
              });
            }
          });
        });
        break;

      case 500:
        this.toaster.error(
          'A network related or instance related error occured while connecting the server. Please try again later.',
          `Connection Error`,
          {
            positionClass: 'toast-top-right',
            progressBar: true,
            closeButton: true,
          }
        );
        break;

      default:
        this.toaster.error(
          'Looks like the server is taking to long to respond, this can be caused by either poor connectivity or an error with our servers. Please try again in a while',
          '',
          {
            positionClass: 'toast-top-right',
            progressBar: true,
            closeButton: true,
          }
        );
        break;
    }
  }

  private handleBaseHttpServiceError(error: HttpErrorResponse): void {
    const err = error.error;
    this.toaster.error(
      `${err.status},  Message: ${err.error}`,
      `${err.message}`
    );
  }
}