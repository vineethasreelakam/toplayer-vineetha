import { Component, OnInit, Output, EventEmitter, Input, Inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileService } from '../../services/profile.service';
@Component({
    selector: 'app-theme-list',
    templateUrl: './theme-list.component.html',
    styleUrls: ['./theme-list.component.scss'],
  })
  export class ThemeListComponent implements OnInit {
    @Input() linkData: any;
    @Input() profileData:any;
    @Output() emitService = new EventEmitter();
    @Input() allThemes:any;
    activeTheme:any;
    selectedThemeData:any;
    constructor(
        public profileService: ProfileService,
        public activeModal: NgbActiveModal,
    ) {}
    
      ngOnInit(): void {
        console.log('linkData',this.linkData)
      }
    
      selectedTheme(theme:any){
        this.activeTheme = theme.profile_theme_id;
        this.selectedThemeData = theme;
       
      }

      submit(){
        this.emitService.next(this.selectedThemeData);
        this.activeModal.close();
      }
    
  }