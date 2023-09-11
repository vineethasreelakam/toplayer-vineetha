import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrControlService } from 'src/app/modules/shared/services/toastr.service';
import { ConnectService } from '../../services/connect.service';


@Component({
  selector: 'app-my-following',
  templateUrl: './my-following.component.html',
  styleUrls: ['./my-following.component.scss'],
})
export class MyFollowingComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  isFormSubmitted = false;
  allProfiles: any;
  myFollowing:any;
  subHead: string='All Profile';
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrControlService,
    public connectService: ConnectService,
  ) {}

  ngOnInit(): void {
    this.getAllFollowing();
  }

  tabChange(type:string){
   if(type === 'all'){
    this.subHead = 'All Profiles';
    this.getAllFollowing();
   }else{
    this.getMyFollowing();
    this.subHead = 'My Following';
   }
  }

  getAllFollowing(){
    this.connectService.getAllFollowing().subscribe((res) => {
        console.log(res);
        this.allProfiles = res;
      });
  }

  getMyFollowing(){
    this.connectService.getMyFollowing().subscribe((res) => {
        console.log(res);
        this.myFollowing = res;
        
      });
  }

  followProfile(user:any){
    this.connectService.followProfile({profile_id: user?.profile_id}).subscribe((res) => {
      console.log(res);
      if(this.subHead === 'All Profiles'){
        this.getAllFollowing();
      }else{
        this.getMyFollowing();
      }
      
    });
  }

  view(user:any){
    console.log(user)
    this.router.navigateByUrl(`/${user?.public_profile_id}`);
  }
  
}
