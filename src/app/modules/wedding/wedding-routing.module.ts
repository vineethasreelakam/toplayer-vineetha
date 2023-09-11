import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AddWeddingComponent } from './components/add-wedding/add-wedding.component';



export const WEDDING_ROUTES: Routes = [
    {
    path: '',
    children: [
      { path: '', redirectTo: '', pathMatch: 'full' },
      {
        path: 'wedding',
        component: AddWeddingComponent 
      },
    //   {
    //     path: 'my-profiles',
    //     component: MyProfilesComponent 
    //   },
    //   {
    //     path: 'edit-qr-code',
    //     component: ViewQrCodeComponent 
    //   },

    ]
  }

 
];

@NgModule({
  imports: [RouterModule.forChild(WEDDING_ROUTES)]
})
export class WeddingRoutingModule {

}
