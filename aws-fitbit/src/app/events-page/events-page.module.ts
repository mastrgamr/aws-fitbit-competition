import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsPageComponent } from './events-page.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', component: EventsPageComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    EventsPageComponent
  ]
})
export class EventsPageModule { }
