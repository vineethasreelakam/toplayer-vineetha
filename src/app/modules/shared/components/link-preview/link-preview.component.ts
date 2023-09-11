import { Component, OnInit, Output, EventEmitter, Input, Inject} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DomSanitizer} from '@angular/platform-browser';
import { ProfileService } from 'src/app/modules/profile/services/profile.service';
@Component({
    selector: 'app-link-preview',
    templateUrl: './link-preview.component.html',
    styleUrls: ['./link-preview.component.scss'],
  })
  export class LinkPreviewComponent implements OnInit {
    @Input() linkData: any =[];
    @Input() profileData:any;
    @Input() selectedTheme:any;
    profileName: string ='John Doe';
    constructor(
      @Inject(DOCUMENT) private document: Document,
      public sanitizer: DomSanitizer,
      public profileService: ProfileService,
    ) {}
    
      ngOnInit(): void {  
        // this.getSocialTray()
      }

      getLinkData(){
        // console.log('linkData',this.linkData)
      }

      openLink(link_:any){
        let valid = this.isValidUrl(link_?.input_value_2);
        if(valid){
          window.open(link_?.input_value_2, "_blank");
          const formData = new FormData();
          formData.append(`link_id`, `${link_.profile_link_id}`);
          this.profileService.updateLinkClickCount(formData).subscribe((res) => {});
        }
        
      }

      isValidUrl(urlString: string) {
        var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
        '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
       return !!urlPattern.test(urlString);
    }

    // youtube preview
    getPreview(url:any){
      return this.sanitizer.bypassSecurityTrustResourceUrl(`${url}`);
    }

    // get social tray data
    getSocialTray(){
      let socialTray = this.linkData.filter((link:any) => link?.social_tray);
      return socialTray || [];
    }
  }