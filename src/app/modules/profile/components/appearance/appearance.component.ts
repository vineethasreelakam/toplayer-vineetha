import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ToastrControlService } from 'src/app/modules/shared/services/toastr.service';
import { ProfileService } from '../../services/profile.service';
import { ProfileDataModel } from '../../models/profileData_.model';
import { ThemeListComponent } from '../theme-list/theme-list.component';
import { LayoutService } from 'src/app/modules/shared/services/layout/layout.service';
import { SharedService } from 'src/app/modules/shared/services/shared.service';
import { ImageCropperComponent } from 'src/app/modules/shared/components/image-cropper/image-cropper.component';

@Component({
  selector: 'app-appearance',
  templateUrl: './appearance.component.html',
  styleUrls: ['./appearance.component.scss'],
})
export class AppearanceComponent implements OnInit {
  appearanceForm!: FormGroup;
  isFormSubmitted = false;
  preview:any ='';
  currentFile:any;
  profileData: ProfileDataModel;
  profile_id: any;
  linkData: any;
  profileBgColor:string = '#ffffff';
  profileBtnColor:string = '#ffffff';
  profileBtnFontColor:string = '#ffffff';
  selectedTheme:any;
  allThemes:any;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrControlService,
    public profileService: ProfileService,
    public modalService: NgbModal,
    public layout: LayoutService,
    public sharedService: SharedService,
  ) {}

  ngOnInit(): void {
    this.getProfileList();
    this.profileData = JSON.parse(`${sessionStorage.getItem('profileInfo')}`)
    ? JSON.parse(`${sessionStorage.getItem('profileInfo')}`)
    : this.getProfileList();
    console.log('profileData',this.profileData)
    if(this.profileData){
      this.profile_id = this.profileData?.profile_id ;
      this.initForm();
      this.getProfileLink();
    }
  }

  getProfileList(){
    const formData = new FormData();
    formData.append(`type`, `${1}`);
    this.profileService.getProfileList(formData).subscribe((res) => {
      console.log('Profile',res)
      this.profileData  = res[0] || null;
      this.profile_id = this.profileData?.profile_id;
      sessionStorage.setItem('profileInfo', JSON.stringify(this.profileData));
      if(this.profileData){
        this.profileBgColor = this.profileData['theme']['bg_colour'];
        this.profileBtnColor = this.profileData['theme']['link_bg'];
        this.profileBtnFontColor = this.profileData['theme']['link_content_colour'];
      }
      this.getProfileLink();
      this.initForm();
    })
  }

  initForm(){
    this.appearanceForm = this.formBuilder.group({
      profile_id:[this.profile_id],
      public_profile_id:[this.profileData.public_profile_id],
      name: [this.profileData
        ? this.profileData.name
          ? this.profileData.name
          : ''
        : '', [Validators.required]],
      bio: [this.profileData
        ? this.profileData.bio
          ? this.profileData.bio
          : ''
        : '', [Validators.required]],
      profile_image:[''],
    });
  }

  selectImage(event:any){
    console.log(event.target.files)
    const file = event.target.files;
    if (file[0]) { 
      const modalRef = this.modalService.open(ImageCropperComponent, {
        size: `modal-dialog modal-md modal-dialog-centered modal-main-box ${this.layout.config.settings.layout_version}`,
      });
      modalRef.componentInstance.imageChangedEvent = event;
      modalRef.componentInstance.profileData = this.profileData;
      modalRef.componentInstance.emitService.subscribe((image: any) => {
        if(image){
         this.saveImage(image, file);
        }
      });
      modalRef.result.then(
        (result: any) => {},
        (reason: any) => {}
      );
    }
  }

  saveImage(image: Blob, file:any){
    const formData = new FormData();
    formData.append(`parent_id`, `${this.profileData.profile_id}`);
    formData.append(`parent_type`, `profile`);
    formData.append(`image`, image, file[0].name);
    this.sharedService.imageUpload(formData).subscribe((res) => {
      console.log('res',res)
      this.appearanceForm.controls.profile_image.setValue(res.filepath);
      this.sumbitHandler();
    });
  }

  removeImage(){
    this.preview ='';
  }

  sumbitHandler(){
    this.isFormSubmitted = true;
    if (this.appearanceForm.invalid) {
      return;
    }
    const formData = new FormData();
    Object.keys(this.appearanceForm.value).forEach((key) => {
      formData.append(`${key}`, `${this.appearanceForm.value[key]}`);
    });
    this.profileService.profileEdit(formData).subscribe((res) => {
      if(res.status === 200){
        this.toastr.showSuccessToastr(res.message);
        this.getProfileList();
      }else{
        this.getProfileList();
      }
    })
    console.log(this.appearanceForm.value)
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
        }
      });
      this.linkData = res;
    })
  }


  // custom 
  changeBgCol(event:any){
    this.profileBgColor = event.target.value;
  }
  changeBtnCol(event:any){
    this.profileBtnColor = event.target.value;
  }
  changeBtnFontCol(event:any){
    this.profileBtnFontColor = event.target.value;
  }

  getAllThemes(){
    this.profileService.getAllThemes().subscribe((res) => {
        this.allThemes = res;
        this.selectCustomTheme(this.allThemes)
    })
  }
  selectCustomTheme(allThemes:any){
    const modalRef = this.modalService.open(ThemeListComponent, {
      size: `modal-dialog modal-xl modal-dialog-centered modal-main-box ${this.layout.config.settings.layout_version}`,
    });
    modalRef.componentInstance.allThemes = allThemes;
    modalRef.componentInstance.linkData = this.linkData;
    modalRef.componentInstance.profileData = this.profileData;
    modalRef.componentInstance.emitService.subscribe((theme: any) => {
      if(theme){
       this.saveSelectedTheme(theme);
       this.selectedTheme = theme
      }
    });
    modalRef.result.then(
      (result: any) => {},
      (reason: any) => {}
    );
  }
  saveSelectedTheme(theme:any){
    console.log(this.profileData)
    const formData = new FormData();
    formData.append(`profile_id`, `${this.profileData.profile_id}`);
    formData.append(`profile_theme_id`, `${theme.profile_theme_id}`);
    this.profileService.applyThemes(formData).subscribe((res) => {
      console.log(res);
      if(res.status === 200){
        if(res.status === 200){
          this.toastr.showSuccessToastr(res.message);
          this.getProfileList();
        }
      }

    })
  }

  applyCustomTheme(){
    const formData = new FormData();
    formData.append(`profile_id`, `${this.profileData.profile_id}`);
    formData.append(`profile_background`, `${this.profileBgColor || ''}`);
    formData.append(`link_bg_colour`, `${this.profileBtnColor || ''}`);
    formData.append(`link_content_colour`, `${this.profileBtnFontColor || ''}`);
    this.profileService.applyCustomTheme(formData).subscribe((res) => {
      console.log(res);
      if(res.status === 200){
        if(res.status === 200){
          this.toastr.showSuccessToastr(res.message);
          this.getProfileList();
        }
      }

    })
  }

}
