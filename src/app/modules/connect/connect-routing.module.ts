import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MyFollowingComponent } from './components/my-following/my-following.component';


export const CONNECT_ROUTES: Routes = [
    {
    path: '',
    children: [
      { path: '', redirectTo: '', pathMatch: 'full'  },
      {
        path: 'connect',
        component: MyFollowingComponent 
      },
    //   {
    //     path: 'my-profiles',
    //     component: MyProfilesComponent 
    //   },
    ]
  }

 
];

@NgModule({
  imports: [RouterModule.forChild(CONNECT_ROUTES)]
})
export class ConnectRoutingModule {

}
