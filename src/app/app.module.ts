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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardAdminComponent,
    DashboardGuestComponent,
    DashboardEmployeeComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,        // ✅ Add this so [(ngModel)] works in chat + modal forms
    FullCalendarModule  // ✅ Add this so <full-calendar> works
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
