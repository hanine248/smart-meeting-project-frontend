import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService, Room } from '../../core/services/room.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  rooms: Room[] = [];
  searchId: number | null = null;
  filteredRooms: Room[] = [];
  editingRoom: Room | null = null;
  newRoom: Partial<Room> = { status: '', location: '', feature: '', capacity: 0 };

  constructor(private roomService: RoomService, private router: Router) {}

  ngOnInit() {
    this.loadRooms();
  }

  loadRooms(): void {
    this.roomService.getRooms().subscribe(data => {
      this.rooms = data;
      this.filteredRooms = [...this.rooms]; // keep filteredRooms in sync
    });
  }

  filterById(): void {
    if (this.searchId) {
      this.filteredRooms = this.rooms.filter(r => r.id === this.searchId);
    }
  }

  resetFilter(): void {
    this.searchId = null;
    this.filteredRooms = [...this.rooms];
  }

  addRoom(): void {
    this.roomService.createRoom(this.newRoom).subscribe(() => {
      this.loadRooms();
      this.newRoom = { status: '', location: '', feature: '', capacity: 0 }; // reset form
    });
  }

  editRoom(room: Room): void {
    this.editingRoom = { ...room };
  }

  updateRoom(): void {
    if (this.editingRoom) {
      this.roomService.updateRoom(this.editingRoom.id, this.editingRoom).subscribe(() => {
        this.loadRooms();
        this.editingRoom = null;
      });
    }
  }

  deleteRoom(id: number): void {
    if (confirm('Are you sure you want to delete this room?')) {
      this.roomService.deleteRoom(id).subscribe(() => {
        this.loadRooms();
      });
    }
  }

  bookRoom(roomId: number): void {
    this.router.navigate(['admin/book-meeting', roomId]);
  }
}



//import { Component } from '@angular/core';

//@Component({
  //selector: 'app-rooms',
  //templateUrl: './rooms.component.html'
//})
//export class RoomsComponent {
  //showRoom = false;
  //showMeeting = false;
  //openRoom(){ this.showRoom = true; }
  //closeRoom(){ this.showRoom = false; }
  //openMeeting(){ this.showMeeting = true; }
  //closeMeeting(){ this.showMeeting = false; }
//}
