import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  apiUrl = `${environment.apiUrl}/api/v1/users`;

  constructor(private http: HttpClient) { }

  /**
   * Returning the user from the backend that is signed in.
   */
  getMe(): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}/me`);
  }
}
