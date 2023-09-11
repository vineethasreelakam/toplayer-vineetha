import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PlanRoutingModule } from './plan-routing.module';
import { PlanListComponent } from './components/plan-list/plan-list.component';
import { PlanService } from './services/plan.service';
import { PlanPaymentStatusComponent } from './components/plan-payment-status/plan-payment-status.component';

@NgModule({
  declarations: [ 
    PlanListComponent,
    PlanPaymentStatusComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    PlanRoutingModule
],
  providers: [PlanService],
  exports: []
})
export class PlanModule { }