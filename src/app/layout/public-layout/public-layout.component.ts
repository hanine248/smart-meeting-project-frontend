import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-public-layout',
  templateUrl: './public-layout.component.html'
})
export class PublicLayoutComponent implements OnInit, OnDestroy {
  ngOnInit(): void {
    document.body.classList.add('hold-transition', 'layout-top-nav');
    document.body.classList.remove('sidebar-mini', 'sidebar-collapse');
  }

  ngOnDestroy(): void {
    // optional cleanup if you switch layouts frequently
    document.body.classList.remove('layout-top-nav');
  }
}
