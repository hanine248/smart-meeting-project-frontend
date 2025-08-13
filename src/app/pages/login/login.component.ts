import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { AppUser } from '../../core/services/auth.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form = { email: '', password: '' };
  loading = false;
  error = '';

constructor(private auth: AuthService, private router: Router) {}

private isAdmin(user: AppUser | any): boolean {
  const rid = Number(user?.role_id ?? user?.roleId ?? user?.role?.id);
  const rname = String(user?.role?.name ?? user?.role ?? '').toLowerCase();
  return rid === 1 || rname === 'admin' || user?.is_admin === true;
}


// pages/login/login.component.ts
login() {
  this.error = '';
  this.loading = true;

  this.auth.login(this.form).subscribe({
    next: (user) => {
      // redirect by role
      const isAdmin = !!user.is_admin || user.role_id === 1 || (user.role + '').toLowerCase() === 'admin';
      this.router.navigate([isAdmin ? '/admin/dashboard' : '/emp/dashboard']);
    },
    error: (err) => {
      this.error = err?.error?.message || 'Login failed';
      this.loading = false;
    },
    complete: () => (this.loading = false),
  });
}

}
