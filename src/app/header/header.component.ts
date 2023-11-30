import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {CurrentStateService} from "../shared/services/current-state.service";
import {AuthService} from "../shared/auth/auth.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {


  //constructor injects Router and AuthService dependencies
  constructor(private router: Router, public authService: AuthService) {
  }

//methods to navigate to...
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

  logout() {
    this.router.navigate([""]);
    this.authService.logout();
  }

}


