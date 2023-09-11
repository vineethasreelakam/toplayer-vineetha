import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlanService } from '../../services/plan.service';

@Component({
  selector: 'app-plan-payment-status',
  templateUrl: './plan-payment-status.component.html',
  styleUrls: ['./plan-payment-status.component.scss'],
})
export class PlanPaymentStatusComponent implements OnInit {
  paymentInfo: any;
  constructor(
    private router: Router,
    private planService: PlanService,
  ) {}

  ngOnInit(): void {
    this.getPaymentStatus();
  }

  getPaymentStatus(){
    this.planService.getPaymentStatus().subscribe((res) => {
      if(res.status === 200){
        this.paymentInfo = res.payment_status;
      }
      console.log('paymentStats',res)
    });
  }
}