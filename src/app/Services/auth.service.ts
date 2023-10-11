import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { User } from '../Interfaces/user';
import { Router } from '@angular/router';
import { Environment } from '../environment';
import { ForgetPassword } from '../Interfaces/forgert-password';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private httpClient: HttpClient,
    private router: Router
    ) {}

  register(registerForm: User): Observable<any>{
    return this.httpClient.post(`${Environment.baseUrl}auth/signup`, registerForm)
  }

  login(loginForm: User): Observable<any>{
    return this.httpClient.post(`${Environment.baseUrl}auth/signin`, loginForm)
  }

  logOut(){
    localStorage.removeItem('userToken');
    localStorage.removeItem('userId');
    //localStorage.setItem('userToken', '');
    this.isUserLoggedIn.next(false);
    this.router.navigate(['login']);
  }

  forgetPassword(email: string): Observable<any> {
    return this.httpClient.post(`${Environment.baseUrl}auth/forgotPasswords`, {email});
  }

  verifyResetPassword(resetCode: string): Observable<any> {
    return this.httpClient.post(`${Environment.baseUrl}auth/verifyResetCode`, {resetCode});
  }

  resetPassword(newUserPassword: User): Observable<any> {
    return this.httpClient.put(`${Environment.baseUrl}auth/resetPassword`, newUserPassword);
  }
}