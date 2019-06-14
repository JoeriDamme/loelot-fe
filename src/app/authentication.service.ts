import { Injectable } from '@angular/core';
import { AuthServiceConfig, FacebookLoginProvider } from 'angularx-social-login';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';

interface JWTToken {
  token: string;
  user: {
    createdAt: string;
    displayName: string;
    email: string;
    firstName: string;
    lastName: string;
    roleUuid: string;
    updatedAt: string;
    uuid: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  apiPath = `${environment.apiUrl}/api/auth`;

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
  public getJwtFromFacebookToken(authToken: string): Observable<JWTToken> {
    return this.http.get<JWTToken>(`${this.apiPath}/facebook`, {
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
      return new Date(0);
    }

    const decoded = jwt_decode(token);

    if (!decoded.exp) {
      return new Date(0);
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
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

    return !(date.valueOf() > new Date().valueOf());
  }
}
