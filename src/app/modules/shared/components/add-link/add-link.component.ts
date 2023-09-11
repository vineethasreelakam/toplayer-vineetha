import {
  Component,
  Inject,
  OnInit,
  ViewChild,
  ElementRef,
  Output, EventEmitter, Input, OnDestroy
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrControlService } from 'src/app/modules/shared/services/toastr.service';
// import { DragulaService } from 'ng2-dragula';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LayoutService } from '../../services/layout/layout.service';
import { AddThumbnailComponent } from '../modals/add-thumbnail/add-thumbnail.component';
import { OwlDateTimeComponent } from 'ng-pick-datetime';
import { LinkTypesComponent } from '../link-types/link-types.component';
import { ProfileService } from 'src/app/modules/profile/services/profile.service';
import { SharedService } from '../../services/shared.service';
import { DataService } from '../../services/data.service';
import * as moment from 'moment';
import { SnapListModel } from '../../models/SnapList.model';
import { ImageCropperComponent } from '../image-cropper/image-cropper.component';
declare var require: any;
// const Swal = require('sweetalert2');

@Component({
  selector: 'app-add-link',
  templateUrl: './add-link.component.html',
  styleUrls: ['./add-link.component.scss'],
})
export class AddLinkComponent implements OnInit, OnDestroy {
  @ViewChild('inputBox') _el: ElementRef;
  @Output() emitService = new EventEmitter();
  @Output() deleteLinkService = new EventEmitter();
  @Input() buttonDisable: boolean;
  @Input() linkData: any;
  @Input() linkTypes: any;
  @Input() profileData: any;
  // linkData: any;
  showUrl: any;
  showTitle: any;
  showHeadLine: any;

