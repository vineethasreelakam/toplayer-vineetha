import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { WeddingTemplateRoutingModule } from './wedding-template-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    WeddingTemplateRoutingModule,
],
  providers: [],
  exports: []
})
export class WeddingTemplateModule { }