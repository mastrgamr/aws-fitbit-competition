import { Component, OnInit } from '@angular/core';
import { SharedServices } from '../services/shared.services';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.less']
})
export class EventDetailComponent implements OnInit {
  finishedEvent = false;
  events: string[];
  sectionType = 'events';
  constructor(private sharedService: SharedServices) { }

  ngOnInit() {
    this.getEvents();
    console.log(this.events);
    this.finishedEvent = this.sharedService.getFinishedEvent();
  }
  getEvents(): void{
    this.sharedService.getAssetJsonArray().subscribe(
      (data) => {
        this.events = data[this.sectionType];
        console.log(this.events[0]);
      }
    );
  }

}
