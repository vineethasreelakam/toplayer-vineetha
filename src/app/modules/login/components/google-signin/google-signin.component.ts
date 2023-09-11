import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
    selector: 'app-google-signin',
    templateUrl: './google-signin.component.html',
    styleUrls: ['./google-signin.component.scss'],
  })
  export class GoogleSignInComponent implements OnInit {

    constructor(
      private router: Router,
      private authService: AuthService,
      private route: ActivatedRoute,
    ) {}
  
    ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        console.log('params',params)
        this.verifyLogin(params);
      }
    );
    }

    verifyLogin(params:any){
      let data = {
          code: params.code
        }
        this.authService.googleLoginVerify(data).subscribe((res) => {
            console.log('res', res);
            const user = res;
            if (user && user.access_token) {
            this.allowLogin(user);
            }else{
              this.router.navigateByUrl(`/user/register?name=${user?.fullname}&email=${user?.user_email}`);
            }
        
        });
    }

    allowLogin(user:any){
      this.authService.allowGoogleLogin(user).subscribe((res) => {
        if(res){
          this.router.navigateByUrl('/user/dashboard');
        }
      })
    }
  }