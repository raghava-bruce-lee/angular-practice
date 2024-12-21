import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { useSpinnerStore } from './spinner';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { catchError, finalize, map, of } from 'rxjs';

interface UserState {
  isAuthenticated: boolean;
  authenticationFailureMsg: string;
}

const initialState: UserState = {
  isAuthenticated: false,
  authenticationFailureMsg: ''
};

export const useUserStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => {
    const spinnerStore = inject(useSpinnerStore);
    const authService = inject(AuthService);
    const router = inject(Router);

    return {
      getLoginStatus() {
        spinnerStore.showLoading();
        return authService.fetchLoginStatusWithApi().pipe(
          map(() => {
            patchState(store, { isAuthenticated: true });
            return true;
          }),
          catchError((errorObj) => {
            console.error(errorObj);
            patchState(store, { isAuthenticated: false });
            return of(false);
          }),
          finalize(spinnerStore.hideLoading)
        );
      },
      login(email: string, password: string) {
        spinnerStore.showLoading();
        authService
          .loginWithApi(email, password)
          .pipe(
            catchError((errorObj) => {
              console.error(errorObj);
              patchState(store, {
                isAuthenticated: false,
                authenticationFailureMsg: errorObj.error.message
              });
              return of();
            }),
            finalize(spinnerStore.hideLoading)
          )
          .subscribe(() => {
            patchState(store, { isAuthenticated: true, authenticationFailureMsg: '' });
            router.navigate(['']);
          });
      }
    };
  })
);
