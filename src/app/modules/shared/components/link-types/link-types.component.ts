import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { DataService } from '../../services/data.service';

@Component({
    selector: 'app-link-types',
    templateUrl: './link-types.component.html',
    styleUrls: ['./link-types.component.scss'],
  })
  export class LinkTypesComponent implements OnInit {
    @Output() emitService = new EventEmitter();
    @Input() inputData: any;
    @Input() linkTypes: any;
    constructor(
        public activeModal: NgbActiveModal,
        public dataService: DataService,
      ) {}
    
      ngOnInit(): void {
      }

      selectLinkType(link:any){
        this.emitService.next(link);
        this.activeModal.close();
      }
  }