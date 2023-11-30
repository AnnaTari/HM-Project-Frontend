import {Injectable} from '@angular/core';

import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // redirect after logging in
  redirectUrl: string = "admin-edit";

  //Boolean value if an admin is logged in
  private isLoggedIn: BehaviorSubject<boolean>;

  constructor() {
    const storedLoggedInState = localStorage.getItem('isLoggedIn');
    this.isLoggedIn = new BehaviorSubject<boolean>(storedLoggedInState === 'true');
  }

  login() {
    this.isLoggedIn.next(true);
    localStorage.setItem('isLoggedIn', 'true');
  }

  getLoggedIn() {
    return this.isLoggedIn.asObservable();
  }

  logout(): void {
    this.isLoggedIn.next(false);
    localStorage.setItem('isLoggedIn', 'false');
  }
}
