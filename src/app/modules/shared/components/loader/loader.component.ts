import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from 'src/app/modules/core/services/loader.service';
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
 public show: boolean = true;
 loading: boolean = true;
 requestStarted: boolean = false;
  constructor(
    public loaderService: LoaderService,
    public activatedRoute: ActivatedRoute
  ) {
    this.loaderService.isLoading.subscribe((v) => {
      if (v) {
        this.requestStarted = true;
      }
      if (this.requestStarted) {
        this.loading = v;
      } else{
        this.loading = v;
      }
    });
    // setTimeout(() => {
    //   this.show = false;
    // }, 3000);
  }

  ngOnInit() { }

  ngOnDestroy() { }

}
