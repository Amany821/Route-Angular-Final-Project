import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(localStorage.getItem('userToken')) {
    const headerRequest = request.clone({
      headers: request.headers.set('token', localStorage.getItem('userToken')!)
    });
    return next.handle(headerRequest);
    }else{
      return next.handle(request);
    }
    // const headerRequest = request.clone({
    //   headers: request.headers.set('token', localStorage.getItem('userToken')!)
    // });
  }
}