import { Component, OnInit } from '@angular/core';
import { AuthService as SocialAuthService, FacebookLoginProvider } from 'angularx-social-login';
import { AuthenticationService } from '../authentication.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private socialAuthService: SocialAuthService,
    private authenticationService: AuthenticationService,
    private userService: UserService,
  ) { }

  signInWithFB(): void {
    const expired = this.authenticationService.isTokenExpired();

    if (expired) {
      this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then((user) => {
        this.authenticationService.getJwtFromFacebookToken(user.authToken).subscribe((jwtData) => {
          // set the token in the authentication service
          this.authenticationService.setToken(jwtData.token);
          this.userService.getMe(jwtData.token).subscribe(x => console.log(x));
        });
      });
    }
  }

  ngOnInit() {
  }

}
