import { Component, Inject, OnInit, } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrControlService } from 'src/app/modules/shared/services/toastr.service';
import { ProfileService } from '../../services/profile.service';
import { ProfileDataModel } from '../../models/profileData_.model';

@Component({
  selector: 'app-my-profiles',
  templateUrl: './my-profiles.component.html',
  styleUrls: ['./my-profiles.component.scss'],
})
export class MyProfilesComponent implements OnInit {
  profileData: ProfileDataModel;
  profile_id: any;
  linkData: any;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrControlService,
    private profileService: ProfileService,
  ) {}

  ngOnInit(): void {
    this.profileData = JSON.parse(`${sessionStorage.getItem('profileInfo')}`)
    ? JSON.parse(`${sessionStorage.getItem('profileInfo')}`)
    : this.getProfileList();
    if(this.profileData){
      console.log('this.profileData',this.profileData)
      this.profile_id = this.profileData?.profile_id ;
      this.getProfileLink();
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

  getProfileLink(){
    const formData = new FormData();
    formData.append(`profile_id`, `${this.profileData.profile_id}`);
    this.profileService.getProfileLink(formData).subscribe((res) => {
      console.log('getProfileLink',res)
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
        }
      });
      this.linkData = res;
    })
  }

}
