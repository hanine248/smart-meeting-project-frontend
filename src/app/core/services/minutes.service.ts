import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MinutesService {
  private apiUrl = 'http://127.0.0.1:8000/api'; // adjust base URL

  constructor(private http: HttpClient) {}

  getMinutesByMeeting(meetingId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/meetings/${meetingId}/minutes`);
  }

  getMinute(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/minutes/${id}`);
  }

  addMinute(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/minutes`, data);
  }

  updateMinute(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/minutes/${id}`, data);
  }

  deleteMinute(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/minutes/${id}`);
  }
  uploadAttachment(meetingId: number, file: File) {
  const formData = new FormData();
  formData.append('meeting_id', meetingId.toString());
  formData.append('file', file);

  return this.http.post(`${this.apiUrl}/meetings/${meetingId}/attachments`, formData);
}

getAttachments(meetingId: number) {
  return this.http.get<any[]>(`${this.apiUrl}/meetings/${meetingId}/attachments`);
}

deleteAttachment(id: number) {
  return this.http.delete(`${this.apiUrl}/attachments/${id}`);
}

}
