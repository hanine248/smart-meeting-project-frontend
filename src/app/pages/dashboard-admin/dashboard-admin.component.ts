import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { MeetingService, CreateMeetingDto } from '../../core/services/meeting.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent {
  infoBoxes = [
    { title: 'New Orders', value: 150, icon: 'fas fa-shopping-bag', bg: 'bg-info' },
    { title: 'Bounce Rate', value: '53%', icon: 'fas fa-chart-line', bg: 'bg-success' },
    { title: 'User Registrations', value: 44, icon: 'fas fa-user-plus', bg: 'bg-warning' },
    { title: 'Unique Visitors', value: 65, icon: 'fas fa-chart-pie', bg: 'bg-danger' },
  ];

  messages = [
    { name: 'Alexander Pierce', time: 'Today 2:00 pm', text: "Is this template really free?", me: false },
    { name: 'Me', time: 'Today 2:05 pm', text: "You better believe it!", me: true }
  ];
  chatInput = '';

  events: any[] = [];
  meetingForm = { title: '', date: '', time: '', room_id: '', duration: '' };
  private pendingDate: string | null = null;

  currentUserId: number | null = null;  // ✅ store logged-in user id

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    height: 520,
    events: this.events,
    dateClick: (arg: DateClickArg) => this.onDateClick(arg),
    eventClick: (info) => this.onEventClick(info)
  };

  constructor(
    private meetingService: MeetingService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // ✅ Subscribe once to currentUser$
    this.authService.currentUser$.subscribe(user => {
      this.currentUserId = user?.id || null;
    });

    this.loadMeetings();
  }

  loadMeetings() {
    this.meetingService.getMeetings().subscribe((data: any[]) => {
      this.events = data.map(m => ({
        id: m.id,
        title: `Meeting ${m.id} (Room ${m.room_id})`,
        start: m.date,
        backgroundColor: 'red',
        borderColor: 'darkred'
      }));
      this.calendarOptions = { ...this.calendarOptions, events: this.events };
    });
  }

  onDateClick(arg: DateClickArg) {
    this.pendingDate = arg.dateStr;
    this.meetingForm = { title: '', date: '', time: '', room_id: '', duration: '' };
    this.openModal();
  }

 saveMeeting() {
  const { title, date, time, room_id, duration } = this.meetingForm;

  if (!title || !date || !room_id || !duration) return;

  if (!this.currentUserId) {
    alert("Please log in first");
    return;
  }

  const newMeeting: CreateMeetingDto = {
    title,
    description: '',
    date,
    duration: Number(duration),   // ✅ taken from user input
    room_id: Number(room_id),
    user_id: this.currentUserId
  };

  this.meetingService.createMeeting(newMeeting).subscribe(() => {
    this.closeModal();
    this.loadMeetings();
  });
}


  onEventClick(info: any) {
    alert(`Meeting ID: ${info.event.id}\n${info.event.title}`);
  }

  // 🔹 Chat
  sendMessage() {
    const txt = this.chatInput?.trim();
    if (!txt) return;
    this.messages.push({ name: 'Me', time: new Date().toLocaleString(), text: txt, me: true });
    this.chatInput = '';
  }

  // 🔹 Modal controls
  openModal() {
    const el = document.getElementById('addMeetingModal');
    if (el) el.classList.add('show'), (el.style.display = 'block');
  }

  closeModal() {
    const el = document.getElementById('addMeetingModal');
    if (el) el.classList.remove('show'), (el.style.display = 'none');
    this.pendingDate = null;
  }
}
