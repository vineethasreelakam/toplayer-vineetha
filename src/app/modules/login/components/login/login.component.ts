import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth/auth.service';
import { validationPatterns } from 'src/app/modules/shared/validationPatterns';
import { ToastrControlService } from 'src/app/modules/shared/services/toastr.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public show: boolean = false;
  loginForm!: FormGroup;
  isFormSubmitted = false;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrControl: ToastrControlService,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(validationPatterns.pat_email)]],
      password: ['', [Validators.required]],
    });
  }
  showPassword() {
    this.show = !this.show;
  }

  signInSumbit() {
    this.isFormSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.loginForm.value).subscribe((res) => {
      // console.log('res', res);
      // this.router.navigateByUrl('/dashboard');
      this.getUserDetails();
    });
    console.log('Submit', this.loginForm.value);
    
  }

  getUserDetails(){
    this.authService.getUserDetails().subscribe((res) => {
      sessionStorage.setItem('userDetails', JSON.stringify(res));
      let userDetails = JSON.parse(`${sessionStorage.getItem('userDetails')}`);
      if(userDetails){
        this.router.navigateByUrl('/user/dashboard');
      }
      
      // console.log('getUserDetails',res)
    })
  }

  // signInSumbit(){
  //     this.router.navigateByUrl('/register');
  // }

  createAccount() {
    this.router.navigateByUrl('/user/register');
  }

  forGotPassword() {
    this.router.navigateByUrl('/user/forgot-password');
  }

  googleLogin(){
    this.authService.googleLogin().subscribe((res) => {
      console.log('res', res);
      if(res.status === 200){
        this.document.location.href = res?.login_url;
      }
    });
  }
}
