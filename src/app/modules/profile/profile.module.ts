import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { CreateProfileComponent } from './components/create-profile/create-profile.component';
import { AppearanceComponent } from './components/appearance/appearance.component';
import { MyProfilesComponent } from './components/my-profiles/my-profiles.component';
import { ThemeListComponent } from './components/theme-list/theme-list.component';
import { ViewQrCodeComponent } from './components/view-qr-code/view-qr-code.component';
import { SearchProfileComponent } from '../my-profile/search-profile/search-profile.component';

@NgModule({
  declarations: [
    CreateProfileComponent,
    AppearanceComponent,
    MyProfilesComponent,
    ThemeListComponent,
    ViewQrCodeComponent,
    SearchProfileComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ProfileRoutingModule,
],
  providers: [],
  exports: []
})
export class ProfileModule { }