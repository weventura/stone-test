import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';

import { catchError, finalize, Observable, throwError } from 'rxjs';

import { TOKEN_AUTH } from '../configuration/constants';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const jwt = TOKEN_AUTH;

    let newRequest = request.clone({
      setHeaders: {
        authorization: `Bearer ${jwt}`
      }
    })

    return next.handle(newRequest).pipe(
      finalize(() => true),
      catchError((err: HttpErrorResponse) => {
        return throwError(() => err);
      }),
    );
  }
}
