import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html'
})
export class AdminLayoutComponent implements OnInit {

  user: any = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    document.body.classList.add('hold-transition', 'sidebar-mini');
    document.body.classList.remove('layout-top-nav');

    // ✅ Load user from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
  }

  toggleSidebar() {
    document.body.classList.toggle('sidebar-collapse');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
