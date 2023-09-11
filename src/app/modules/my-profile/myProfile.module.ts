import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MyProfileRoutingModule } from './myProfile-routing.module';
import { MyProfilesComponent } from './my-profiles/my-profiles.component';
import { PublicProfileComponent } from './components/pubilc-profile/public-profile.component';

@NgModule({
  declarations: [
   MyProfilesComponent,
   PublicProfileComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MyProfileRoutingModule,
],
  providers: [],
  exports: []
})
export class MyProfileModule { }