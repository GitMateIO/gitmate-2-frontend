import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { environment } from './../environments/environment';

@Injectable()
export class CommunityGuardService {

  constructor(
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if ('edition' in environment && environment['edition'] === 'enterprise') {
      this.router.navigate(['/home']);
      return false;
    } else {
      return true;
    }
  }

}
