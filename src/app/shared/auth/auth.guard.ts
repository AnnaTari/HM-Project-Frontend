import {inject} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from './auth.service';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  let isLoggedIn: boolean = true;

  authService.getLoggedIn().subscribe((loggedIn) => {
    console.log(loggedIn);
    isLoggedIn = loggedIn;
  })

  if (isLoggedIn) {
    return true;
  }

  // Redirect to the login page
  return router.parseUrl('/login');
};
