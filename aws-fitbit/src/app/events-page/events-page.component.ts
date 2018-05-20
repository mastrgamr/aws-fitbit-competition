import { Component, OnInit } from '@angular/core';
import { SharedServices } from '../services/shared.services';

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.css']
})
export class EventsPageComponent implements OnInit {
  events: string[];
  sectionType = 'events';
  constructor(private sharedService: SharedServices) { }

  ngOnInit() {
    this.getEvents();
    console.log(this.events);
  }
  getEvents(): void{
    this.sharedService.getAssetJsonArray().subscribe(
      data => this.events = data[this.sectionType]
    );
  }

}
