import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export interface Task {
  id: number;
  user_id: number;
  meeting_id: number;
  description: string;
  due_date: string; // e.g. "2025-09-15"
  created_at?: string;
  updated_at?: string;
  meeting?: { id: number; title: string }; // if you eager-load meeting
}


// For creating a new task (no id, timestamps)
export type CreateTaskDto = Omit<Task, 'id' | 'created_at' | 'updated_at' | 'meeting'>;
@Injectable({ providedIn: 'root' }) 

export class TaskService {
  private apiUrl = 'http://localhost:8000/api/tasks';

  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get<any[]>(this.apiUrl);
  }

  addTask(task: any) {
    return this.http.post(this.apiUrl, task);
  }

  updateTask(id: number, task: any) {
    return this.http.put(`${this.apiUrl}/${id}`, task);
  }

  deleteTask(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
