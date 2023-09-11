import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../services/dashboard.service';
import { ProfileService } from '../../profile/services/profile.service';
import { ToastrControlService } from '../../shared/services/toastr.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  individualProfile: any;
  constructor(
    private router: Router,
    private dashboardService: DashboardService,
    public profileService: ProfileService,
    public toastr: ToastrControlService
  ) {}

  ngOnInit(): void {
    this.getUserPlans();
    this.getProfileList();
  }
 
  getUserPlans(){
    this.dashboardService.getUserPlans().subscribe((userPlans) => {
      if(userPlans.length === 0){
        // this.router.navigateByUrl('/plan');
      }
      console.log('userPlans', userPlans);

    });
  }

    // get profile list
    getProfileList(){
      const formData = new FormData();
      formData.append(`type`, `${1}`);
      this.profileService.getProfileList(formData).subscribe((res) => {
        console.log('getProfileList',res)
        this.individualProfile = res;
        // this.profileData = res[0] || null;
        // this.btnIsDisabled = this.profileData ? false : true;
        // this.profileID = this.profileData?.public_profile_id || '';
        // sessionStorage.setItem('profileInfo', JSON.stringify(this.profileData));
        // if(this.profileData){
        //   this.getProfileLink();
        //   this.getProfileBio();
        // }
        
      })
    }

    // add profile ID
    addProfileId() {
      let profileID = (Math.random() + 1).toString(36).substring(2);
        const formData = new FormData();
        formData.append(`public_profile_id`, `${profileID}`);
        formData.append(`type`, `1`);
        this.profileService.addProfileId(formData).subscribe((res) => {
          if(res.status === 200){
            // this.getProfileList();
            this.toastr.showSuccessToastr(res.message);
            this.router.navigateByUrl('/user/profile');
          }
        });
      
    }
}
