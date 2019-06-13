import { Injectable } from '@angular/core';
import { AuthServiceConfig, FacebookLoginProvider } from 'angularx-social-login';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  public static getAuthServiceConfig(): () => AuthServiceConfig {
    return () => new AuthServiceConfig([{
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider(environment.facebookAppId, {
        scope: 'email',
      })
    }]);
  }
}
