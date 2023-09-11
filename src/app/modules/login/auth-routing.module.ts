import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { GoogleSignInComponent } from './components/google-signin/google-signin.component';


export const AUTH_ROUTES: Routes = [
    {
    path: '',
    children: [
      { path: '', redirectTo: '', pathMatch: 'full' },
      {
        path: 'login',
        component: LoginComponent 
      },
      // { path: '', redirectTo: '', pathMatch: 'full' , component: LoginComponent },
      {
        path: 'register',
        component: RegisterComponent 
      },
      {
        path: 'forgot-password',
        component: ChangePasswordComponent 
      },
      {
        path: 'google-login',
        component: GoogleSignInComponent 
      },
    ]
  }
  
//   {
//     path: 'login/reset',
//     component: ResetPasswordComponent
//   },
 
];

@NgModule({
  imports: [RouterModule.forChild(AUTH_ROUTES)]
})
export class AuthRoutingModule {

}
