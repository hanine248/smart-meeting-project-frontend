// core/guards/role.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const userStr = localStorage.getItem('user');
    let user: any = null;
    try { user = userStr ? JSON.parse(userStr) : null; } catch {}

    const roleId   = Number(user?.role_id ?? user?.roleId ?? user?.role?.id);
    const roleName = (user?.role?.name ?? user?.role ?? '').toString().toLowerCase();

    const adminOnly = !!route.data['adminOnly'];
    const roles = route.data['roles'] as (number | string)[] | undefined;

    console.log('[ROLEGUARD]', {
      user,
      roleId,
      roleName,
      adminOnly,
      roles,
      rawLocalStorageUser: userStr
    });

    if (adminOnly) {
      return (roleId === 1 || roleName === 'admin') ? true : this.router.parseUrl('/login?reason=role');
    }
    if (roles?.length) {
      const ok = roles.some(r => r === roleId || r === roleName);
      return ok ? true : this.router.parseUrl('/login?reason=role');
    }
    return true;
  }
}
