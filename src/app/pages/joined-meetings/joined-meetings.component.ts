import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { MeetingService, Meeting } from '../../core/services/meeting.service';

@Component({
  selector: 'app-joined-meetings',
  templateUrl: './joined-meetings.component.html',
  styleUrls: ['./joined-meetings.component.css']
})
export class JoinedMeetingsComponent implements OnInit {
  user: any = null;
  joinedMeetings: Meeting[] = [];
  loading = true;

  constructor(
    private authService: AuthService,
    private meetingService: MeetingService
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
        m.attendees?.some(a => a.user_id === userId)
      );
      this.loading = false;
    });
  }
}
