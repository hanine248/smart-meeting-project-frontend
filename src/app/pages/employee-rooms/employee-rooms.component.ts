import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../core/services/room.service';

@Component({
  selector: 'app-employee-rooms',
  templateUrl: './employee-rooms.component.html',
  styleUrls: ['./employee-rooms.component.css']
})
export class EmployeeRoomsComponent implements OnInit {
  rooms: any[] = [];

  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
    this.loadRooms();
  }

  loadRooms() {
    this.roomService.getRooms().subscribe(data => {
      this.rooms = data;
    });
  }
}
