import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {

  constructor(private notificationService: NotificationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {

        if (error.status === 400) {
          this.notificationService.showError(error.error.message, error.error.errors[0].message);
        } else if (error.status === 401) {
          // refresh token
        }

        return throwError(error);
      }),
    );
  }
}
