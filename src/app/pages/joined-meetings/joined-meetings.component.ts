import { Component, OnInit } from '@angular/core';
import { MeetingService } from '../../core/services/meeting.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-joined-meetings',
  templateUrl: './joined-meetings.component.html',
  styleUrls: ['./joined-meetings.component.css']
})
export class JoinedMeetingsComponent implements OnInit {
  user: any = null;
  joinedMeetings: any[] = [];

  constructor(
    private meetingService: MeetingService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(u => {
      this.user = u;
      if (u && u.id !== undefined) {
        this.loadJoinedMeetings(u.id);
      }
    });
  }

  loadJoinedMeetings(userId: number) {
    this.meetingService.getMeetings().subscribe(meetings => {
      this.joinedMeetings = meetings.filter(m =>
        m.attendees?.some((a: any) => a.user_id === userId)
      );
    });
  }
}
