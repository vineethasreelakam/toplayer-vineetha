import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PlanService } from '../../services/plan.service';
import { PlanData } from '../../models/plans.model';
import { ToastrControlService } from 'src/app/modules/shared/services/toastr.service';
import { AuthService } from 'src/app/modules/login/services/auth/auth.service';

@Component({
  selector: 'app-plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.scss'],
})
export class PlanListComponent implements OnInit {
  isActive: any;
  allPlanList:any;
  plans: any;
  promoCodeForm!: FormGroup;
  promoCode: string = '';
  isFormSubmitted = false;
  selectedPlanData:any;
  planPeriodStats: boolean = true;
  metaTableData: any;
  constructor(
    private router: Router,
    private planService: PlanService,
    private formBuilder: FormBuilder,
    private toastr: ToastrControlService,
    public authService: AuthService,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  ngOnInit(): void {
    this.promoCodeForm = this.formBuilder.group({
      promo_code: ['', [Validators.required]],
      use_type:[1],
      order_id:[null]
    });
    this.getAllPlans();
    this.getMetaTable()
  }

  changPeriod(period:string){
    period === 'year' ? this.planPeriodStats = true : this.planPeriodStats = false;
    if(period === 'year'){
      this.plans = this.allPlanList.filter((data: any) => data.type === 'year');
    }else{
      this.plans = this.allPlanList.filter((data: any) => data.type != 'year');
    }

  }

  selectedPlan(plan:any,i:any){
    this.isActive = i;
    this.selectedPlanData = plan;
  }

  getMetaTable(){
    const formData = new FormData();
    formData.append(`meta_key`, `plans_table`);
    this.planService.getMetaTable(formData).subscribe((metaTable) => {
      console.log('metaTable',metaTable)
      if(metaTable.status === 200){
        this.metaTableData = metaTable.meta_post[0]?.meta_value || '';
      }
      // console.log('metaTable',metaTable);
    });
  }

   getAllPlans() {
    this.authService.getUserDetails().subscribe((res) => {
      const formData = new FormData();
      formData.append(`country_id`, `${res?.country}`);
      this.planService.getAllPlans(formData).subscribe((plans) => {
        // console.log('plans',plans)
        this.allPlanList = plans;
        this.plans = this.allPlanList.filter((data: any) => data.type === 'year');
      });
    });
   
  }

  validatePromoCode() {
    this.isFormSubmitted = true;
    if (this.promoCodeForm.invalid) {
      return;
    }
    this.planService.validatePromoCode(this.promoCodeForm.value).subscribe((res) => {
      console.log('res', res);
      if(res){
      res.status === 200 ? this.toastr.showSuccessToastr(res.message) : this.toastr.showWarningToastr(res.message);
      res.status === 200 ? this.promoCode = this.promoCodeForm.value['promo_code'] : this.promoCode ='';
      }
    });
    console.log('Submit', this.promoCodeForm.value);
  }
  addPlan(){
    if(this.selectedPlanData){
    const data ={
      type: 1,
      item: this.selectedPlanData.price_id,
      order_id: '',
      amount: this.selectedPlanData.price,
      promo_code: this.promoCode
    }
    console.log('data',data)
    this.planService.createPayment(data).subscribe((res) => {
      console.log('res', res);
      if(res.status === 200){
        this.toastr.showSuccessToastr(res?.message);
        this.document.location.href = res?.payment_url;
      }
    });
  }else{
    this.toastr.showWarningToastr('Please select plan!');
  }
  }
}
