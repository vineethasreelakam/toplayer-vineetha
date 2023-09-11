import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LayoutService } from 'src/app/modules/shared/services/layout/layout.service';
import { AddEventComponent } from '../add-event/add-event.component';
import { ProfileService } from 'src/app/modules/profile/services/profile.service';
import { ProfileLinkTypes } from 'src/app/modules/shared/models/ProfileLinkTypes.model';
import { ProfileDataModel } from 'src/app/modules/profile/models/profileData_.model';
import { DataService } from 'src/app/modules/shared/services/data.service';
import { SharedService } from 'src/app/modules/shared/services/shared.service';
import { ToastrControlService } from 'src/app/modules/shared/services/toastr.service';
import { QrCodeComponent } from 'src/app/modules/shared/components/qr-code/qr-code.component';
// const Swal = require('sweetalert2');

@Component({
  selector: 'app-edit-event-profile',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss'],
})
export class EditEventComponent implements OnInit, OnDestroy {
    linkData:any;
    profileID: any;
    btnIsDisabled :boolean = true;
    events:any;
    linkTypes = ProfileLinkTypes.event;
    profileData: any;
    subscription!: Subscription;
    tabType: string ='event';
    constructor(
        private router: Router,
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
    this.getEventList();
    this.subscription = this.dataService.addedLinkTypeData$.subscribe((data) => {
      if(data!= null){
        this.addProfileLink(data);
      }
    });
  }

  tabChange(type: string){
    this.tabType = type;
    if(type === 'event'){
      this.getEventList();
    }else{
  
    }
  }

    // get event list
    getEventList(){
      const formData = new FormData();
      formData.append(`type`, `${3}`);
      this.profileService.getProfileList(formData).subscribe((res) => {
        this.events = res || [];
        console.log('events',this.events)
        this.btnIsDisabled = this.events ? false : true;
        if(this.profileID){
          this.profileData = this.events.find((event:any) => event.profile_id === this.profileID);
        }
      });
    }

  addEvent(){
    const modalRef = this.modalService.open(AddEventComponent, {
        size: `modal-dialog modal-md modal-dialog-centered  modal-main-box ${this.layout.config.settings.layout_version}`,
      });
      modalRef.componentInstance.qrEditStats = true;
      modalRef.componentInstance.emitService.subscribe((emmitedValue: any) => {
        console.log('emmitedValue',emmitedValue)
        this.getEventList();
      });
      modalRef.result.then(
        (result: any) => {},
        (reason: any) => {}
      );
  }

  // edit event
  editEvent(){

  }

  // delete event 
  deleteEvent(){
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
    //     text: `You want to delete this Event! `,
    //     type: 'warning',
    //     showCancelButton: true,
    //     confirmButtonText: 'OK',
    //     cancelButtonText: 'Cancel',
    //     reverseButtons: true,
    //   })
    //   .then((result: any) => {
    //     if (result.value) {
         
    //     } else if (
    //       result.dismiss === Swal.DismissReason.cancel
    //     ) { }
    //   });
  }

  selectedEvent(id:any){
    console.log('this.events',this.events)
    this.profileID = id
    if(id){
      this.getProfileLink();
      this.profileData = this.events.find((event:any) => event.profile_id === id);
    }else{
      this.linkData =[];
      this.profileData = null;
    }
  }

  getLinkData(linkData:any){
    console.log(linkData)
    const formData = new FormData();
    Object.keys(linkData).forEach((key) => {
      formData.append(`${key}`, `${linkData[key]}`);
    });
    this.profileService.editProfileLink(formData).subscribe((res) => {
      if(res.status === 200){
        this.toastr.showSuccessToastr(res.message);
        this.getProfileLink();
      }
    });
  }

  
  // profile link
  addProfileLink(data:any){
    if(this.profileID){
      let postData:any= {
        profile_id: Number(this.profileID),
        type: data?.value,
        input_value_1: '',
        input_value_2:'',
        enable_time: '',
        redirect:'',
        bg_colour: '',
        content_colour:'',
        status:'1'
      }
    const formData = new FormData();
    Object.keys(postData).forEach((key) => {
      formData.append(`${key}`, `${postData[key]}`);
    });
    this.profileService.addProfileLink(formData).subscribe((res) => {
      if(res.status === 200){
        this.toastr.showSuccessToastr(res.message);
        this.getProfileLink();
      }
    });
  }
  }

  getProfileLink(){
    const formData = new FormData();
    formData.append(`profile_id`, `${this.profileID}`);
    this.profileService.getProfileLink(formData).subscribe((res) => {
      let linkData = res;
      console.log('linkData',linkData)
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
        }else if(link.type === 'timer'){
          link.thumbnailIcon = 'icon-timer';
        }
      });
      linkData.map((link: any) =>{
        link.enable_time = moment(new Date(link.enable_time)).format("DD-MM-YYYY HH:mm:ss");
      })
      this.linkData = linkData;
    })
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

  viewEvent(){
    this.router.navigateByUrl(`/${this.profileData?.public_profile_id}`);
  }
  myEvent(){
      const modalRef = this.modalService.open(QrCodeComponent, {
        size: `modal-dialog modal-md modal-dialog-centered  modal-main-box ${this.layout.config.settings.layout_version}`,
      });
      modalRef.componentInstance.qrEditStats = true;
      modalRef.componentInstance.type = 'event';
      modalRef.componentInstance.profileData = this.profileData;
      modalRef.componentInstance.emitService.subscribe((emmitedValue: any) => {
      });
      modalRef.result.then(
        (result: any) => {},
        (reason: any) => {}
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
