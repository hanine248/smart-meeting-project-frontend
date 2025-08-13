// src/app/layout/employee-layout/employee-layout.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-layout',
  templateUrl: './employee-layout.component.html'
})
export class EmployeeLayoutComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
    document.body.classList.add('hold-transition', 'sidebar-mini');
    document.body.classList.remove('layout-top-nav');
  }

  togglesidebar() {
    document.body.classList.toggle('sidebar-collapse');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
