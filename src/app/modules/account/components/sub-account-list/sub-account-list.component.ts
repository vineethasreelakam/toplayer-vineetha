import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddSubAccountComponent } from '../add-sub-account/add-sub-account.component';
import { AccountService } from '../../services/account.service';
import { ToastrControlService } from 'src/app/modules/shared/services/toastr.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/modules/shared/services/shared.service';
declare var require: any;
// const Swal = require('sweetalert2');
@Component({
  selector: 'app-sub-account-list',
  templateUrl: './sub-account-list.component.html',
  styleUrls: ['./sub-account-list.component.scss'],
})
export class SubAccountListComponent implements OnInit {
  branchUserList: any = [];
  constructor(
    public modalService: NgbModal,
    public accountService: AccountService,
    public toastr: ToastrControlService,
    private router: Router,
    public sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.getBranchLevelUsers();
  }

  getBranchLevelUsers() {
    const currentUser = JSON.parse(`${sessionStorage.getItem('currentUser')}`);
    const formData = new FormData();
    formData.append(`type`, `${1}`);
    formData.append(`sub_of`, `${currentUser['user'].user_id}`);
    // for empl;
    // formData.append(`type`, `${2}`);
    // formData.append(`sub_of`, `${login_user_id}`);
    this.accountService.getAllSubAccount(formData).subscribe((res) => {
      console.log(res);
      this.branchUserList = res;
    });
  }

  addSubAccount() {
    this.router.navigateByUrl(`/user/account/sub-account/create`);
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
    //     text: `You want to ${accountStats === 'blocked'? 'Unblock' : 'Block'} this account! `,
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
    //         console.log(res);
    //         if (res.status === 200) {
    //           this.getBranchLevelUsers();
    //           swalWithBootstrapButtons.fire(
    //             `${accountStats === 'blocked'? 'Unblocked!' : 'Blocked!'}`,
    //             `${res.message}`,
    //             'success'
    //           );
    //         }
    //       });
    //     } else if (
    //       result.dismiss === Swal.DismissReason.cancel
    //     ) { }
    //   });
  }

  viewSubAccount(user: any) {
    this.sharedService.data1 = user?.user_id;
    this.sharedService.data2 = 'view';
    this.sharedService.singleDetails = user;
    this.router.navigateByUrl(`/user/account/sub-account/view/${user?.user_id}`);
  }
  editSubAccount(id: string) {
    this.sharedService.data1 = id;
    this.sharedService.data2 = 'edit';
    this.router.navigateByUrl(`/user/account/sub-account/edit/${id}`);
  }
}
