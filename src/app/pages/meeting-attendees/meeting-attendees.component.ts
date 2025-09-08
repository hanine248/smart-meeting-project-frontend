import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MeetingService } from '../../core/services/meeting.service';

@Component({
  selector: 'app-meeting-attendees',
  templateUrl: './meeting-attendees.component.html',
  styleUrls: ['./meeting-attendees.component.css']
})
export class MeetingAttendeesComponent implements OnInit {
  meetingId!: number;
  meeting: any;
  attendees: any[] = [];
  newUserId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private meetingService: MeetingService
  ) {}

  ngOnInit(): void {
    this.meetingId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadMeeting();
  }

  loadMeeting() {
    this.meetingService.getMeetingById(this.meetingId).subscribe((data: any) => {
      this.meeting = data;
      this.attendees = data.attendees || [];
    });
  }

  addAttendee() {
    if (!this.newUserId) return;
    this.meetingService.addAttendee(this.meetingId, this.newUserId).subscribe(() => {
      this.loadMeeting(); // reload list
      this.newUserId = null;
    });
  }
   updateStatus(attendee: any) {
    this.meetingService.updateAttendee(attendee.id, { status: attendee.status }).subscribe(() => {
      console.log('Status updated');
    });
  }

  // ✅ New: delete attendee
  deleteAttendee(attendee: any) {
    if (!confirm(`Delete attendee ${attendee.user.name}?`)) return;
    this.meetingService.deleteAttendee(attendee.id).subscribe(() => {
      this.attendees = this.attendees.filter(a => a.id !== attendee.id);
    });
  }
}








