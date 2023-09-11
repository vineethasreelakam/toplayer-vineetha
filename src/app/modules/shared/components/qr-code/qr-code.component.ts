import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrControlService } from '../../services/toastr.service';
import { baseURL } from '../../baseURL';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss'],
})
export class QrCodeComponent implements OnInit {
  @Output() emitService = new EventEmitter();
  @Input() qrEditStats: any;
  @Input() type: any;
  @Input() profileData: any;
  webUrl = baseURL.webUrl;
  constructor(
    private router: Router,
    public toastr: ToastrControlService,
    public activeModal: NgbActiveModal,
  ) {}

  ngOnInit(): void { }
  
  editQrCode(){
    this.activeModal.close();
    switch (this.type) {
      case 'profile':
        this.router.navigateByUrl(`/user/profile/edit-qr-code/${this.profileData.public_profile_id}`);
        break;
      case 'event':
        this.router.navigateByUrl(`/user/event/edit-qr-code/${this.profileData.public_profile_id}`);
        break;
      default:
    }
  }

  copyQrLink(val: string){
    console.log(this.profileData)
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = `${this.webUrl}/${val}`;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
