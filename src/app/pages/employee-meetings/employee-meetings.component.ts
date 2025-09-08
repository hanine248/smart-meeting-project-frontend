import { Component, OnInit } from '@angular/core';
import { MeetingService, Meeting } from 'src/app/core/services/meeting.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-employee-meetings',
  templateUrl: './employee-meetings.component.html',
  styleUrls: ['./employee-meetings.component.css']
})
export class EmployeeMeetingsComponent implements OnInit {
  meetings: (Meeting & { isSubscribed?: boolean })[] = [];
  user: any = null;
  loading = false;

  constructor(
    private meetingService: MeetingService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // get user first, then load meetings so we can compute isSubscribed reliably
    this.authService.currentUser$.subscribe(u => {
      this.user = u;
      this.loadMeetings();
    });
  }

  loadMeetings(): void {
    this.loading = true;
    this.meetingService.getMeetings().subscribe({
      next: (res) => {
        // compute subscription based on attendees array returned by backend
        this.meetings = res.map(m => ({
          ...m,
          isSubscribed: !!m.attendees?.some((a: any) => a.user_id === this.user?.id)
        }));
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load meetings', err);
        this.loading = false;
      }
    });
  }

  toggleSubscription(meeting: Meeting & { isSubscribed?: boolean }): void {
    if (!this.user) {
      alert('Please log in to subscribe to meetings.');
      return;
    }

    if (meeting.isSubscribed) {
      // Unsubscribe
      this.meetingService.unsubscribe(meeting.id).subscribe({
        next: () => {
          meeting.isSubscribed = false;
          // remove attendee from local attendees (if present)
          if (Array.isArray(meeting.attendees)) {
            meeting.attendees = meeting.attendees.filter((a: any) => a.user_id !== this.user.id);
          }
        },
        error: (err) => {
          console.error('Unsubscribe error', err);
          alert('Failed to unsubscribe.');
        }
      });
    } else {
      // Subscribe
      this.meetingService.subscribe(meeting.id).subscribe({
        next: (res: any) => {
          meeting.isSubscribed = true;
          // backend likely returns created MeetingAttendee — optimistic update:
          if (!Array.isArray(meeting.attendees)) meeting.attendees = [];
          meeting.attendees.push({ user_id: this.user.id, meeting_id: meeting.id });
        },
        error: (err) => {
          if (err.status === 409) {
            alert('Already subscribed');
            meeting.isSubscribed = true;
          } else {
            console.error('Subscribe error', err);
            alert('Failed to subscribe');
          }
        }
      });
    }
  }
}

