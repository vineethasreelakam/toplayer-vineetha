import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastrControlService {
  constructor(private toastr: ToastrService) {}

  showSuccessToastr(message: string) {
    this.toastr.success(message, 'Success', {
      timeOut: 4000,
      progressBar: true,
      progressAnimation: 'decreasing',
    });
  }
  showInfoToastr(message: string) {
    this.toastr.info(message, 'Info', {
      timeOut: 4000,
      progressBar: true,
      // positionClass:'',
      progressAnimation: 'decreasing',
    });
  }
  showWarningToastr(message: string) {
    this.toastr.warning(message, 'Warning', {
      timeOut: 4000,
      progressBar: true,
      progressAnimation: 'decreasing',
    });
  }
  showErrorToastr(message: string) {
    this.toastr.error(message, 'Error', {
      timeOut: 4000,
      progressBar: true,
      progressAnimation: 'decreasing',
    });
  }
}

// all the methods like post, get are defined here
