import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { EventsPageComponent } from './events-page/events-page.component';
import { HomePageModule } from './home-page/home-page.module';
import { EventsPageModule } from './events-page/events-page.module';
import { AppRoutingModule } from './app-routing.module';
<<<<<<< HEAD
import { HttpClientModule } from '@angular/common/http';
import { SharedService } from './shared.service';
=======
import { SharedServices } from './services/shared.services';
>>>>>>> origin/develop


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HomePageModule,
    EventsPageModule,
<<<<<<< HEAD
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [ SharedService],
=======
    AppRoutingModule,  
  ],
  providers: [
    SharedServices
  ],
>>>>>>> origin/develop
  bootstrap: [AppComponent]
})
export class AppModule { }
