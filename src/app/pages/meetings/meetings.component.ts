import { Component, OnInit } from '@angular/core';
import { MeetingService } from '../../core/services/meeting.service';
import { formatDate } from '@angular/common';
import { RoomService } from '../../core/services/room.service'; // ✅ import room service

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.css']
})
export class MeetingsComponent implements OnInit {
  meetings: any[] = [];
  rooms: any[] = []; // ✅ store all rooms
  editingMeeting: any = null;

  constructor(
    private meetingService: MeetingService,
    private roomService: RoomService // ✅ inject room service
  ) {}

  ngOnInit(): void {
    this.loadMeetings();
    this.loadRooms(); // ✅ also load rooms
  }

  loadMeetings() {
    this.meetingService.getMeetings().subscribe((data: any) => {
      this.meetings = data;
    });
  }

  loadRooms() {
    this.roomService.getRooms().subscribe((data: any) => {
      this.rooms = data;
    });
  }

startEdit(meeting: any) {
  this.editingMeeting = {
    ...meeting,
    duration: this.convertDuration(meeting.duration),
    // If backend gives "08:30:00", slice it down to "08:30"
    time: meeting.time ? meeting.time.substring(0, 5) : null,
    link: meeting.link || null
  };
}

 cancelEdit() {
    this.editingMeeting = null;
  }

saveEdit() {
  if (!this.editingMeeting) return;

  const updated = {
    ...this.editingMeeting,
    date: formatDate(this.editingMeeting.date, 'yyyy-MM-dd', 'en-US'),
    duration: Number(this.editingMeeting.duration),
    room_id: Number(this.editingMeeting.room_id),
    time: this.editingMeeting.time || null,
    link: this.editingMeeting.link || null
  };

  this.meetingService.updateMeeting(this.editingMeeting.id, updated).subscribe({
    next: () => {
      alert('✅ Meeting updated successfully!');
      this.loadMeetings();
      this.editingMeeting = null;
    },
    error: (err) => {
      if (err.status === 409) {
        alert('❌ This room is already booked during this time slot.');
      } else {
        alert('⚠️ An error occurred while updating the meeting.');
      }
    }
  });
}




 

  deleteMeeting(id: number) {
    if (confirm('Are you sure you want to delete this meeting?')) {
      this.meetingService.deleteMeeting(id).subscribe(() => {
        this.loadMeetings();
      });
    }
  }

  addMinutes(meetingId: number) {
    alert('Navigate to Add Minutes page for meeting ID: ' + meetingId);
  }

  viewMinutes(meetingId: number) {
    alert('Navigate to View Minutes page for meeting ID: ' + meetingId);
  }

  // ✅ helper: convert "HH:MM:SS" → total minutes
  private convertDuration(duration: string): number {
    if (!duration) return 0;
    const [hours, minutes] = duration.split(':').map(Number);
    return hours * 60 + minutes;
  }
}
