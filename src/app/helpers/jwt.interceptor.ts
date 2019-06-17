import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // first we don't want to handle the access token check, because the bearer token will be set
    if (request.url === `${environment.apiUrl}/api/auth/facebook`) {
      return next.handle(request);
    }

    // get the token
    const token = this.authenticationService.getToken();

    if (!token) {
      // no token, so let's continue
      return next.handle(request);
    }

    // clone the request with bearer token
    const clonedRequestWithJwt = request.clone({
      setHeaders: {
        'content-type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    });

    return next.handle(clonedRequestWithJwt);
  }
}
