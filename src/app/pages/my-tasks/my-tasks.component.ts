import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { TaskService, Task } from '../../core/services/task.service';

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.css']
})
export class MyTasksComponent implements OnInit {
  user: any = null;
  myTasks: Task[] = [];
  loading = true;

  constructor(
    private authService: AuthService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(u => {
      this.user = u;
      if (u && u.id !== undefined) {
        this.loadTasks(u.id);
      }
    });
  }

  loadTasks(userId: number) {
    this.taskService.getTasks().subscribe(tasks => {
      this.myTasks = tasks.filter(t => t.user_id === userId);
      this.loading = false;
    });
  }
}
