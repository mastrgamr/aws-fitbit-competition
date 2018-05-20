import { Component, OnInit } from '@angular/core';
import { SharedServices } from '../services/shared.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.css']
})
export class EventsPageComponent implements OnInit {
  events: string[];
  sectionType = 'events';
  constructor(private sharedService: SharedServices, private router: Router) { }

  ngOnInit() {
    this.getEvents();
    console.log(this.events);
  }
  getEvents(): void {
    this.sharedService.getAssetJsonArray().subscribe(
      (data) => {
        this.events = data[this.sectionType];
        console.log(this.events[0]);
      }
    );
  }

  goToNotFinished(){
    this.sharedService.setFinishedEvent(false);
    this.router.navigate(['/event-detail']);
  }
  goToFinished(){
    this.sharedService.setFinishedEvent(false);
    this.router.navigate(['/event-detail']);
  }

}
