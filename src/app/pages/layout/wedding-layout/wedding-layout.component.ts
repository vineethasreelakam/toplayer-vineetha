import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-wedding-layout',
  templateUrl: './wedding-layout.component.html',
  styleUrls: ['./wedding-layout.component.scss'],
})
export class WeddingLayoutComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
   
  }
 

}