import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardAdminComponent } from './pages/dashboard-admin/dashboard-admin.component';
import { DashboardGuestComponent } from './pages/dashboard-guest/dashboard-guest.component';
import { DashboardEmployeeComponent } from './pages/dashboard-employee/dashboard-employee.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard-admin', component: DashboardAdminComponent },
  { path: 'dashboard-guest', component: DashboardGuestComponent },
  { path: 'dashboard-employee', component: DashboardEmployeeComponent },
  { path: '**', redirectTo: 'login' } ,// wildcard for unknown routes

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
