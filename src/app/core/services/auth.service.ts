import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, map, switchMap } from 'rxjs/operators'; // <-- add these

export interface AppUser {
  id?: number;
  email?: string;
  role_id?: number;          // normalized numeric role id
  role?: any;                // normalized role name 'admin' | 'employee' | ...
  is_admin?: boolean;        // convenience flag
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _currentUser = new BehaviorSubject<AppUser | null>(null);
  currentUser$: Observable<AppUser | null> = this._currentUser.asObservable();

  constructor(private http: HttpClient) {
    const raw = localStorage.getItem('user');
    if (raw && raw !== 'undefined' && raw !== 'null') {
      try {
        const user = JSON.parse(raw);
        if (user) this._currentUser.next(user);
      } catch {
        localStorage.removeItem('user'); // corrupted value -> clean up
      }
    }
  }
 // core/services/auth.service.ts
login(body: { email: string; password: string }) {
  return this.http
    .post<{ token: string; user: AppUser }>('/api/login', body)
    .pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this._currentUser.next(res.user);
      }),
      map(res => res.user) // <-- observable now emits AppUser
    );
}



  /**
   * Normalize any backend user shape into a predictable one and persist it.
   * Returns the normalized user so callers (login component) can redirect immediately.
   */
  setSession(token: string, user: any): AppUser {
    // candidate fields we might receive from backend
    const ridCandidates = [user?.role_id, user?.roleId, user?.roleID, user?.role?.id, user?.RoleID];
    const rnameCandidates = [user?.role?.name, user?.role, user?.RoleName];

    const role_id_raw = ridCandidates.find(v => v !== undefined && v !== null);
    const role_id = Number(role_id_raw);
    const role_name_raw = rnameCandidates.find(v => v !== undefined && v !== null);
    const role_name = (role_name_raw ?? '').toString().toLowerCase();

    const is_admin = user?.is_admin === true || role_id === 1 || role_name === 'admin';

    const normalized: AppUser = {
      ...user,
      role_id: Number.isFinite(role_id) ? role_id : (is_admin ? 1 : 2),
      role: role_name || (is_admin ? 'admin' : 'employee'),
      is_admin
    };

    // (Optional) one-time debug while stabilizing
    // console.log('[LOGIN DEBUG] backend user:', user);
    // console.log('[LOGIN DEBUG] normalized user:', normalized);

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(normalized));
    this._currentUser.next(normalized);
    return normalized;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this._currentUser.next(null);
  }
}
