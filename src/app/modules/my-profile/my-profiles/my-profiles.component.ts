import { Component, Inject, OnInit, } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ToastrControlService } from 'src/app/modules/shared/services/toastr.service';
import { ProfileService } from '../../profile/services/profile.service';
import { ProfileDataModel } from '../../profile/models/profileData_.model';
import { LayoutService } from '../../shared/services/layout/layout.service';
import { QrCodeComponent } from '../../shared/components/qr-code/qr-code.component';


@Component({
  selector: 'app-my-profiles',
  templateUrl: './my-profiles.component.html',
  styleUrls: ['./my-profiles.component.scss'],
})
export class MyProfilesComponent implements OnInit {
  profileData: ProfileDataModel;
  profile_id: any;
  linkData: any;
  type: string ='';
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrControlService,
    private profileService: ProfileService,
    public modalService: NgbModal,
    public layout: LayoutService,
    private activateRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    if(this.router.url.split('/').includes('my-event')){
      this.type = 'event';
      this.activateRoute.paramMap.subscribe((obs) => {
        console.log(obs)
        this.profile_id = Number(obs.get('id'));
        this.getEventList();
      });
    }else{
      this.type = 'profile';
      this.profileData = JSON.parse(`${sessionStorage.getItem('profileInfo')}`)
      ? JSON.parse(`${sessionStorage.getItem('profileInfo')}`)
      : this.getProfileList();
      if(this.profileData){
        this.profile_id = this.profileData?.profile_id ;
        this.getProfileLink();
      }
    }
  
  }

  getProfileList(){
    const formData = new FormData();
    formData.append(`type`, `${1}`);
    this.profileService.getProfileList(formData).subscribe((res) => {
      this.profileData  = res[0] || null;
      this.profile_id = this.profileData?.profile_id;
      sessionStorage.setItem('profileInfo', JSON.stringify(this.profileData));
      this.getProfileLink();
    })
  }

  // get event list
  getEventList(){
    const formData = new FormData();
    formData.append(`type`, `${3}`);
    this.profileService.getProfileList(formData).subscribe((res) => {
      if(this.profile_id){
        this.profileData = res.find((event:any) => event.profile_id === this.profile_id);
        this.getProfileLink();
      }
    });
  }

  getProfileLink(){
    const formData = new FormData();
    formData.append(`profile_id`, `${this.profileData.profile_id}`);
    this.profileService.getProfileLink(formData).subscribe((res) => {
      res.map((link: any) =>{
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
      this.linkData = res;
    })
  }

   export() {

  }

  searchProfile(){
    switch (this.type) {
      case 'profile':
        this.router.navigateByUrl(`/user/my-profile/search-profiles`);
        break;
      case 'event':
        this.router.navigateByUrl(`/user/my-event/${this.profile_id}/search-events`);
        break;
      default:
    }
  }

  backToApplication(){
    switch (this.type) {
      case 'profile':
        this.router.navigateByUrl(`/user/profile`);
        break;
      case 'event':
        this.router.navigateByUrl(`/user/event`);
        break;
      default:
    }
  }

  myProfile(){
    const modalRef = this.modalService.open(QrCodeComponent, {
      size: `modal-dialog modal-md modal-dialog-centered  modal-main-box ${this.layout.config.settings.layout_version}`,
    });
    modalRef.componentInstance.qrEditStats = false;
    modalRef.componentInstance.emitService.subscribe((emmitedValue: any) => {
    });
    modalRef.result.then(
      (result: any) => {},
      (reason: any) => {}
    );
  }

}
