import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import * as moment from 'moment';

import { validationPatterns } from 'src/app/modules/shared/validationPatterns';
import { ToastrControlService } from 'src/app/modules/shared/services/toastr.service';
import { AuthService } from '../../../services/auth/auth.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-business-form',
  templateUrl: './business-form.component.html',
  styleUrls: ['./business-form.component.scss'],
})
export class BusinessFormComponent implements OnInit {
  @Input()
  countries: any = [];
  @Input()
  gender: any = [];
  @Input() formRest!: Subject<boolean>;
  @Input() urlParams:any;
  public show: boolean = false;
  selected: string | undefined;
  businessForm!: FormGroup;
  isbusinessFormSubmitted = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastr: ToastrControlService
  ) {}

  ngOnInit(): void {
    this.businessForm = this.formBuilder.group({
      first_name: [this.urlParams ? this.urlParams?.name : '', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: [
        this.urlParams ? this.urlParams?.email : '',
        [Validators.required, Validators.pattern(validationPatterns.pat_email)],
      ],
      mobile_no: [
        '',
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      ],
      dob: ['', [Validators.required, this.checkDate()]],
      gender: [null, [Validators.required]],
      password: ['', [Validators.required]],
      country: [null, [Validators.required]],
      business_name: ['', [Validators.required]],
      business_address_1: ['', [Validators.required]],
      business_address_2: ['', [Validators.required]],
      business_city: ['', [Validators.required]],
      business_email: [
        '',
        [Validators.required, Validators.pattern(validationPatterns.pat_email)],
      ],

      business_contact: [
        '',
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      ],
      business_country: [null, [Validators.required]],
      account_type: [1, [Validators.required]],
      login_method: [1, [Validators.required]],
    });
    // this.formRest.subscribe(v => {
    //   this.businessForm.reset();
    // });
  }

  checkDate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }
      let dateValid = true;
      let parts = moment(value).format('DD/MM/YYYY').split('/');
      let dtDOB = new Date(parts[1] + '/' + parts[0] + '/' + parts[2]);
      let dtCurrent = new Date();
      if (dtCurrent.getFullYear() - dtDOB.getFullYear() < 14) {
        dateValid = false;
      }
      if (dtCurrent.getFullYear() - dtDOB.getFullYear() == 14) {
        if (dtCurrent.getMonth() < dtDOB.getMonth()) {
          dateValid = false;
        }
        if (dtCurrent.getMonth() == dtDOB.getMonth()) {
          if (dtCurrent.getDate() < dtDOB.getDate()) {
            dateValid = false;
          }
        }
      }
      return !dateValid ? { dateInvalid: true } : null;
    };
  }

  showPassword() {
    this.show = !this.show;
  }

  sumbitHandler() {
    this.isbusinessFormSubmitted = true;
    if (this.businessForm.invalid) {
      return;
    }
    let data = this.businessForm.value;
    data['dob'] = moment(this.businessForm.value['dob']).format('DD-MM-YYYY');
    // data['name'] = `${this.businessForm.value['name']} ${this.businessForm.value['lastName']}`;
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(`${key}`, `${this.businessForm.value[key]}`);
    });
    this.authService.register(formData).subscribe((res) => {
      if (res.status === 200) {
        this.toastr.showSuccessToastr(res?.message);
        this.router.navigateByUrl('/user/login');
      }
    });
  }
 
}
