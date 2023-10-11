import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { AuthService } from '../Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
  
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(localStorage.getItem('userToken') && localStorage.getItem('userToken') != null) {
      try{
        return true;
      }catch (error){
        localStorage.removeItem('userToken');
        this.authService.isUserLoggedIn.next(false);
        //localStorage.setItem('userToken', '');
        this.router.navigate(['/login']);
        return false;
      }
    }else{
      this.router.navigate(['/login']);
      return false;
    }
  }
}