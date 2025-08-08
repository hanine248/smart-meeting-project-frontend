import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent {
  // Info boxes data (customize values/icons)
  infoBoxes = [
    { title: 'New Orders', value: 150, icon: 'fas fa-shopping-bag', bg: 'bg-info' },
    { title: 'Bounce Rate', value: '53%', icon: 'fas fa-chart-line', bg: 'bg-success' },
    { title: 'User Registrations', value: 44, icon: 'fas fa-user-plus', bg: 'bg-warning' },
    { title: 'Unique Visitors', value: 65, icon: 'fas fa-chart-pie', bg: 'bg-danger' },
  ];

  // Chat data
  messages = [
    { name: 'Alexander Pierce', time: 'Today 2:00 pm', text: "Is this template really free?", me: false },
    { name: 'Me', time: 'Today 2:05 pm', text: "You better believe it!", me: true }
  ];
  chatInput = '';

  // Calendar state
  events: any[] = [
    { title: 'Standup', start: new Date().toISOString().slice(0,10) }
  ];

  meetingForm = { title: '', date: '', time: '' };
  private pendingDate: string | null = null;

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    height: 520,
    events: this.events,
    dateClick: (arg: DateClickArg) => this.onDateClick(arg),
  };

  // Chat
  sendMessage() {
    const txt = this.chatInput?.trim();
    if (!txt) return;
    this.messages.push({ name: 'Me', time: new Date().toLocaleString(), text: txt, me: true });
    this.chatInput = '';
  }

  // Calendar → open “Add Meeting” modal
  onDateClick(arg: DateClickArg) {
    this.pendingDate = arg.dateStr;
    this.meetingForm = { title: '', date: arg.dateStr, time: '' };
    this.openModal();
  }

  saveMeeting() {
    const { title, date, time } = this.meetingForm;
    if (!title || !date) return;

    // Combine date+time if provided
    const startISO = time ? new Date(`${date}T${time}`).toISOString()
                          : new Date(date).toISOString();

    this.events = [...this.events, { title, start: startISO }];
    this.calendarOptions = { ...this.calendarOptions, events: this.events };
    this.closeModal();
  }

  // Simple modal helpers (Bootstrap modal behavior without jQuery)
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
