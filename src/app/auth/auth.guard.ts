import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfigService } from '../services/config.service';
import * as CryptoJs from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router, private config: ConfigService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('logged')) {
      if (CryptoJs.AES.decrypt(localStorage.getItem('logged'), this.config.key).toString(CryptoJs.enc.Utf8)) {
        return true;
      } else {
        localStorage.removeItem('logged');
        this.router.navigate(['login']);
        return false;
      }
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('logged')) {
      if (CryptoJs.AES.decrypt(localStorage.getItem('logged'), this.config.key).toString(CryptoJs.enc.Utf8)) {
        return true;
      } else {
        localStorage.removeItem('logged');
        this.router.navigate(['login']);
        return false;
      }
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }

}
