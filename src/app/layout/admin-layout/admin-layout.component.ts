import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html'
})
export class AdminLayoutComponent implements OnInit {
  ngOnInit(): void {
    document.body.classList.add('hold-transition', 'sidebar-mini');
    document.body.classList.remove('layout-top-nav'); // ensure no top-nav spacing
  }

  toggleSidebar() {
    document.body.classList.toggle('sidebar-collapse');
  }
}
