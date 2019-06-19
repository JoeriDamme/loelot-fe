import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  public isLoggedIn(): boolean {
    return !this.authenticationService.isTokenExpired();
  }

  ngOnInit() {
  }

}
