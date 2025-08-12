import { Component } from '@angular/core';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html'
})
export class MeetingsComponent {
  show = false;
  openModal(){ this.show = true; }
  closeModal(){ this.show = false; }
}
