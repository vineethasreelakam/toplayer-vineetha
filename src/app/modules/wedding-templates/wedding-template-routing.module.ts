import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ViewWeddingTemplateComponent } from '../shared/components/view-wedding-template/view-wedding-template.component';
import { ViewWeddingTemplateComponent1 } from '../shared/components/view-wedding-template1/view-wedding-template1.component';
import { ViewWeddingTemplateComponent2 } from '../shared/components/view-wedding-template2/view-wedding-template2.component';


export const WEDDING_TEMPLATE_ROUTES: Routes = [
    {
    path: '',
    children: [
      { path: '', redirectTo: '', pathMatch: 'full'  },
      {
        path: 'wedding-template-1',
        component: ViewWeddingTemplateComponent1 
      },
      {
        path: 'wedding-template',
        component: ViewWeddingTemplateComponent 
      },
      {
        path: 'wedding-template-2',
        component: ViewWeddingTemplateComponent2 
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
  imports: [RouterModule.forChild(WEDDING_TEMPLATE_ROUTES)]
})
export class WeddingTemplateRoutingModule {

}
