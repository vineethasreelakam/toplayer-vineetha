import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CreateProfileComponent } from './components/create-profile/create-profile.component';
import { AppearanceComponent } from './components/appearance/appearance.component';
import { MyProfilesComponent } from './components/my-profiles/my-profiles.component';
import { ViewQrCodeComponent } from './components/view-qr-code/view-qr-code.component';


export const PROFILE_ROUTES: Routes = [
    {
    path: '',
    children: [
      { path: '', redirectTo: '', pathMatch: 'full' },
      {
        path: 'profile',
        component: CreateProfileComponent 
      },
      {
        path: 'profile/appearance',
        component: AppearanceComponent 
      },
      {
        path: 'profile/my-profiles',
        component: MyProfilesComponent 
      },
      {
        path: 'profile/edit-qr-code/:id',
        component: ViewQrCodeComponent 
      },

    ]
  }

 
];

@NgModule({
  imports: [RouterModule.forChild(PROFILE_ROUTES)]
})
export class ProfileRoutingModule {

}
