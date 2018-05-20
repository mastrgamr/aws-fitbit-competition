import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'home',
    redirectTo: '',
    loadChildren: 'app/home-page/home-page.module#HomePageModule',
  },
  {
    path: 'events',
    loadChildren: 'app/events-page/events-page.module#EventsPageModule'
  },
  {
    path: 'event-detail',
    loadChildren: 'app/event-detail/event-detail.module#EventDetailModule'
  },
  {
    path: 'user-profile',
    loadChildren: 'app/events-page/events-page.module#EventsPageModule'
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }