import { Component, OnInit } from '@angular/core';
import { MeetingService, Meeting } from '../../core/services/meeting.service';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.css']
})
export class MeetingsComponent implements OnInit {
  meetings: Meeting[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(private meetingService: MeetingService) {}

  ngOnInit(): void {
    this.loadMeetings();
  }

  loadMeetings(): void {
    this.isLoading = true;
    this.meetingService.getMeetings().subscribe({
      next: (meetings) => {
        this.meetings = meetings;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load meetings';
        this.isLoading = false;
        console.error('Error loading meetings:', error);
      }
    });
  }

  deleteMeeting(id: number): void {
    if (confirm('Are you sure you want to delete this meeting?')) {
      this.meetingService.deleteMeeting(id).subscribe({
        next: () => {
          this.loadMeetings(); // Reload the list after deletion
          alert('Meeting deleted successfully!');
        },
        error: (error) => {
          alert('Failed to delete meeting');
          console.error('Error deleting meeting:', error);
        }
      });
    }
  }

  editMeeting(meeting: Meeting): void {
    // You can implement edit functionality here
    // For example, navigate to edit page or open a modal
    console.log('Edit meeting:', meeting);
    alert('Edit functionality will be implemented here');
  }
}