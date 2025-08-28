import { Component, OnInit } from '@angular/core';
import { EmployeeService, Employee } from '../../core/services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];
  loading = true;
  error = '';

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        console.log('Employees received:', data);
        this.employees = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading employees:', err);
        this.error = 'Failed to load employees';
        this.loading = false;
      }
    });
  }

  addEmployee(): void {
    this.router.navigate(['/employee-form']); // go to add form
  }

  editEmployee(emp: Employee): void {
    this.router.navigate(['/employee-form', emp.id]); // go to edit form
  }

  deleteEmployee(id: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          alert('Employee deleted successfully');
          this.loadEmployees(); // reload table
        },
        error: (err) => {
          console.error('Error deleting employee:', err);
          alert('Failed to delete employee');
        }
      });
    }
  }
}
