import { Component, OnInit } from '@angular/core';
import { AuthService as SocialAuthService, FacebookLoginProvider } from 'angularx-social-login';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private socialAuthService: SocialAuthService, private authenticationService: AuthenticationService) { }

  signInWithFB(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then((user) => {
      this.authenticationService.getJwtFromFacebookToken(user.authToken).subscribe((jwt) => {
        console.log({
          jwt,
        });
      });
    });
  }

  ngOnInit() {
  }

}
