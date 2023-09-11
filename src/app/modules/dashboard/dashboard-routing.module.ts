import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard.component';



export const DASHBOARD_ROUTES: Routes = [
  {
    path: 'dashboard', component: DashboardComponent,
  }
 
 
];

@NgModule({
  imports: [RouterModule.forChild(DASHBOARD_ROUTES)]
})
export class DashboardRoutingModule {

}
