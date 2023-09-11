import { Component, Inject, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrControlService } from 'src/app/modules/shared/services/toastr.service';
import { AddEventComponent } from 'src/app/modules/events/components/add-event/add-event.component';
import { LayoutService } from 'src/app/modules/shared/services/layout/layout.service';

@Component({
  selector: 'app-add-wedding',
  templateUrl: './add-wedding.component.html',
  styleUrls: ['./add-wedding.component.scss'],
})
export class AddWeddingComponent implements OnInit {

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        public toastr: ToastrControlService,
        public modalService: NgbModal,
        public layout: LayoutService,
      ) {
        
      }
  ngOnInit(): void {
  }

  viewWeddingTemplate() {
    this.router.navigateByUrl(`/user/wedding-template`);
  }

  addEvent(){
    const modalRef = this.modalService.open(AddEventComponent, {
        size: `modal-dialog modal-md modal-dialog-centered  modal-main-box ${this.layout.config.settings.layout_version}`,
      });
      modalRef.componentInstance.eventType = 'Wedding';
      modalRef.componentInstance.emitService.subscribe((emmitedValue: any) => {
        console.log('emmitedValue',emmitedValue)
        // this.getEventList();
      });
      modalRef.result.then(
        (result: any) => {},
        (reason: any) => {}
      );
  }
}
