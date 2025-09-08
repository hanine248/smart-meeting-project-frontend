import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Meeting {
  id: number;
  title: string;
  date: string;
  time: string;
  duration: number;
}

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {
  roomId!: number;
  meetings: Meeting[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.roomId = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchMeetings();
  }

  fetchMeetings(): void {
    this.http.get<Meeting[]>(`http://127.0.0.1:8000/api/rooms/${this.roomId}/meetings`)
      .subscribe({
        next: (data) => {
          this.meetings = data;
          this.loading = false;
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        }
      });
  }

goToBookMeeting(): void {
  this.router.navigate(['/admin/book-meeting', this.roomId]);
}

}
