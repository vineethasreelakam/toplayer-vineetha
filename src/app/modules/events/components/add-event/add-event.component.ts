import { Component, Inject, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileService } from 'src/app/modules/profile/services/profile.service';
import { ToastrControlService } from 'src/app/modules/shared/services/toastr.service';

@Component({
  selector: 'app-add-event-profile',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
})
export class AddEventComponent implements OnInit, OnDestroy {
    @Output() emitService = new EventEmitter();
    @Input() inputData: any;
    @Input() eventType: any;
    addEventForm!: FormGroup;
    isFormSubmitted = false;
    event_id:any;
    eventModalTitle: string = 'Add Event';
    disableBtn: boolean = false;
    constructor(
        private router: Router,
        public activeModal: NgbActiveModal,
        private formBuilder: FormBuilder,
        public profileService: ProfileService,
        public toastr: ToastrControlService,
      ) {
        
      }
  ngOnInit(): void {
    this.initForm();
    if(this.eventType === 'Wedding'){
      this.eventModalTitle = 'Add Wedding Event';
    }else{
      this.eventModalTitle = 'Add Event';
    }
  }

  initForm(){
    this.addEventForm = this.formBuilder.group({
      name: [ '', [Validators.required]],
    });
  }

  selectLinkType(link:any){
    this.emitService.next(link);
    this.activeModal.close();
  }

  sumbitHandler(){
    this.isFormSubmitted = true;
    if (this.addEventForm.invalid) {
      return;
    }
    if(this.eventType === 'Wedding'){
    }else{
      let profileID = (Math.random() + 1).toString(36).substring(2);
      const formData = new FormData();
      formData.append(`public_profile_id`, `${profileID}`);
      formData.append(`type`, `3`);
      this.profileService.addProfileId(formData).subscribe((res) => {
          console.log('res',res.profile_id)
        if(res.status === 200){
          this.createEvent(res.profile_id, profileID);
        }
      });
    }
    console.log(this.addEventForm.value)
  }

  createEvent(profile_id:any, profileID:any){
    const formData = new FormData();
    formData.append(`public_profile_id`, `${profileID}`);
    formData.append(`profile_id`, `${profile_id}`);
    formData.append(`name`, `${this.addEventForm.value['name']}`);
    this.profileService.profileEdit(formData).subscribe((res) => {
        if(res.status === 200){
          this.toastr.showSuccessToastr(res.message);
          this.activeModal.close('dismiss');
          this.emitService.next(res);
        }
      })
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
