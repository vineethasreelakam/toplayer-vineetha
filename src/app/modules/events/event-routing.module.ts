import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { EditEventComponent } from './components/edit-event/edit-event.component';
import { ViewQrCodeComponent } from '../profile/components/view-qr-code/view-qr-code.component';



export const EVENT_ROUTES: Routes = [
    {
    path: '',
    children: [
      { path: '', redirectTo: '', pathMatch: 'full' },
      {
        path: 'event',
        component: EditEventComponent 
      },
    //   {
    //     path: 'my-profiles',
    //     component: MyProfilesComponent 
    //   },
      {
        path: 'event/edit-qr-code/:id',
        component: ViewQrCodeComponent 
      },

    ]
  }

 
];

@NgModule({
  imports: [RouterModule.forChild(EVENT_ROUTES)]
})
export class EventRoutingModule {

}
