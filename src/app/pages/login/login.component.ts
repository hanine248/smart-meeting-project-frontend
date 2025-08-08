import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form = { email: '', password: '' };

  constructor(private router: Router) {}

  login() {
    console.log('Login attempt:', this.form);
    // For now, just go to dashboard
    this.router.navigate(['/dashboard-admin']);
  }
}
