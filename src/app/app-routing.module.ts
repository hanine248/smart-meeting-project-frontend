import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardAdminComponent } from './pages/dashboard-admin/dashboard-admin.component';
import { DashboardGuestComponent } from './pages/dashboard-guest/dashboard-guest.component';
import { DashboardEmployeeComponent } from './pages/dashboard-employee/dashboard-employee.component';
import { PublicLayoutComponent } from './layout/public-layout/public-layout.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { EmployeeLayoutComponent } from './layout/employee-layout/employee-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { EmployeesComponent } from './pages/employees/employees.component' ;
import { MeetingsComponent } from './pages/meetings/meetings.component' ;
import { RoomsComponent } from './pages/rooms/rooms.component' ;
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { ProfileEditComponent } from './pages/profile-edit/profile-edit.component';
import { EmployeeFormComponent } from './pages/employee-form/employee-form.component';

const routes: Routes = [
  // Public site
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'login', component: LoginComponent },
    ]
  },

  // Admin area
{
  path: 'admin',
  component: AdminLayoutComponent,
  canActivate: [AuthGuard, RoleGuard],
  data: { adminOnly: true },          // only admins
  children: [
    { path: 'dashboard', component: DashboardAdminComponent },
    { path: 'employees', component: EmployeesComponent },
    { path: 'rooms', component: RoomsComponent },
    { path: 'meetings', component: MeetingsComponent },
    { path: 'profile', component: ProfileEditComponent },
    { path: 'employees/add', component: EmployeeFormComponent },
    { path: 'employees/edit/:id', component: EmployeeFormComponent },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },


  ]
},
{
  path: 'emp',
  component: EmployeeLayoutComponent,
  canActivate: [AuthGuard, RoleGuard],
  data: { roles: [2, 3, 'employee', 'guest'] },   // adjust to your role model
  children: [
    { path: 'dashboard', component: DashboardEmployeeComponent },
   
   { path: 'employee-form', component: EmployeeFormComponent },         // Add employee
  { path: 'employee-form/:id', component: EmployeeFormComponent },
     { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  ]
},



  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
