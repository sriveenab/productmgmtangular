import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  constructor(private router: Router, private  _localStorage: LocalStorageService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log(next, state);
    var userDetails = this._localStorage.get("userDetails");
    if( userDetails && next.routeConfig.path !== 'login'){
      //window.location.href = 'http:' + window.location.href.substring(window.location.protocol.length);
      return true;
    }  else if ((userDetails == undefined || userDetails ==null) && next.routeConfig.path !== 'login') {
      this.router.navigateByUrl('/login');
      return true;
    } 
    return true;
  }
}
