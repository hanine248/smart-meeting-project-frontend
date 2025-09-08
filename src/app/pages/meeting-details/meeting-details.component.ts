import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MeetingService, Meeting } from 'src/app/core/services/meeting.service';
import { MinutesService } from 'src/app/core/services/minutes.service';
import { FileAttachmentService } from 'src/app/core/services/file-attachment.service';
import { TaskService } from 'src/app/core/services/task.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-meeting-details',
  templateUrl: './meeting-details.component.html',
  styleUrls: ['./meeting-details.component.css']
})
export class MeetingDetailsComponent implements OnInit {
  meetingId!: number;
  meeting?: Meeting;
  minutes: any[] = [];
  attachments: any[] = [];
  myTasks: any[] = [];
  user: any;

  constructor(
    private route: ActivatedRoute,
    private meetingService: MeetingService,
    private minutesService: MinutesService,
    private attachmentService: FileAttachmentService,
    private taskService: TaskService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.meetingId = +this.route.snapshot.paramMap.get('id')!;
    this.authService.currentUser$.subscribe(u => {
      this.user = u;
      this.loadMeeting();
      this.loadMinutes();
      this.loadAttachments();
      this.loadTasks();
    });
  }

  loadMeeting() {
    this.meetingService.getMeeting(this.meetingId).subscribe({
      next: res => this.meeting = res,
      error: err => console.error(err)
    });
  }

  loadMinutes() {
    this.minutesService.getMinutesByMeeting(this.meetingId).subscribe({
      next: res => this.minutes = res,
      error: err => console.error(err)
    });
  }

  loadAttachments() {
    this.attachmentService.getAttachments(this.meetingId).subscribe({
      next: res => this.attachments = res,
      error: err => console.error(err)
    });
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: res => {
        // filter only tasks for this user and meeting
        this.myTasks = res.filter(
          t => t.user_id === this.user?.id && t.meeting_id === this.meetingId
        );
      },
      error: err => console.error(err)
    });
  }
}
