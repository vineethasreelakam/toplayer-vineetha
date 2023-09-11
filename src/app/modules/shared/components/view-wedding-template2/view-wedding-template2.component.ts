import { Component, Inject, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrControlService } from 'src/app/modules/shared/services/toastr.service';

@Component({
  selector: 'app-view-wedding-template-2',
  templateUrl: './view-wedding-template2.component.html',
  styleUrls: ['./view-wedding-template2.component.scss'],
})
export class ViewWeddingTemplateComponent2 implements OnInit {

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        public toastr: ToastrControlService,
      ) {
        
      }
  ngOnInit(): void {
    
  }

}
