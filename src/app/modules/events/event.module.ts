import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { EventRoutingModule } from './event-routing.module';
import { AddEventComponent } from './components/add-event/add-event.component';
import { EditEventComponent } from './components/edit-event/edit-event.component';
import { EventAppearanceComponent } from './components/event-appearance/event-appearance.component';


@NgModule({
  declarations: [
    AddEventComponent,
    EditEventComponent,
    EventAppearanceComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    EventRoutingModule,
],
  providers: [],
  exports: []
})
export class EventModule { }