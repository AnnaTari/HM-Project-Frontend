import {Injectable} from '@angular/core';

import {BehaviorSubject, of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //Boolean value if an admin is logged in
  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  // redirect after logging in
  redirectUrl: string = "admin-edit";

  login() {
    this.isLoggedIn.next(true);
    console.log("login: " + this.isLoggedIn);
  }

  getLoggedIn() {
    return this.isLoggedIn.asObservable();
  }

  logout(): void {
    this.isLoggedIn.next(false);
  }
}
