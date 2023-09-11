import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrControlService } from '../../shared/services/toastr.service';
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter
} from "rxjs/operators";
import { fromEvent } from 'rxjs';
import { ProfileService } from '../../profile/services/profile.service';

@Component({
  selector: 'app-search-profile',
  templateUrl: './search-profile.component.html',
  styleUrls: ['./search-profile.component.scss'],
})
export class SearchProfileComponent implements OnInit {
 @ViewChild('profileSearchInput', { static: true }) profileSearchInput: ElementRef;
 allProfiles:any;
 type: any =0;
 placeHolder:string ='Profile';
 profile_id:any;
  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    public toastr: ToastrControlService,
    public profileService: ProfileService
  ) {}

  ngOnInit(): void {
    if(this.router.url.split('/').includes('my-event')){
      this.type = 3;
      this.placeHolder = 'Event';
      this.profile_id = Number(this.router.url.split('/')[2]);
    }
    fromEvent(this.profileSearchInput.nativeElement, 'keyup').pipe(
        map((event: any) => {
          return event.target.value;
        }),filter(res => res.length > 2),
            debounceTime(1000), 
            distinctUntilChanged()
           ).subscribe((text: string) => {
            console.log('text',text)
            if(text.trim().length !=0){
                const formData = new FormData();
                formData.append(`type`, `${this.type}`);
                formData.append(`keyword`, `${text}`);
                this.profileService.searchProfile(formData).subscribe(res=>{
                    console.log('res',res)
                    this.allProfiles = res;
                })
            }
      });
    }

    goBack(){
      switch (this.type) {
        case 0:
          this.router.navigateByUrl(`/user/my-profile`);
          break;
        case 3:
          this.router.navigateByUrl(`/user/my-event/${this.profile_id}`);
          break;
        default:
      }
    }
    view(user:any){
      switch (this.type) {
        case 0:
          this.router.navigateByUrl(`/user/my-profile`);
          break;
        case 3:
          this.router.navigateByUrl(`/user/my-event/${user.profile_id}`);
          break;
        default:
      }
    }
    backToApplication(){
      switch (this.type) {
        case 0:
          this.router.navigateByUrl(`/user/profile`);
          break;
        case 3:
          this.router.navigateByUrl(`/user/event`);
          break;
        default:
      }
    }
   }
  
