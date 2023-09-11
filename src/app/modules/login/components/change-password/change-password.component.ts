import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth/auth.service';
import { validationPatterns } from 'src/app/modules/shared/validationPatterns';
import { ToastrControlService } from 'src/app/modules/shared/services/toastr.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
//   styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePassForm!: FormGroup;
  isFormSubmitted = false;

  constructor(
     private formBuilder: FormBuilder,
     private authService: AuthService,
     private toastr: ToastrControlService
  ) { 
    this.changePassForm = this.formBuilder.group({
      email_id: ['', [Validators.required, Validators.pattern(validationPatterns.pat_email)]],
      type:[1]
    });
  }

  ngOnInit(): void {
  }

  sumbitHandler(){
    this.isFormSubmitted = true;
    if (this.changePassForm.invalid) {
      return;
    }
    this.authService.changePassword(this.changePassForm.value).subscribe((res) => {
      console.log('res', res);
      if(res.status === 200){
        this.toastr.showSuccessToastr(res.message);
      }
    });
    console.log('Submit', this.changePassForm.value);
  }

}