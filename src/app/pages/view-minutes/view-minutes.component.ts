import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MinutesService } from '../../core/services/minutes.service';

@Component({
  selector: 'app-view-minutes',
  templateUrl: './view-minutes.component.html',
  styleUrls: ['./view-minutes.component.css']
})
export class ViewMinutesComponent {
  meetingId!: number;
  minutes: any[] = [];

  // New minute form
  newMinute = { status: 'draft', decision: '', summary: '', note: '' };

  constructor(
    private route: ActivatedRoute,
    private minutesService: MinutesService
  ) {}

  ngOnInit() {
    this.meetingId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadMinutes();
  }

  loadMinutes() {
    this.minutesService.getMinutesByMeeting(this.meetingId).subscribe((data: any[]) => {
      this.minutes = data;
    });
  }

  // Add new minute
  addMinute() {
    const payload = { ...this.newMinute, meeting_id: this.meetingId };
    this.minutesService.addMinute(payload).subscribe(() => {
      this.loadMinutes();
      this.newMinute = { status: 'draft', decision: '', summary: '', note: '' };
    });
  }

  // Edit existing minute inline
  updateMinute(minute: any) {
    this.minutesService.updateMinute(minute.id, minute).subscribe(() => {
      alert('Minute updated successfully');
      this.loadMinutes();
    });
  }

  // Delete minute
  deleteMinute(id: number) {
    if (confirm('Are you sure you want to delete this minute?')) {
      this.minutesService.deleteMinute(id).subscribe(() => {
        this.loadMinutes();
      });
    }
  }
}
