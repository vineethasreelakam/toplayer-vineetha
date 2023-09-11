import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PlanListComponent } from './components/plan-list/plan-list.component';
import { PlanPaymentStatusComponent } from './components/plan-payment-status/plan-payment-status.component';



export const PLAN_ROUTES: Routes = [
    {
    path: '',
    children: [
      { path: '', redirectTo: '', pathMatch: 'full' },
      {
        path: 'plan',
        component: PlanListComponent 
      },
      {
        path: 'payment-status',
        component: PlanPaymentStatusComponent 
      },
    ]
  }

 
];

@NgModule({
  imports: [RouterModule.forChild(PLAN_ROUTES)]
})
export class PlanRoutingModule {

}
