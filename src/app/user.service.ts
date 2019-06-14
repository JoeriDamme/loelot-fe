import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IUser } from './models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = `${environment.apiUrl}/api/v1/users`;

  constructor(private http: HttpClient) { }

  /**
   * Returning the user from the backend that is signed in.
   */
  getMe(token: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}/me`, {
      headers: {
        authorization: `Bearer ${token}`,
      }
    });
  }
}
