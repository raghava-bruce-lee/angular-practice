/* eslint-disable @typescript-eslint/no-unused-vars */
import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  return true;
};
