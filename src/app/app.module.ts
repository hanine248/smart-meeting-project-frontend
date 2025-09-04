import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { FullCalendarModule } from '@fullcalendar/angular'; 
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardAdminComponent } from './pages/dashboard-admin/dashboard-admin.component';
import { DashboardGuestComponent } from './pages/dashboard-guest/dashboard-guest.component';
import { DashboardEmployeeComponent } from './pages/dashboard-employee/dashboard-employee.component';
import { PublicLayoutComponent } from './layout/public-layout/public-layout.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { EmployeeLayoutComponent } from './layout/employee-layout/employee-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { ProfileEditComponent } from './pages/profile-edit/profile-edit.component';
import { EmployeeFormComponent } from './pages/employee-form/employee-form.component';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { BookMeetingComponent } from './pages/book-meeting/book-meeting.component';
// ✅ Import EmployeeComponent
import { EmployeesComponent } from './pages/employees/employees.component';
import { MeetingsComponent } from './pages/meetings/meetings.component';
import {ViewMinutesComponent} from './pages/view-minutes/view-minutes.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardAdminComponent,
    DashboardGuestComponent,
    DashboardEmployeeComponent,
    PublicLayoutComponent,
    AdminLayoutComponent,
    EmployeeLayoutComponent,
    RoomsComponent,
    HomeComponent,
    ContactComponent,
    ProfileEditComponent,
    EmployeeFormComponent,
    BookMeetingComponent,
    MeetingsComponent ,
    ViewMinutesComponent,
    // ✅ Add EmployeeComponent here
    EmployeesComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule, 
    ReactiveFormsModule, 
    CommonModule,
    FormsModule,        
    FullCalendarModule  
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
