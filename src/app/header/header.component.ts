import { Component } from '@angular/core';
import {Router} from "@angular/router";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor (private router: Router) { }

//Methods to navigate to...
  navigateToTermsAndConditions() {
    this.router.navigate(['./terms-and-conditions']);
  }

  navigateToHomepage() {
    this.router.navigate(['./homepage']);
  }

  navigateToLogin() {
    this.router.navigate(['./login']);
  }
}


