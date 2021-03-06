import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  public isLoggedIn(): boolean {
    return !this.authenticationService.isTokenExpired();
  }

  public logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit() {
  }

}
