import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { SharedService } from 'src/app/modules/shared/services/shared.service';

@Component({
  selector: 'app-login-layout',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.scss'],
})
export class PublicProfileLayoutComponent implements OnInit {
  profileData: any;
  constructor(
    private route: ActivatedRoute,
    public sharedService: SharedService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
        (params: Params) => {
        console.log(params['id']);
        const formData = new FormData();
        formData.append(`public_profile_id`, `${params['id']}`);
        this.sharedService.getPublicIdData(formData).subscribe((res) => {
          console.log(res)
          if(res.status === 200){
            this.profileData = res.data;
            // this.toastr.showSuccessToastr(res.message);
            // this.getProfileLink();
          }
        })
        }
        );
  }
 

}