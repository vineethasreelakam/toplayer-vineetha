import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrControlService } from 'src/app/modules/shared/services/toastr.service';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  isFormSubmitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private toastr: ToastrControlService
  ) {}

  ngOnInit(): void {
    this.resetPasswordForm = this.formBuilder.group({
      old_password: ['', [Validators.required]],
      new_password: ['', [Validators.required]],
    });
  }

  sumbitHandler() {
    this.isFormSubmitted = true;
    if (this.resetPasswordForm.invalid) {
      return;
    }
    this.accountService
      .changePassword(this.resetPasswordForm.value)
      .subscribe((res) => {
        if (res.status === 200) {
          this.toastr.showSuccessToastr(res.message);
        }
      });
  }
}
