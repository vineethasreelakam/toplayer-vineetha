import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SettingsComponent } from './components/settings/settings.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SubAccountListComponent } from './components/sub-account-list/sub-account-list.component';
import { SubAccountFormComponent } from './components/sub-account-form/sub-account-form.component';



export const ACCOUNT_ROUTES: Routes = [
    {
        path: '',
        children: [
          { path: '', redirectTo: '', pathMatch: 'full' },
          {
            path: 'account/settings',
            component: SettingsComponent 
          },
          {
            path: 'account/change-password',
            component: ResetPasswordComponent 
          },
          {
            path: 'account/sub-account/list',
            component: SubAccountListComponent 
          },
          {
            path: 'account/sub-account/create',
            component: SubAccountFormComponent 
          },
          {
            path: 'sub-account/view/:id',
            component: SubAccountFormComponent 
          },
          {
            path: 'sub-account/edit/:id',
            component: SubAccountFormComponent 
          },
        ]
      }
 
];

@NgModule({
  imports: [RouterModule.forChild(ACCOUNT_ROUTES)]
})
export class AccountRoutingModule {

}
