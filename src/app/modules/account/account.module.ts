import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule, BsDatepickerConfig  } from 'ngx-bootstrap/datepicker';
// import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { SharedModule } from '../shared/shared.module';
import { AccountRoutingModule } from './account-routing.module';
import { SettingsComponent } from './components/settings/settings.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SubAccountListComponent } from './components/sub-account-list/sub-account-list.component';
import { AddSubAccountComponent } from './components/add-sub-account/add-sub-account.component';
import { AccountService } from './services/account.service';
import { SubAccountFormComponent } from './components/sub-account-form/sub-account-form.component';

@NgModule({
  declarations: [ 
    SettingsComponent,
    ResetPasswordComponent,
    SubAccountListComponent,
    AddSubAccountComponent,
    SubAccountFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    AccountRoutingModule,
    BsDatepickerModule,
    // SweetAlert2Module
],
  providers: [NgbActiveModal, AccountService, BsDatepickerConfig],
  exports: []
})
export class AccountModule { }