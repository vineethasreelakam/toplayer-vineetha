import { Component, OnInit, Output, EventEmitter, Input, Inject} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DomSanitizer} from '@angular/platform-browser';
import { ProfileService } from 'src/app/modules/profile/services/profile.service';
@Component({
    selector: 'app-public-profile',
    templateUrl: './public-profile.component.html',
    styleUrls: ['./public-profile.component.scss'],
  })
  export class PublicProfileComponent implements OnInit {
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
        // if(this.linkData?.length !=0){
        //   this.linkData.map((link: any) =>{
        //     if(link.type === 'link'){
        //       link.thumbnailIcon = 'icon-link';
        //     }else if(link.type === 'text'){
        //       link.thumbnailIcon = 'icon-text';
        //     }else if(link.type === 'call'){
        //       link.thumbnailIcon = 'icon-mobile';
        //     }else if(link.type === 'whatsapp'){
        //       link.thumbnailIcon = 'icofont icofont-brand-whatsapp';
        //     }else if(link.type === 'sms'){
        //       link.thumbnailIcon = 'icon-comment-alt';
        //     }else if(link.type === 'location'){
        //       link.thumbnailIcon = 'icon-location-pin';
        //     }else if(link.type === 'youtube'){
        //       link.thumbnailIcon = 'icon-youtube';
        //     }
        //   });
        // }
       
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
  }