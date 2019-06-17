import { Component, OnInit } from '@angular/core';
import { AuthService as SocialAuthService, FacebookLoginProvider } from 'angularx-social-login';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(
    private socialAuthService: SocialAuthService,
    private authenticationService: AuthenticationService,
    private userService: UserService,
  ) { }

  signInWithFB(): void {
    // const expired = this.authenticationService.isTokenExpired();

    // let's assume that the token is always expired for testing
    const expired = true;

    if (expired) {
      this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then((user) => {
        this.authenticationService.getJwtFromFacebookToken(user.authToken).subscribe((jwtData) => {
          // set the token in the authentication service
          this.authenticationService.setToken(jwtData.token);
          console.log(`token: ${jwtData.token}`);
          this.userService.getMe().subscribe(x => console.log(x));
        });
      });
    }
  }

  ngOnInit() {
  }

}
