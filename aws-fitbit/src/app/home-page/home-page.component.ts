import { Component, OnInit } from '@angular/core';
import { SharedServices } from '../services/shared.services';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  sidenavOpen = false;
  
  constructor(private sharedServices: SharedServices) { 
    this.sharedServices.getUserBalance().then(balance => console.log(balance));
  }

  ngOnInit() {
  }

  toggleSidenavOpen(){
    this.sidenavOpen = !this.sidenavOpen;
  }

}
