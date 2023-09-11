import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ConnectRoutingModule } from './connect-routing.module';
import { MyFollowingComponent } from './components/my-following/my-following.component';
import { ConnectService } from './services/connect.service';


@NgModule({
  declarations: [
    MyFollowingComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ConnectRoutingModule,
],
  providers: [ConnectService],
  exports: []
})
export class ConnectModule { }