import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EventDetailComponent } from './event-detail.component';

const routes: Routes = [
  {path: '', component: EventDetailComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    EventDetailComponent
  ]
})
export class EventDetailModule { }
