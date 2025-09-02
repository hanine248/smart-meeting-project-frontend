
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

    // Get current user ID from auth service
    this.authService.currentUser$.subscribe(user => {
      this.currentUserId = user?.id || null;
    });

    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      target_audience: [''],
      date: ['', Validators.required],
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
        user_id: this.currentUserId // Use actual user ID instead of hardcoded 1
      };

      console.log("Submitting meeting:", meeting);

      this.meetingService.createMeeting(meeting).subscribe(() => {
        alert('Meeting booked successfully!');
        this.router.navigate(['admin/meetings']);
      });
    } else if (!this.currentUserId) {
      alert('Please log in to book a meeting');
    }
  }
}