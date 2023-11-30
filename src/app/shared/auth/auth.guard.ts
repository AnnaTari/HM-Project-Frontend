import {inject} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from './auth.service';

export const authLoginGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  let isLoggedIn: boolean = true;

  authService.getLoggedIn().subscribe((loggedIn) => {
    console.log(loggedIn);
    isLoggedIn = loggedIn;
  })

  if (isLoggedIn) {
    // Redirect authenticated users away from the login page
    return router.navigate(['/admin-edit']);
  }

  // Allow access to the login page for non-authenticated users
  return true;
};


export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  let isLoggedIn: boolean = true;

  authService.getLoggedIn().subscribe((loggedIn) => {
    console.log(loggedIn);
    isLoggedIn = loggedIn;
  })

  if (isLoggedIn) {
    // Allow access for authenticated users
    return true;
  }

  // Redirect non-authenticated users to the login page
  return router.parseUrl('/login');
};
