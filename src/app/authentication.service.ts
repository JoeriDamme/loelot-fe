import { Injectable } from '@angular/core';
import { AuthServiceConfig, FacebookLoginProvider } from 'angularx-social-login';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import * as moment from 'moment';
import { IUser } from './models/user';

interface IJWTToken {
  token: string;
  user: IUser;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  private apiPath = `${environment.apiUrl}/api/auth`;

  public static getAuthServiceConfig(): () => AuthServiceConfig {
    return () => new AuthServiceConfig([{
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider(environment.facebookAppId, {
        scope: 'email',
      })
    }]);
  }

  /**
   * Authenticate on the backend with the facebook Auth token.
   * @param authToken Authentication code received from the facebook front-end login.
   */
  public getJwtFromFacebookToken(authToken: string): Observable<IJWTToken> {
    return this.http.get<IJWTToken>(`${this.apiPath}/facebook`, {
      headers: {
        authorization: `Bearer ${authToken}`
      }
    });
  }

  /**
   * Get the JWT token.
   */
  getToken(): string {
    return localStorage.getItem(environment.tokenName);
  }

  /**
   * Set the JWT token.
   * @param token JWT token received from backend.
   */
  setToken(token: string): void {
    localStorage.setItem(environment.tokenName, token);
  }

  /**
   * Get the expiration date of the token.
   */
  getTokenExpirationDate(): Date {
    const token = this.getToken();

    if (!token) {
      return moment(0).toDate();
    }

    const decoded = jwt_decode(token);

    if (!decoded.exp) {
      return moment(0).toDate();
    }

    return moment.unix(decoded.exp).toDate();
  }

  /**
   * Check if token is expired.
   */
  isTokenExpired(): boolean {
    const token = this.getToken();

    if (!token) {
      return true;
    }

    const date = this.getTokenExpirationDate();

    // convert to unix timestamp and check
    return moment(date).valueOf() < moment().valueOf();
  }

  logout(): void {
    return localStorage.removeItem(environment.tokenName);
  }
}
