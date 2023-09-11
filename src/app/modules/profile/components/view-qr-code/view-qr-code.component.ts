import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrControlService } from '../../../shared/services/toastr.service';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-view-qr-code',
  templateUrl: './view-qr-code.component.html',
  styleUrls: ['./view-qr-code.component.scss'],
})
export class ViewQrCodeComponent implements OnInit {
  
  iFrameUrl:any;
  htmlSnippet:any;
  dangerousVideoUrl: any;
  type: string ='';
  public_profile_id: string ='';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public toastr: ToastrControlService,
    public sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void { 
    this.route.params.subscribe(
      (params: Params) => {
      console.log(params['id']);
      this.public_profile_id = params['id'];
      }
      );
    let currentUser = JSON.parse(`${sessionStorage.getItem('currentUser')}`);
    if(this.router.url.split('/').includes('event')){
      this.type = 'event';
    }else{
      this.type = 'profile';
    }
    this.dangerousVideoUrl = `https://signefic.com/qr/?currentUser=${currentUser.access_token}&type=${this.type}&public_id=${this.public_profile_id}`;
    this.iFrameUrl =
        this.sanitizer.bypassSecurityTrustResourceUrl(this.dangerousVideoUrl);
  }
  
  goBack(){
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
}
