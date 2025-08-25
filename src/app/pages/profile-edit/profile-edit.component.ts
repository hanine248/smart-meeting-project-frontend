import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

type UpdatePayload = {
  name?: string;
  email?: string;
  password?: string; // optional; send only if changing
};

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html'
})
export class ProfileEditComponent implements OnInit {
  // bound to the form
  form: { name: string; email: string; password?: string } = { name: '', email: '' };

  // current user (from localStorage)
  currentUser: any = null;

  saving = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const raw = localStorage.getItem('user');
    if (raw) {
      this.currentUser = JSON.parse(raw);
      this.form.name = this.currentUser?.name || '';
      this.form.email = this.currentUser?.email || '';
    }
  }

  updateProfile(): void {
    if (!this.currentUser?.id) return;

    // build payload: do NOT send role_id; send password only if filled
    const payload: UpdatePayload = {
      name: this.form.name,
      email: this.form.email,
    };
    if (this.form.password && this.form.password.trim().length > 0) {
      payload.password = this.form.password.trim();
    }

    this.saving = true;
    this.http.put<any>(`/api/users/${this.currentUser.id}`, payload).subscribe({
      next: (res) => {
        // backend returns updated user (with role loaded if you used ->load('role'))
        localStorage.setItem('user', JSON.stringify(res));
        this.currentUser = res;
        this.form.password = ''; // clear password field
        this.saving = false;
        alert('Profile updated successfully ✅');
      },
      error: (err) => {
        console.error(err);
        this.saving = false;
        alert('Update failed ❌');
      }
    });
  }
}
