import {Injectable} from '@angular/core';

import {Observable, of} from 'rxjs';
import {tap, delay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //Boolean value if an admin is logged in
  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string = "/admin-edit";

  login(): Observable<boolean> {
    return of(true).pipe(
      delay(1000),
      tap(() => this.isLoggedIn = true)
    );
  }


  logout(): void {
    this.isLoggedIn = false;
  }
}
