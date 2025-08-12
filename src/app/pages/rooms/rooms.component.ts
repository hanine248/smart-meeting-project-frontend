import { Component } from '@angular/core';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html'
})
export class RoomsComponent {
  showRoom = false;
  showMeeting = false;
  openRoom(){ this.showRoom = true; }
  closeRoom(){ this.showRoom = false; }
  openMeeting(){ this.showMeeting = true; }
  closeMeeting(){ this.showMeeting = false; }
}
