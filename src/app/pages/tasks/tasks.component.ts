import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/core/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html'
})
export class TasksComponent implements OnInit {
  meetingId!: number;
  tasks: any[] = [];
  newTask = { description: '', due_date: '', user_id: '' };

  constructor(private route: ActivatedRoute, private taskService: TaskService) {}

  ngOnInit() {
    this.meetingId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks.filter((t: any) => t.meeting_id === this.meetingId);
    });
  }

  addTask() {
    this.taskService.addTask({ ...this.newTask, meeting_id: this.meetingId }).subscribe(() => {
      this.loadTasks();
      this.newTask = { description: '', due_date: '', user_id: '' };
    });
  }

  updateTask(task: any) {
    this.taskService.updateTask(task.id, task).subscribe(() => {
      console.log('Task updated');
    });
  }

  deleteTask(id: number) {
    if (!confirm('Delete this task?')) return;
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== id);
    });
  }
}
