import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupCreateComponent } from './group-create/group-create.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent,
  canActivate: [AuthenticationGuard],
}, {
  path: 'groups',
  component: GroupListComponent,
  canActivate: [AuthenticationGuard],
}, {
  path: 'groups/create',
  component: GroupCreateComponent,
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
