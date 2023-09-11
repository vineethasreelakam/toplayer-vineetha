import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MyProfilesComponent } from './my-profiles/my-profiles.component';
import { SearchProfileComponent } from './search-profile/search-profile.component';




export const MYPROFILE_ROUTES: Routes = [
    {
    path: '',
    children: [
      { path: '', redirectTo: '', pathMatch: 'full' },
      {
        path: 'my-profile',
        component: MyProfilesComponent 
      },
      {
        path: 'my-profile/search-profiles',
        component: SearchProfileComponent 
      },
      {
        path: 'my-profile/search-events',
        component: SearchProfileComponent 
      },
    ]
  },
  // {
  //   path: 'search-profiles',
  //   component: SearchProfileComponent 
  // },
  // {
  //   path: 'search-events',
  //   component: SearchProfileComponent 
  // },

 
];

@NgModule({
  imports: [RouterModule.forChild(MYPROFILE_ROUTES)]
})
export class MyProfileRoutingModule {

}
