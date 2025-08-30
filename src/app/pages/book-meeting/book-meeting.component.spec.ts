import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-book-meeting',
  templateUrl: './book-meeting.component.html',
  styleUrls: ['./book-meeting.component.css']
})
export class BookMeetingComponent implements OnInit {
  rooms: any[] = [];
  meeting = {
    title: '',
    description: '',
    target_audience: '',
    date: '',
    duration: 60,
    room_id: null,
    user_id: 1 // for now hardcoded, later get from logged-in admin
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadRooms();
  }

  loadRooms() {
    this.http.get<any[]>('http://127.0.0.1:8000/api/rooms')
      .subscribe(data => {
        this.rooms = data;
      });
  }

  bookMeeting() {
    this.http.post('http://127.0.0.1:8000/api/meetings', this.meeting)
      .subscribe(response => {
        alert('Meeting booked successfully!');
      });
  }
}
