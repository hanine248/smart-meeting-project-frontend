import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../core/services/task.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.css']
})
export class MyTasksComponent implements OnInit {
  user: any = null;
  myTasks: any[] = [];

  constructor(
    private taskService: TaskService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(u => {
      this.user = u;
      if (u && u.id !== undefined) {
        this.loadMyTasks(u.id);
      }
    });
  }

  loadMyTasks(userId: number) {
    this.taskService.getTasks().subscribe(tasks => {
      this.myTasks = tasks.filter(t => t.user_id === userId);
    });
  }
}
