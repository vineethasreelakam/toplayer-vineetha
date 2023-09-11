import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import * as moment from 'moment';
import { Subject } from 'rxjs';

import { validationPatterns } from 'src/app/modules/shared/validationPatterns';
import { ToastrControlService } from 'src/app/modules/shared/services/toastr.service';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-individual-form',
  templateUrl: './individual-form.component.html',
  styleUrls: ['./individual-form.component.scss'],
})
export class IndividualFormComponent implements OnInit {
  @Input()
  countries: any = [];
  @Input()
  gender: any = [];
  @Input() formRest!: Subject<boolean>;
  @Input() urlParams:any;
  public show: boolean = false;
  selected: string | undefined;
  individualForm!: FormGroup;
  isFormSubmitted = false;

  //   countries: any = [];
  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastr: ToastrControlService
  ) {}

  ngOnInit(): void {
    this.individualForm = this.formBuilder.group({
      first_name: [this.urlParams ? this.urlParams?.name : '' , [Validators.required]],
      last_name: ['', [Validators.required]],
      email: [
        this.urlParams ? this.urlParams?.email : '',
        [Validators.required, Validators.pattern(validationPatterns.pat_email)],
      ],
      password: ['', [Validators.required]],
      dob: ['', [Validators.required, this.checkDate()]],
      mobile_no: [
        '',
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      ],
      country: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      account_type: [0, [Validators.required]],
      login_method: [1, [Validators.required]],
    });
    this.formRest.subscribe((v) => {
      this.individualForm.reset();
    });
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
    this.isFormSubmitted = true;
    if (this.individualForm.invalid) {
      return;
    }
    let data = this.individualForm.value;
    // data['name'] = `${this.individualForm.value['name']} ${this.individualForm.value['lastName']}`;
    data['dob'] = moment(this.individualForm.value['dob']).format('DD-MM-YYYY');
    console.log(data)
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(`${key}`, `${this.individualForm.value[key]}`);
    });
    this.authService.register(formData).subscribe((res) => {
      if (res.status === 200) {
        this.toastr.showSuccessToastr(res?.message);
        this.router.navigateByUrl('/user/login');
      }
    });
  }
}
