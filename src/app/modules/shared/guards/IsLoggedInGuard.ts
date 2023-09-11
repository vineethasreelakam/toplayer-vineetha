import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../login/services/auth/auth.service';

@Injectable()
export class IsLoggedInGuard implements CanActivate {
  // here you can inject your auth service to check that user is signed in or not
  constructor(private authService: AuthService,private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    console.log('guard value',this.authService.currentUserValue)
    console.log('guard',!this.authService.currentUserValue)
    if (this.authService.currentUserValue == null) {
      this.router.navigate(['/user/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }else{
        return false;
    }
 
  }
}