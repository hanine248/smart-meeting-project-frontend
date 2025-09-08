import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { MeetingService, Meeting } from '../../core/services/meeting.service';
import { TaskService } from '../../core/services/task.service';

@Component({
  selector: 'app-dashboard-employee',
  templateUrl: './dashboard-employee.component.html',
  styleUrls: ['./dashboard-employee.component.css']
})
export class DashboardEmployeeComponent implements OnInit {
  user: any = null;
  myMeetingsCount = 0;
  joinedMeetingsCount = 0;
  myTasksCount = 0;

  constructor(
    private authService: AuthService,
    private meetingService: MeetingService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(u => {
      this.user = u;
      if (u && u.id !== undefined) {
        this.loadCounts(u.id);
      }
    });
  }

  loadCounts(userId: number) {
    // My Meetings
    this.meetingService.getMeetings().subscribe(meetings => {
      this.myMeetingsCount = meetings.filter(m => m.user_id === userId).length;
      this.joinedMeetingsCount = meetings.filter(m =>
        m.attendees?.some(a => a.user_id === userId)
      ).length;
    });

    // My Tasks
    this.taskService.getTasks().subscribe(tasks => {
      this.myTasksCount = tasks.filter(t => t.user_id === userId).length;
    });
  }
}
