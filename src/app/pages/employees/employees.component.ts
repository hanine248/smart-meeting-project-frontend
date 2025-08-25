import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../../core/services/user.service';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html'
})
export class EmployeesComponent implements OnInit {
  employees: User[] = [];
  loading = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.loading = true;
    this.userService.getAll().subscribe({
      next: (res) => {
        this.employees = res;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  deleteEmployee(id: number): void {
    if (!confirm('Are you sure you want to delete this employee?')) return;
    this.userService.delete(id).subscribe({
      next: () => {
        this.employees = this.employees.filter(u => u.id !== id);
      },
      error: (err) => console.error(err)
    });
  }
}
