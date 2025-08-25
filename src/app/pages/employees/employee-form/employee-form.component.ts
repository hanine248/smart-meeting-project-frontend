import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, User } from '../../core/services/user.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html'
})
export class EmployeeFormComponent implements OnInit {
  form: Partial<User> = { name: '', email: '' };
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
        next: (user) => this.form = { name: user.name, email: user.email },
        error: (err) => console.error(err)
      });
    }
  }

  save(): void {
    this.saving = true;
    const req = this.editing
      ? this.userService.update(this.id!, this.form)
      : this.userService.create(this.form);

    req.subscribe({
      next: () => {
        this.saving = false;
        this.router.navigate(['/admin/employees']);
      },
      error: (err) => {
        console.error(err);
        this.saving = false;
      }
    });
  }
}
