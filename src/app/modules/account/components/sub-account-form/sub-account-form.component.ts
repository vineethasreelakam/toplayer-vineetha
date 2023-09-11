import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
import { SharedService } from 'src/app/modules/shared/services/shared.service';
import { AddSubAccountComponent } from '../add-sub-account/add-sub-account.component';
import { AccountService } from '../../services/account.service';
import { ToastrControlService } from 'src/app/modules/shared/services/toastr.service';
import { AuthService } from 'src/app/modules/login/services/auth/auth.service';
import { LayoutService } from 'src/app/modules/shared/services/layout/layout.service';
declare var require: any;
// const Swal = require('sweetalert2');
@Component({
  selector: 'app-sub-account-form',
  templateUrl: './sub-account-form.component.html',
  styleUrls: ['./sub-account-form.component.scss'],
})
export class SubAccountFormComponent implements OnInit {
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
  buttonName: string = 'Submit';
  empList: any = [];
  barnchUserDetails: any;
  headText: string ='Add New Branch Account';
  constructor(
    public modalService: NgbModal,
    public accountService: AccountService,
    public toastr: ToastrControlService,
    public sharedService: SharedService,
    private formBuilder: FormBuilder,
    public authService: AuthService,
    public layout: LayoutService,
  ) {}

  ngOnInit(): void {
    this.uniqueId = sessionStorage.getItem('userid')
      ? sessionStorage.getItem('userid')
      : this.sharedService.data1;
    this.urlName = sessionStorage.getItem('urlName')
      ? sessionStorage.getItem('urlName')
      : this.sharedService.data2;
    this.barnchUserDetails = JSON.parse(
      `${sessionStorage.getItem('barnchUserDetails')}`
    )
      ? JSON.parse(`${sessionStorage.getItem('barnchUserDetails')}`)
      : this.sharedService.singleDetails;
    sessionStorage.setItem('urlName', this.urlName);
    this.initForm();
    // console.log('dob', new Date(this.barnchUserDetails?.dob) )
    if (this.uniqueId) {
      sessionStorage.setItem('userid', this.uniqueId);
      sessionStorage.setItem(
        'barnchUserDetails',
        JSON.stringify(this.barnchUserDetails)
      );
      if (this.urlName === 'view') {
        this.headText='View Branch Account';
        // this.headerData.breadCrumb[2] = {
        //   name: 'View Entity',
        // };
        this.buttonName = 'Edit';
        this.branchForm.disable();
        // this.getEntityById();
      } else if (this.urlName === 'edit') {
        // this.headerData.breadCrumb[2] = {
        //   name: 'Edit Entity',
        // };
        // this.getEntityById();
      }
    }
    this.getAllCountries();
    this.getEmpList();
  }
  initForm() {
    this.branchForm = this.formBuilder.group({
      first_name: [
        this.barnchUserDetails
          ? this.barnchUserDetails.first_name
            ? this.barnchUserDetails.first_name
            : ''
          : '',
        [Validators.required],
      ],
      last_name: [
        this.barnchUserDetails
          ? this.barnchUserDetails.last_name
            ? this.barnchUserDetails.last_name
            : ''
          : '',
        [Validators.required],
      ],
      email: [
        this.barnchUserDetails
        ? this.barnchUserDetails.user_email
          ? this.barnchUserDetails.user_email
          : ''
        : '',
        [Validators.required, Validators.pattern(validationPatterns.pat_email)],
      ],
      dob: [this.barnchUserDetails
        ? this.barnchUserDetails.dob
          ? new Date(this.barnchUserDetails.dob)
          : ''
        : '', [Validators.required, this.checkDate()]],
      mobile_no: [
        this.barnchUserDetails
        ? this.barnchUserDetails.user_phone
          ? this.barnchUserDetails.user_phone
          : ''
        : '',
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      ],
      password: ['', Validators.required],
      country: [ 
        this.barnchUserDetails
        ? this.barnchUserDetails.country
          ? this.barnchUserDetails.country
          : null
        : null, [Validators.required]],
      gender: [
        this.barnchUserDetails
        ? this.barnchUserDetails.gender
          ? this.barnchUserDetails.gender
          : null
        : null, [Validators.required]],
      account_type: [2, [Validators.required]],
      login_method: [1, [Validators.required]],
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
  getEmpList() {
    const currentUser = JSON.parse(`${sessionStorage.getItem('currentUser')}`);
    const formData = new FormData();
    // for empl;
    formData.append(`type`, `${2}`);
    formData.append(`sub_of`, `${currentUser['user'].user_id}`);
    this.accountService.getAllSubAccount(formData).subscribe((res) => {
      console.log(res);
      this.empList = res;
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
    this.accountService.createSubAccount(formData).subscribe((res) => {
      if (res.status === 200) {
        this.toastr.showSuccessToastr(res.message);
      }
    });
  }

  edit() {
    if (this.urlName === 'view') {
      this.branchForm.enable();
      this.buttonName = 'Submit';
      this.urlName = 'edit';
    } else {
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
    }
  }

  addEmpAccount() {
    console.log('uniqueId', this.uniqueId);
    const modalRef = this.modalService.open(AddSubAccountComponent, {
      size: `modal-dialog modal-lg modal-main-box ${this.layout.config.settings.layout_version}`,
    });
    // modalRef.componentInstance.index = i;
    modalRef.componentInstance.inputData = {branch_user: this.uniqueId,empDetails: null, urlName:null,empId:null};
    modalRef.componentInstance.emitService.subscribe((emmitedValue: any) => {
      this.accountService.createSubAccount(emmitedValue).subscribe((res) => {
        if (res.status === 200) {
          this.toastr.showSuccessToastr(res.message);
          this.getEmpList();
        }
      });
    });
    modalRef.result.then(
      (result: any) => {},
      (reason: any) => {}
    );
  }

  viewSubAccount(user: any) {
    console.log('user',user)
    const modalRef = this.modalService.open(AddSubAccountComponent, {
      size: `modal-dialog modal-lg modal-main-box ${this.layout.config.settings.layout_version}`,
    });
    modalRef.componentInstance.inputData = {branch_user: this.uniqueId,empDetails: user, urlName:'view',empId:user?.user_id};
    // modalRef.componentInstance.emitService.subscribe((emmitedValue: any) => {
    //   this.accountService.createSubAccount(emmitedValue).subscribe((res) => {
    //     if (res.status === 200) {
    //       this.toastr.showSuccessToastr(res.message);
    //       this.getEmpList();
    //     }
    //   });
    // });
    modalRef.result.then(
      (result: any) => {},
      (reason: any) => {}
    );
  }

  blockSubAccount(user: any) {
    let accountStats = '';
    accountStats = user?.status;
    // const swalWithBootstrapButtons = Swal.mixin({
    //   customClass: {
    //     confirmButton: 'btn btn-success',
    //     cancelButton: 'btn btn-danger',
    //   },
    //   buttonsStyling: false,
    // });
    // swalWithBootstrapButtons
    //   .fire({
    //     title: 'Are you sure?',
    //     text: `You want to ${
    //       accountStats === 'blocked' ? 'Unblock' : 'Block'
    //     } this account! `,
    //     type: 'warning',
    //     showCancelButton: true,
    //     confirmButtonText: 'OK',
    //     cancelButtonText: 'Cancel',
    //     reverseButtons: true,
    //   })
    //   .then((result: any) => {
    //     if (result.value) {
    //       const formData = new FormData();
    //       formData.append(`type`, `${accountStats === 'blocked' ? 2 : 1}`);
    //       formData.append(`email`, `${user.user_email}`);
    //       this.accountService.blockSubAccount(formData).subscribe((res) => {
    //         // console.log(res);
    //         if (res.status === 200) {
    //           this.getEmpList();
    //           swalWithBootstrapButtons.fire(
    //             `${accountStats === 'blocked' ? 'Unblocked!' : 'Blocked!'}`,
    //             `${res.message}`,
    //             'success'
    //           );
    //         }
    //       });
    //     } else if (result.dismiss === Swal.DismissReason.cancel) {
    //     }
    //   });
  }

  ngOnDestroy() {
    this.clearSessionStorage();
  }
  clearSessionStorage() {
    this.sharedService.data1 = '';
    this.sharedService.data2 = '';
    this.sharedService.singleDetails = '';
    sessionStorage.removeItem('userid');
    sessionStorage.removeItem('urlName');
    sessionStorage.removeItem('barnchUserDetails');
  }
}
