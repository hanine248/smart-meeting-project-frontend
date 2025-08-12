import { Component } from '@angular/core';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html'
})
export class EmployeesComponent {
  show = false;
  openModal(){ this.show = true; }
  closeModal(){ this.show = false; }
}
