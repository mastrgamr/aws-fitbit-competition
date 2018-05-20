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
    // this.sharedServices.getUserBalance().then(balance => console.log(balance));
    // this.sharedServices.send("1");  
    // setTimeout( () => { /*Your Code*/ }, 5000 );
    // // this.sharedServices.receive();
    // this.sharedServices.claim("10");
  }

  ngOnInit() {
    console.log("IN HOME PAGE");
    // this.extractToken(window.href.url);
  }

  toggleSidenavOpen(){
    this.sidenavOpen = !this.sidenavOpen;
  }

  extractToken(url: String) {

  }

}
