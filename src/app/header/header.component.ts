import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {CurrentStateService} from "../shared/services/current-state.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private router: Router, public currentStateService: CurrentStateService) {
  }

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

  navigateToRafflePage() {
    this.router.navigate(['./raffle-page']);
  }

  navigateToAdminEdit() {
  this.router.navigate(['./admin-edit']);
   }

}


