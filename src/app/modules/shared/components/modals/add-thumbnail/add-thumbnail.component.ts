import { Component, Inject, OnInit, Output, EventEmitter, Input  } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { allIcon } from '../../../icons/thimify';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageCropperComponent } from '../../image-cropper/image-cropper.component';
import { LayoutService } from '../../../services/layout/layout.service';
@Component({
    selector: 'app-add-thumbnail',
    templateUrl: './add-thumbnail.component.html',
    styleUrls: ['./add-thumbnail.component.scss'],
  })
  export class AddThumbnailComponent implements OnInit {
    @Output() emitService = new EventEmitter();
    @Input() index: any;
    public allIconData = allIcon.themify;
    allIcons:any=[];
    selectedUI:any ='0';

    constructor(
      public activeModal: NgbActiveModal,
      public modalService: NgbModal,
      public layout: LayoutService,
    ){}

    ngOnInit(): void {
      console.log('allIconData',this.allIconData)
      let arrays: any[] = [];
      this.allIconData.forEach(data =>{
        return arrays.push(data.icons);
      })
      let newArray = [].concat(...arrays);
      this.allIcons = newArray;
    }

    selectIcon(icon:any, type: string){
      let data ={
        index: this.index,
        icon: icon,
        type: type,
      };
      this.emitService.next(data);
      this.activeModal.close();
    }

    closeModal(message: string) {
      this.activeModal.close();
    }

    // image upload
    selectFile(event:any){
      const file = event.target.files;
      if (file[0]) { 
          const modalRef = this.modalService.open(ImageCropperComponent, {
            size: `modal-dialog modal-md modal-dialog-centered modal-main-box ${this.layout.config.settings.layout_version}`,
          });
          modalRef.componentInstance.imageChangedEvent = event;
          modalRef.componentInstance.emitService.subscribe((image: any) => {
            console.log('image',image)
            if(image){
              let data ={
                index: this.index,
                icon: image,
                type: 'image',
                file: file,
              };
              this.emitService.next(data);
              this.activeModal.close();
            }
          });
          modalRef.result.then(
            (result: any) => {},
            (reason: any) => {}
          );
        }
    }
  

    // backToPage(){
    //   this.selectedUI = (this.selectedUI === '1' ||
    // }
  }