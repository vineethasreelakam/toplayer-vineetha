import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './components/register/register.component';
import { BsDatepickerModule, BsDatepickerConfig  } from 'ngx-bootstrap/datepicker';
import { AuthService } from './services/auth/auth.service';
import { AgeLimitDirective } from './directives/age-limit.directive';
import { IndividualFormComponent } from './components/register/individual/individual-form.component';
import { BusinessFormComponent } from './components/register/business/business-form.component';
import { GoogleSignInComponent } from './components/google-signin/google-signin.component';
@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ChangePasswordComponent,
    IndividualFormComponent,
    BusinessFormComponent,
    GoogleSignInComponent,
    // AgeLimitDirective
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    RouterModule,
    SharedModule,
    BsDatepickerModule.forRoot(),
],
  providers: [BsDatepickerConfig],
  exports: []
})
export class LoginModule { }