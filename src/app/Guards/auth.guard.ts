import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
  
  constructor(
    private router: Router
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(localStorage.getItem('userToken') != null) {
      try{
        const decoded = jwt_decode(localStorage.getItem('userToken')|| '');
        return true;
      }catch (error){
        // localStorage.removeItem('userToken');
        localStorage.setItem('userToken', '');
        this.router.navigate(['/login']);
        return false;
      }
    }else{
      return false;
    }
  }
}
 