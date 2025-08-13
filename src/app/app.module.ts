import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // ✅ Add this
import { FullCalendarModule } from '@fullcalendar/angular'; // ✅ Add this

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
    HomeComponent,
    ContactComponent,
 
  ],
  imports: [
    HttpClientModule ,
    BrowserModule,
    AppRoutingModule,
    FormsModule,        // ✅ Add this so [(ngModel)] works in chat + modal forms
    FullCalendarModule  // ✅ Add this so <full-calendar> works
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
