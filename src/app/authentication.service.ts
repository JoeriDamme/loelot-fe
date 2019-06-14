import { Injectable } from '@angular/core';
import { AuthServiceConfig, FacebookLoginProvider } from 'angularx-social-login';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
}
