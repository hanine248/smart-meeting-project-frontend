import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Meeting {
  id: number;
  title: string;
  description?: string;
  date: string;        // e.g. "2025-09-01"
  duration: number;    // in minutes
  room_id: number;
  user_id: number;
  created_at?: string;
  updated_at?: string;
}

// ✅ For POST requests → no id, created_at, updated_at
export type CreateMeetingDto = Omit<Meeting, 'id' | 'created_at' | 'updated_at'>;

@Injectable({
  providedIn: 'root'
})
export class MeetingService {
  private apiUrl = 'http://127.0.0.1:8000/api/meetings'; // adjust to your backend

  constructor(private http: HttpClient) {}

  // 🔹 Get all meetings
  getMeetings(): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(this.apiUrl);
  }

  // 🔹 Get single meeting
  getMeeting(id: number): Observable<Meeting> {
    return this.http.get<Meeting>(`${this.apiUrl}/${id}`);
  }

  // 🔹 Create meeting (frontend must send user_id)
  createMeeting(meeting: CreateMeetingDto): Observable<Meeting> {
    return this.http.post<Meeting>(this.apiUrl, meeting);
  }

  // 🔹 Update meeting
  updateMeeting(id: number, meeting: Partial<Meeting>): Observable<Meeting> {
    return this.http.put<Meeting>(`${this.apiUrl}/${id}`, meeting);
  }

  // 🔹 Delete meeting
  deleteMeeting(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

