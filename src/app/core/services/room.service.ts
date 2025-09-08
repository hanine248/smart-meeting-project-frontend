// src/app/services/room.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Meeting {
  id: number;
  date: string;      // e.g. "2025-09-07"
  time: string;      // e.g. "14:00"
  duration: number;  // in minutes
  link?: string;     // optional
}

export interface Room {
  id: number;
  status: string;
  location: string;
  feature?: string;
  capacity: number;
  meetings?: Meeting[];   // 👈 add this
}

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private apiUrl = 'http://localhost:8000/api/rooms'; // adjust backend URL

  constructor(private http: HttpClient) {}

  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.apiUrl);
  }

  createRoom(room: Partial<Room>): Observable<Room> {
    return this.http.post<Room>(this.apiUrl, room);
  }

  updateRoom(id: number, room: Partial<Room>): Observable<Room> {
    return this.http.put<Room>(`${this.apiUrl}/${id}`, room);
  }

  deleteRoom(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
