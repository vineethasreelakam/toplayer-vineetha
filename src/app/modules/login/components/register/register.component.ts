import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Subject} from 'rxjs';

import { AuthService } from '../../services/auth/auth.service';
import { ToastrControlService } from 'src/app/modules/shared/services/toastr.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  formRest: Subject<boolean> = new Subject();
  userLogicStats: boolean = true;
  label:string ='Enter your personal details to create account'
  gender = [
    { id: 1, name: 'Male' },
    { id: 2, name: 'Female' },
    { id: 3, name: 'Other' },
  ];
  countries: any = [];
  urlParams:any;
  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      if(params.hasOwnProperty('name') && params.hasOwnProperty('email')){
        this.urlParams = params;
      }
    }
  );
    this.getAllCountries();
  }

  getAllCountries() {
    this.authService.getAllCountries().subscribe((res) => {
      this.countries = res;
    });
  }

  checkBoxChange(event: any) {
    this.formRest.next(true);
    console.log('event', event.target.defaultValue);
    this.userLogicStats =
      event.target.defaultValue == 'individual' ? true : false;
      this.userLogicStats ? this.label ="Enter your personal details to create account" : this.label ="Enter your business and personal contact details to create account";
  }

  signIn() {
    this.router.navigateByUrl('/user/login');
  }
}
