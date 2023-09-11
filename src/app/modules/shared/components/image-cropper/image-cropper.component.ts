import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { DataService } from '../../services/data.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-image-cropper',
    templateUrl: './image-cropper.component.html',
    styleUrls: ['./image-cropper.component.scss'],
  })
  export class ImageCropperComponent implements OnInit {
    @Output() emitService = new EventEmitter();
    @Input() profileData: any;
    @Input() imageChangedEvent: any;
    // imageChangedEvent: any = '';
    croppedImage: any = '';
    canvasRotation = 0;
    rotation = 0;
    scale = 1;
    showCropper = false;
    containWithinAspectRatio = false;
    cropppedImage:any;
    // transform: ImageTransform = {};
    constructor(
        public activeModal: NgbActiveModal,
        public dataService: DataService,
        private sanitizer: DomSanitizer
      ) {}
    
      ngOnInit(): void {
      }

      imageCropped(event: ImageCroppedEvent) {
        console.log('event',event)
        this.cropppedImage = event.blob
        // this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl);
        // event.blob can be used to upload the cropped image
      }
      imageLoaded(image: LoadedImage) {
          // show cropper
      }
      cropperReady(event:any) {
          // cropper ready
      }
      loadImageFailed() {
          // show message
      }

      saveImage(){
        this.emitService.next(this.cropppedImage);
        this.activeModal.close();
      }


  }