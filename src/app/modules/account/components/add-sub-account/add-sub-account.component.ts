import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import * as moment from 'moment';

import { validationPatterns } from 'src/app/modules/shared/validationPatterns';
import { ToastrControlService } from 'src/app/modules/shared/services/toastr.service';
import { SharedService } from 'src/app/modules/shared/services/shared.service';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-add-sub-account',
  templateUrl: './add-sub-account.component.html',
  styleUrls: ['./add-sub-account.component.scss'],
})
export class AddSubAccountComponent implements OnInit {
  @Output() emitService = new EventEmitter();
  @Input() inputData: any;
  public show: boolean = false;
  branchForm!: FormGroup;
  isFormSubmitted = false;
  countries: any;
  gender = [
    { id: 1, name: 'Male' },
    { id: 2, name: 'Female' },
    { id: 3, name: 'Other' },
  ];
  urlName: string = '';
  uniqueId: any;
  empUserDetails: any;
  buttonName: string = 'Submit';
  headText: string ='Add Sub Account';
  constructor(
    public activeModal: NgbActiveModal,
    public sharedService: SharedService,
    private accountService: AccountService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // console.log('inputData',this.inputData)
    this.uniqueId = sessionStorage.getItem('empId')
      ? sessionStorage.getItem('empId')
      : this.inputData.empId;
    this.urlName = sessionStorage.getItem('empUrlName')
      ? sessionStorage.getItem('empUrlName')
      : this.inputData.urlName;
    this.empUserDetails = JSON.parse(
      `${sessionStorage.getItem('empUserDetails')}`
    )
      ? JSON.parse(`${sessionStorage.getItem('empUserDetails')}`)
      : this.inputData.empDetails;
    sessionStorage.setItem('empUrlName', this.urlName);

    this.initForm();
    if (this.uniqueId) {
      sessionStorage.setItem('empId', this.uniqueId);
      sessionStorage.setItem(
        'empUserDetails',
        JSON.stringify(this.empUserDetails)
      );
      if (this.urlName === 'view') {
        this.headText ='View Sub Account';
        this.buttonName = 'Edit';
        this.branchForm.disable();
      } else if (this.urlName === 'edit') {
        // this.headerData.breadCrumb[2] = {
        //   name: 'Edit Entity',
        // };
        // this.getEntityById();
      }
    }

    this.getAllCountries();
  }

  initForm() {
    this.branchForm = this.formBuilder.group({
      first_name: [
        this.empUserDetails
          ? this.empUserDetails.first_name
            ? this.empUserDetails.first_name
            : ''
          : '',
        [Validators.required],
      ],
      last_name: [
        this.empUserDetails
          ? this.empUserDetails.last_name
            ? this.empUserDetails.last_name
            : ''
          : '',
        [Validators.required],
      ],
      email: [
        this.empUserDetails
          ? this.empUserDetails.user_email
            ? this.empUserDetails.user_email
            : ''
          : '',
        [Validators.required, Validators.pattern(validationPatterns.pat_email)],
      ],
      password: ['', [Validators.required]],
      dob: [
        this.empUserDetails
          ? this.empUserDetails.dob
            ? new Date(this.empUserDetails.dob)
            : ''
          : '',
        [Validators.required, this.checkDate()],
      ],
      mobile_no: [
        this.empUserDetails
          ? this.empUserDetails.user_phone
            ? this.empUserDetails.user_phone
            : ''
          : '',
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      ],
      country: [
        this.empUserDetails
          ? this.empUserDetails.country
            ? this.empUserDetails.country
            : null
          : null,
        [Validators.required],
      ],
      gender: [
        this.empUserDetails
          ? this.empUserDetails.gender
            ? this.empUserDetails.gender
            : null
          : null,
        [Validators.required],
      ],
      account_type: [3, [Validators.required]],
      login_method: [1, [Validators.required]],
      branch_id: [Number(this.inputData?.branch_user)],
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

  getAllCountries() {
    this.sharedService.getAllCountries().subscribe((res) => {
      this.countries = res;
    });
  }
  showPassword() {
    this.show = !this.show;
  }

  sumbitHandler() {
    this.isFormSubmitted = true;
    if (this.branchForm.invalid) {
      return;
    }
    let data = this.branchForm.value;
    data['dob'] = moment(this.branchForm.value['dob']).format('DD-MM-YYYY');
    console.log('branchForm', data);
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(`${key}`, `${this.branchForm.value[key]}`);
    });

    this.emitService.next(formData);
    this.activeModal.close();
  }

  closeModal(message: string) {
    this.activeModal.close();
  }

  ngOnDestroy() {
    this.clearSessionStorage();
  }
  clearSessionStorage() {
    sessionStorage.removeItem('empId');
    sessionStorage.removeItem('empUrlName');
    sessionStorage.removeItem('empUserDetails');
  }
}
