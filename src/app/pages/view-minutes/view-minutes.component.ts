import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MinutesService } from '../../core/services/minutes.service';
import { FileAttachmentService } from '../../core/services/file-attachment.service';
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
    private minutesService: MinutesService ,
    private fileService: FileAttachmentService
  ) {}


  attachments: any[] = [];
selectedFile: File | null = null;

ngOnInit() {
  this.meetingId = Number(this.route.snapshot.paramMap.get('id'));
  this.loadMinutes();
  this.loadAttachments();
}

loadAttachments() {
  this.minutesService.getAttachments(this.meetingId).subscribe(data => {
    this.attachments = data;
  });
}

onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];
}

uploadAttachment() {
  if (!this.selectedFile) return;

  this.minutesService.uploadAttachment(this.meetingId, this.selectedFile).subscribe(() => {
    this.loadAttachments();
    this.selectedFile = null;
  });
}

deleteAttachment(id: number) {
  if (confirm('Delete this attachment?')) {
    this.minutesService.deleteAttachment(id).subscribe(() => {
      this.attachments = this.attachments.filter(a => a.id !== id);
    });
  }
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
