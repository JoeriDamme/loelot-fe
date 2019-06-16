import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationGuard } from './guards/authentication.guard';

const routes: Routes = [{
  path: '',
  component: HomeComponent,
  canActivate: [AuthenticationGuard],
}, {
  path: 'login',
  component: LoginComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
