import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { useUserStore } from '../stores/user';
import { of, switchMap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const userStore = inject(useUserStore);
  const router = inject(Router);

  if (userStore.isAuthenticated()) {
    if (state.url !== '/login') return true;

    router.navigate(['']);
    return false;
  }

  return userStore.getLoginStatus().pipe(
    switchMap((isAuthenticated) => {
      if (isAuthenticated) {
        if (state.url !== '/login') return of(true);

        router.navigate(['']);
        return of(false);
      } else {
        if (state.url === '/login') return of(true);

        router.navigate(['login']);
        return of(false);
      }
    })
  );
};
