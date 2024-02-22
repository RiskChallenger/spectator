import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';

export const functionalGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);

  console.log(route.params);

  if ('redirect' in route.params) {
    return router.parseUrl(route.params['redirect']);
  }

  return true;
};
