import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { WeddingRoutingModule } from './wedding-routing.module';
import { AddWeddingComponent } from './components/add-wedding/add-wedding.component';


@NgModule({
  declarations: [
    AddWeddingComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    WeddingRoutingModule,
],
  providers: [],
  exports: []
})
export class WeddingModule { }