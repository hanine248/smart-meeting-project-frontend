// src/app/pages/employee-form/employee-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService, Employee } from '../../core/services/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  employeeId!: number;

  // simple roles source; replace by API /api/roles if you have it
  roles = [
    { id: 1, name: 'admin' },
    { id: 2, name: 'employee' }
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role_id: [2, Validators.required],
      password: [''] // required only on ADD
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEdit = true;
        this.employeeId = +id;
        this.loadEmployee(this.employeeId);
      } else {
        this.isEdit = false;
      }
    });
  }

  loadEmployee(id: number): void {
    this.employeeService.getEmployee(id).subscribe({
      next: (emp: Employee) => {
        this.form.patchValue({
          name: emp.name,
          email: emp.email,
          role_id: emp.role_id,
          password: '' // keep empty; optional on edit
        });
      },
      error: (err) => {
        console.error('Error loading employee:', err);
        alert('Failed to load employee');
        this.router.navigate(['/admin/employees']);
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    if (this.isEdit) {
      // Build payload: send password only if user typed one
      const payload: any = {
        name: this.form.value.name,
        email: this.form.value.email,
        role_id: this.form.value.role_id
      };
      if (this.form.value.password && this.form.value.password.trim().length >= 6) {
        payload.password = this.form.value.password.trim();
      }

      this.employeeService.updateEmployee(this.employeeId, payload).subscribe({
        next: () => {
          alert('Employee updated successfully');
          this.router.navigate(['/admin/employees']);
        },
        error: (err) => {
          console.error('Error updating employee:', err);
          alert('Failed to update employee');
        }
      });

    } else {
      // ADD via /register
      const payload = {
        name: this.form.value.name,
        email: this.form.value.email,
        password: this.form.value.password, // required on add
        role_id: this.form.value.role_id
      };

      if (!payload.password || payload.password.length < 6) {
        alert('Password must be at least 6 characters.');
        return;
      }

      this.employeeService.addEmployee(payload).subscribe({
  next: (createdUser: any) => {
    console.log('User created:', createdUser);
    this.router.navigate(['admin/employees']);
  },
  error: (err: any) => {
    console.error('Error registering user:', err);
  }
});

    }
  }

  cancel(): void {
    this.router.navigate(['/admin/employees']);
  }
}

