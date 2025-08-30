// src/app/core/services/employee.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Employee {
  id: number;
  name: string;
  email: string;
  role_id: number;
  // optional: role?: string;
}

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private usersUrl = '/api/users';
  private registerUrl = '/api/register';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.usersUrl);
  }

  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.usersUrl}/${id}`);
  }

  // ADD via /register — return only the created user, ignore token
 // ADD via /users — only returns the created user
addEmployee(payload: {
  name: string;
  email: string;
  password: string;
  role_id: number;
}): Observable<Employee> {
  return this.http.post<Employee>(this.usersUrl, payload);
}


  // EDIT via /users/:id
  updateEmployee(id: number, payload: Partial<Employee> & { password?: string }): Observable<Employee> {
    return this.http.put<Employee>(`${this.usersUrl}/${id}`, payload);
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.usersUrl}/${id}`);
  }
}
