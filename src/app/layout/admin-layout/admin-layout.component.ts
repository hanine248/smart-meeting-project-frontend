import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // ✅ import Router

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html'
})
export class AdminLayoutComponent implements OnInit {

  constructor(private router: Router) {} // ✅ inject it here

  ngOnInit(): void {
    document.body.classList.add('hold-transition', 'sidebar-mini');
    document.body.classList.remove('layout-top-nav');
  }

 toggleSidebar() {
  document.body.classList.toggle('sidebar-collapse');
}

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']); // ✅ works now
  }
}
