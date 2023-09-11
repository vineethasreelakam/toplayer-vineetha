import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// const Swal = require('sweetalert2');

import { ToastrControlService } from 'src/app/modules/shared/services/toastr.service';
import { ProfileService } from '../../services/profile.service';
import { ProfileDataModel } from '../../models/profileData_.model';
import { SharedService } from 'src/app/modules/shared/services/shared.service';
import { DataService } from 'src/app/modules/shared/services/data.service';
import { LayoutService } from 'src/app/modules/shared/services/layout/layout.service';
import { QrCodeComponent } from 'src/app/modules/shared/components/qr-code/qr-code.component';
import { ProfileLinkTypes } from 'src/app/modules/shared/models/ProfileLinkTypes.model';


@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss'],
})
export class CreateProfileComponent implements OnInit, OnDestroy {

  linkData:any;
  profileID: any;
  profileData: ProfileDataModel;
  btnIsDisabled :boolean = true;
  subscription!: Subscription;
  tabType: string ='profile';
  linkTypes = ProfileLinkTypes.individual;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrControlService,
    public profileService: ProfileService,
    public sharedService: SharedService,
    public dataService: DataService,
    public modalService: NgbModal,
    @Inject(DOCUMENT) private document: Document,
    public layout: LayoutService,
  ) {
    
  }

  ngOnInit(): void {
    this.getProfileList();
      this.subscription = this.dataService.addedLinkTypeData$.subscribe((data) => {
        console.log('data',data)
        if(data!= null){
          this.addProfileLink(data);
        }
        // this.dataService.getAddedLinkType(data);
      });
  
  }

  tabChange(type: string){
    this.tabType = type;
    if(type === 'profile'){
      this.getProfileList();
    }else{
  
    }
  }

  // get profile list
  getProfileList(){
    const formData = new FormData();
    formData.append(`type`, `${1}`);
    this.profileService.getProfileList(formData).subscribe((res) => {
      this.profileData = res[0] || null;
      this.btnIsDisabled = this.profileData ? false : true;
      this.profileID = this.profileData?.public_profile_id || '';
      sessionStorage.setItem('profileInfo', JSON.stringify(this.profileData));
      if(this.profileData){
        this.getProfileLink();
        // this.getProfileBio();
      }
      
    })
  }

  getProfileBio(){
    const formData = new FormData();
    formData.append(`profile_id`, `${this.profileData?.profile_id}`);
    this.profileService.getProfileBio(formData).subscribe((res) => {
      console.log('getProfileBio',res)
    });
  }

    // edit profile
    editProfileId(){
      if(this.profileID){
        const formData = new FormData();
        formData.append(`profile_id`, `${this.profileData.profile_id}`);
        formData.append(`public_profile_id`, `${this.profileID}`);
        formData.append(`name`, `${this.profileData.name}`);
        formData.append(`bio`, `${this.profileData.bio}`);
     
        this.profileService.profileEdit(formData).subscribe((res) => {
          if(res.status === 200){
            this.toastr.showSuccessToastr(res.message);
            this.getProfileList();
          }
        })
      }else{
        this.toastr.showWarningToastr('Add valid Profile ID!');
      }
    }

  getLinkData(linkData:any){
    // linkData.redirect = true;
    // linkData.enable_time ='07-05-2023 17:30:25';
    // linkData.bg_colour = '#ff80bf';
    // linkData.content_colour = '#ff80bf';
    const formData = new FormData();
    Object.keys(linkData).forEach((key) => {
      formData.append(`${key}`, `${linkData[key]}`);
    });
    // formData.append(`social_tray`, `${null}`);
    // formData.append(`redirect`, `${false}`);
    this.profileService.editProfileLink(formData).subscribe((res) => {
      // console.log('getLinkData',res)
      if(res.status === 200){
        this.toastr.showSuccessToastr(res.message);
      }
    })
  }

  // profile link
  addProfileLink(data:any){
    if(this.profileData){
      let postData:any= {
        profile_id: Number(this.profileData.profile_id),
        type: data?.value,
        input_value_1: '',
        input_value_2:'',
        enable_time: '',
        redirect: false,
        bg_colour: '',
        content_colour:'',
        status:'1'
      }
    const formData = new FormData();
    Object.keys(postData).forEach((key) => {
      formData.append(`${key}`, `${postData[key]}`);
    });
    this.profileService.addProfileLink(formData).subscribe((res) => {
      console.log('addProfileLink',res)
      if(res.status === 200){
        this.toastr.showSuccessToastr(res.message);
        this.getProfileLink();
      }
    });
  }
  }

  getProfileLink(){
    const formData = new FormData();
    formData.append(`profile_id`, `${this.profileData.profile_id}`);
    this.profileService.getProfileLink(formData).subscribe((res) => {
      let linkData = res;
      linkData.map((link: any) =>{
        if(link.type === 'link'){
          link.thumbnailIcon = 'icon-link';
        }else if(link.type === 'text'){
          link.thumbnailIcon = 'icon-text';
        }else if(link.type === 'call'){
          link.thumbnailIcon = 'icon-mobile';
        }else if(link.type === 'whatsapp'){
          link.thumbnailIcon = 'icofont icofont-brand-whatsapp';
        }else if(link.type === 'sms'){
          link.thumbnailIcon = 'icon-comment-alt';
        }else if(link.type === 'location'){
          link.thumbnailIcon = 'icon-location-pin';
        }else if(link.type === 'youtube'){
          link.thumbnailIcon = 'icon-youtube';
        }
      });
      linkData.map((link: any) =>{
        link.enable_time = moment(new Date(link.enable_time)).format("DD-MM-YYYY HH:mm:ss");
      })
      this.linkData = linkData;
     console.log('link', this.linkData)
    })
  }

  myProfile(){
    console.log('this.profileData',this.profileData)
    const modalRef = this.modalService.open(QrCodeComponent, {
      size: `modal-dialog modal-md modal-dialog-centered  modal-main-box ${this.layout.config.settings.layout_version}`,
    });
    modalRef.componentInstance.qrEditStats = true;
    modalRef.componentInstance.type = 'profile';
    modalRef.componentInstance.profileData = this.profileData;
    modalRef.componentInstance.emitService.subscribe((emmitedValue: any) => {
    });
    modalRef.result.then(
      (result: any) => {},
      (reason: any) => {}
    );
  }

  // delete link
  deleteLink(link:any){
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
    //     text: `You want to delete this Connect Point! `,
    //     type: 'warning',
    //     showCancelButton: true,
    //     confirmButtonText: 'OK',
    //     cancelButtonText: 'Cancel',
    //     reverseButtons: true,
    //   })
    //   .then((result: any) => {
    //     if (result.value) {
    //       const formData = new FormData();
    //       formData.append(`link_id`, `${link.profile_link_id}`);
    //       this.profileService.deleteProfileLink(formData).subscribe((res) => {
    //         if(res.status === 200){
    //           this.toastr.showSuccessToastr(res.message);
    //           this.getProfileLink();
    //         }
    //       })
    //     } else if (
    //       result.dismiss === Swal.DismissReason.cancel
    //     ) { }
    //   });
  }

  viewProfile(){
    this.router.navigateByUrl(`/${this.profileData?.public_profile_id}`);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
