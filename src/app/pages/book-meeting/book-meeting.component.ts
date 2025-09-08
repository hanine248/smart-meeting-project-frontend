
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MeetingService } from '../../core/services/meeting.service';
import { AuthService } from '../../core/services/auth.service'; // Import AuthService
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-book-meeting',
  templateUrl: './book-meeting.component.html',
})
export class BookMeetingComponent implements OnInit {
  form!: FormGroup;
  roomId!: number;
  currentUserId: number | null = null; // Add this

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private meetingService: MeetingService,
    private authService: AuthService, // Inject AuthService
    private router: Router
  ) {}

  ngOnInit(): void {
  this.roomId = Number(this.route.snapshot.paramMap.get('roomId'));

  this.authService.currentUser$.subscribe(user => {
    this.currentUserId = user?.id || null;
  });

  this.form = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    target_audience: [''],
    date: ['', Validators.required],
    time: [''],                 // NEW (optional if you want)
    link: [''],                 // NEW (optional)
    duration: ['', Validators.required],
  });
}
submit() {
  if (this.form.valid && this.currentUserId) {
    const meeting = {
      ...this.form.value,
      date: formatDate(this.form.value.date, 'yyyy-MM-dd', 'en-US'),
      duration: Number(this.form.value.duration),
      room_id: this.roomId,
      user_id: this.currentUserId,
      time: this.form.value.time || null,
      link: this.form.value.link || null
    };

    this.meetingService.createMeeting(meeting).subscribe({
      next: () => {
        alert('✅ Meeting booked successfully!');
        this.router.navigate(['admin/meetings']);
      },
      error: (err) => {
        if (err.status === 409) {
          alert('❌ This room is already booked during this time slot.');
        } else {
          alert('⚠️ An error occurred while booking the meeting.');
        }
      }
    });
  } else if (!this.currentUserId) {
    alert('Please log in to book a meeting');
  }
}


}