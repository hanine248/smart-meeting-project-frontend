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
 filteredEmployees: any[] = [];
  searchId: number | null = null;

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

   ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe((data: any[]) => {
      this.employees = data;
      this.filteredEmployees = data;
    });
  }

filterEmployees() {
  if (this.searchId != null && this.searchId > 0) {
    this.filteredEmployees = this.employees.filter(emp => emp.id === Number(this.searchId));
  } else {
    this.filteredEmployees = [...this.employees];
  }
}

  
// src/app/pages/employees/employees.component.ts
addEmployee(): void {
  this.router.navigate(['/admin/employees/add']);
}

editEmployee(emp: Employee): void {
  this.router.navigate(['/admin/employees/edit', emp.id]);
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
