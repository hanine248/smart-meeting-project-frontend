import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, User } from '../../core/services/user.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html'
})
export class EmployeeFormComponent implements OnInit {
  // simple form model
  form: Partial<User> & { password?: string } = { name: '', email: '' };
  editing = false;
  id?: number;
  saving = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.editing = true;
      this.userService.getById(this.id).subscribe({
        next: (u) => {
          this.form.name = u.name;
          this.form.email = u.email;
          // do not preload password
        },
        error: (e) => console.error(e)
      });
    }
  }

  save(): void {
    this.saving = true;

    // Build payload. If you want to allow changing password only when provided:
    const payload: any = {
      name: this.form.name,
      email: this.form.email
    };
    if (!this.editing && this.form.password) payload.password = this.form.password; // password on create
    if (this.editing && this.form.password) payload.password = this.form.password;  // optional on edit

    const req = this.editing
      ? this.userService.update(this.id!, payload)
      : this.userService.create(payload);

    req.subscribe({
      next: () => {
        this.saving = false;
        this.router.navigate(['/admin/employees']);
      },
      error: (err) => {
        console.error(err);
        this.saving = false;
        alert('Save failed');
      }
    });
  }
}

