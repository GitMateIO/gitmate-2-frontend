import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { environment } from './../environments/environment';

@Injectable()
export class EnterpriseGuardService {

  constructor(
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if ('edition' in environment && environment['edition'] === 'enterprise') {
      return true;
    } else {
      this.router.navigate(['/community']);
      return false;
    }
  }

}