  linkTypeValue: string ='';
dt: OwlDateTimeComponent<any>;
snapList: any;
subscription!: Subscription;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrControlService,
    public modalService: NgbModal,
    public layout: LayoutService,
    public profileService: ProfileService,
    public dataService: DataService,
    private sanitizer: DomSanitizer,
    public sharedService: SharedService,
  ) // private dragulaService: DragulaService
  {
    
  }

  ngOnInit(): void {
    this.subscription = this.dataService.getAddedLinkTypeData$.subscribe((data) => {
      if(data != null){
        this.addLink(data.value);
      }
    });
    this.getSnapList();
  }

  getSnapList(){
    const formData = new FormData();
    formData.append(`type`, `${1}`);
    this.sharedService.getSnapData(formData).subscribe((res) => {
      console.log('snap',res)
      this.snapList = res;
    })
  }

  selectLinkType(){
    const modalRef = this.modalService.open(LinkTypesComponent, {
      size: `modal-dialog modal-lg modal-dialog-centered  modal-main-box ${this.layout.config.settings.layout_version}`,
    });
    modalRef.componentInstance.linkTypes = this.linkTypes;
    modalRef.componentInstance.emitService.subscribe((emmitedValue: any) => {
      this.dataService.addedLinkType(emmitedValue);
      // this.addLink(emmitedValue?.value);
    });
    modalRef.result.then(
      (result: any) => {},
      (reason: any) => {}
    );
  }
  addLink(linkTypeValue:any) {
    let data ;
    switch(linkTypeValue) {
      case 'link':
        data = { title: '', url: '', linkType: linkTypeValue, urlText:'', titleText:'Title', urlStats:true, redirectIcon: true, imageIcon: true, scheduleIcon: true, statsIcon: true, colorIcon: true}
        break;
      case 'text':
        data = { title: '', titleText:'Headline Title', linkType: linkTypeValue, urlStats:false, redirectIcon: false, imageIcon: true, scheduleIcon: true, statsIcon: false, colorIcon: true}
        break;
      case 'call':
        data = { title: '', titleText:'', linkType: linkTypeValue, urlStats:false, redirectIcon: false, imageIcon: true, scheduleIcon: true, statsIcon: true, colorIcon: true}
        break;
      case 'whatsapp':
        data = { title: '', titleText:'', linkType: linkTypeValue, urlStats:false, redirectIcon: false, imageIcon: true, scheduleIcon: true, statsIcon: true, colorIcon: true}
        break;
      case 'sms':
        data = { title: '', titleText:'', linkType: linkTypeValue, urlStats:false, redirectIcon: false, imageIcon: true, scheduleIcon: true, statsIcon: true, colorIcon: true}
        break;
      case 'location':
        data = { title: '', titleText:'Location', urlText:'Location', linkType: linkTypeValue, urlStats:false, redirectIcon: false, imageIcon: true, scheduleIcon: true, statsIcon: false, colorIcon: true}
        break;
      case 'youtube':
        data = { title: '', titleText:'Youtube', urlText:'Youtube', linkType: linkTypeValue, urlStats:false, redirectIcon: false, imageIcon: false, scheduleIcon: true, statsIcon: false, colorIcon: false}
        break;
      
      default:
        data = null;
        // code block
    }
 
  }

  changeTitle(event: any, i: any) {
    if(this.linkData[i].type === 'whatsapp'){
      this.linkData[i].input_value_2 = `https://wa.me/${event.target.value.trim()}`
    }
    this.linkData[i].input_value_1 = event.target.value.trim() || '';
  }
  changeUrl(event: any, i: any) {
    // console.log('event',event)
    if(this.linkData[i].type === 'location'){
      this.linkData[i].input_value_1 = 'Location';
      this.linkData[i].input_value_2 = event.target.value.trim() || '';
    }else if(this.linkData[i].type === 'youtube'){
      let youtubeUrl = event.target.value.trim().split('/');
      this.linkData[i].input_value_1 = 'YouTube';
      this.linkData[i].input_value_2 = `https://www.youtube.com/embed/${youtubeUrl[(youtubeUrl.length -1)]}`;
    }else if(this.linkData[i].type === 'timer'){
      this.linkData[i].input_value_1 = 'Timer';
      this.linkData[i].input_value_2 = moment(event.value).format("DD-MM-YYYY HH:mm:ss");
    }else if(this.linkData[i].type === 'rsvp'){
      this.linkData[i].input_value_1 = event.target.value.trim() || '';
    }else if(this.linkData[i].type === 'link'){
      this.linkData[i].input_value_2 = this.checkDomain(event.target.value.trim(), i)
      // this.linkData[i].input_value_2 = event.target.value.trim() || '';
      // this.linkData[i].social_tray = 0;
    }else{
      this.linkData[i].input_value_2 = event.target.value.trim() || '';
    }
  
  }

  checkDomain(url:any, i:any){
    const formData = new FormData();
        formData.append(`url`, `${url}`);
        this.sharedService.domainCheck(formData).subscribe((res) => {
          console.log('checkDomain',res)
          if(res.valid){
            this.linkData[i].input_value_1 = res.title || ''
            this.linkData[i].social_tray = 0;
          }
        })
    return url;
  }

     // image upload
     selectFile(event:any, i:any){
      const file = event.target.files;
      if (file[0]) { 
          const modalRef = this.modalService.open(ImageCropperComponent, {
            size: `modal-dialog modal-md modal-dialog-centered modal-main-box ${this.layout.config.settings.layout_version}`,
          });
          modalRef.componentInstance.imageChangedEvent = event;
          modalRef.componentInstance.emitService.subscribe((image: any) => {
            console.log('image',image)
            if(image){
              this.saveImageToLink(image, file, i);
            }
          });
          modalRef.result.then(
            (result: any) => {},
            (reason: any) => {}
          );
        }
    }
    saveImageToLink(image: Blob, file:any, i: any){
      const formData = new FormData();
      formData.append(`parent_id`, `${this.linkData[i].profile_link_id}`);
      formData.append(`parent_type`, `link`);
      formData.append(`image`, image, file[0].name);
      this.sharedService.imageUpload(formData).subscribe((res) => {
        // console.log('res',res)
        this.linkData[i].input_value_1 = file[0].name;
        this.linkData[i].input_value_2 = res.filepath;
      });
    }

  snapChange(value:any, i:any){
    this.linkData[i].input_value_1 = this.snapList.find((snap:any) => snap.snap_id === value).title;
    this.linkData[i].input_value_2 = value;
  }

  rsvpClick(value:any, i:any){
    this.linkData[i].input_value_2 = value;
    console.log(this.linkData[i])
  }

  removeLink(i:any, link:any){
   this.deleteLinkService.next(link);
  }

  addRedirect(i: any, link: any) {
    if(this.linkData[i].hasOwnProperty('addRedirectStats')){
      delete this.linkData[i]['addRedirectStats'];
    }else{
      this.linkData[i].addRedirectStats = true;
    }
  }

  addSchedule(i: any, link: any) {
    if(this.linkData[i].hasOwnProperty('addScheduleStats')){
      delete this.linkData[i]['addScheduleStats'];
    }else{
      this.linkData[i].addScheduleStats = true;
    }
    
  }

  addColorPicker(i: any, link: any) {
    if(this.linkData[i].hasOwnProperty('addColorIcon')){
      delete this.linkData[i]['addColorIcon'];
    }else{
      this.linkData[i].addColorIcon = true;
    }
  }


  addThumnail(i: any, link: any) {
    const modalRef = this.modalService.open(AddThumbnailComponent, {
      size: `modal-dialog modal-md modal-dialog-centered modal-main-box ${this.layout.config.settings.layout_version}`,
    });
    modalRef.componentInstance.index = i;
    modalRef.componentInstance.emitService.subscribe((emmitedValue: any) => {
      if(emmitedValue){
          this.linkData[emmitedValue.index].addThumbnailStats = true;
          this.linkData[emmitedValue.index].thumbnailIcon = emmitedValue.icon;
          if(emmitedValue.type === 'icon'){
            this.linkData[i].link_icon = emmitedValue.icon;
            this.linkData[i].link_bg_image = '';
          }else{
            this.saveImage(emmitedValue.icon, emmitedValue.file, i)
            // this.linkData[i].link_bg_image = emmitedValue.icon;
          }
          console.log( this.linkData[i])
      }
    });
    modalRef.result.then(
      (result: any) => {},
      (reason: any) => {}
    );
  }
  addSocialTray(i: any, link: any) {
    if(this.linkData[i].hasOwnProperty('addSocialTrayStats')){
      delete this.linkData[i]['addSocialTrayStats'];
    }else{
      this.linkData[i].addSocialTrayStats = true;
    }
  }

  saveImage(image: Blob, file:any, i: any){
    const formData = new FormData();
    formData.append(`parent_id`, `${this.linkData[i].profile_link_id}`);
    formData.append(`parent_type`, `link`);
    formData.append(`image`, image, file[0].name);
    this.sharedService.imageUpload(formData).subscribe((res) => {
      // console.log('res',res)
      this.linkData[i].link_bg_image = res.filepath;
      this.linkData[i].link_icon = '';
    });
  }
  removeThumnail(i:any){
    this.linkData[i]['link_icon'] = '';
  }
  saveLink(i:any, link:any){
    // console.log('link',link)
    if(!link.input_value_1 || link.input_value_1 === 'null'){
      this.toastr.showErrorToastr('Please enter details!');
    }else{
      if(link.type === "link"){
        if(!link.input_value_1 || link.input_value_1 === 'null' || !link.input_value_2 || link.input_value_2 === 'null'){
          this.toastr.showErrorToastr('Please enter details!');
        }else{
          this.emitService.next(link);
        }
      }else{
        this.emitService.next(link);
      }
    }

  }

  checkOption(link:any, type:any){
    if(type === 'thumbnail'){
      let thumbnailAllowed =['link','call','whatsapp','location','sms'];
     return thumbnailAllowed.includes(link?.type) ? true : false;
    }else if(type === 'schedule'){
      let scheduleAllowed =['link','text','call','whatsapp','location','sms','youtube','rsvp','timer'];
     return scheduleAllowed.includes(link?.type) ? true : false;
    }else if(type === 'colorPicker'){
      let scheduleAllowed =['link','text','call','whatsapp','location','sms','rsvp','timer'];
     return scheduleAllowed.includes(link?.type) ? true : false;
    }else if(type === 'analytics'){
      let scheduleAllowed =['link','call','whatsapp','sms'];
     return scheduleAllowed.includes(link?.type) ? true : false;
    }else if(type === 'social_tray'){
      let scheduleAllowed =['link'];
     return scheduleAllowed.includes(link?.type) ? true : false;
    }
    return false;
  }

  linkStatusChange(event:any, link:any){
    if(event.target.value == 1){
      link.status = 0;
    }else{
      link.status = 1;
    }
    this.emitService.next(link);
  }
  setReditectLink(event:any, link:any){
    link.redirect_status = true;
    // console.log(event.target.value)
    // if(event.target.value == 1){
    //   link.redirect_status = 0;
    // }else{
    //   link.redirect_status = 1;
    // }
    // console.log(link)
    // this.emitService.next(link);
  }
  addSocialTrayToLink(event:any, link:any){
    if(event.target.value == 1){
      link.social_tray = 0;
    }else{
      link.social_tray = 1;
    }
    // this.emitService.next(link);
  }

  sheduledDateTime(event:any,link: any, i:any){
    this.linkData[i].enable_time = moment(event.value).format("DD-MM-YYYY HH:mm:ss");
    console.log( moment(event.value).format("DD-MM-YYYY HH:mm:ss"))
  }
  contentColorChange(event:any, i:any){
    this.linkData[i].content_colour = event.target.value;
  }
  contentBgChange(event:any, i:any){
    this.linkData[i].bg_colour = event.target.value;
  }
  // youtube preview
  getPreview(url:any){
    return this.sanitizer.bypassSecurityTrustResourceUrl(`${url}`);
  }
  ngOnDestroy() {
    // destroy all the subscriptions at once
    this.subscription.unsubscribe();
  }
}
