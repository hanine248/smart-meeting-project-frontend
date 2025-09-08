import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileAttachmentService {
  private apiUrl = 'http://localhost:8000/api'; // adjust to your backend URL

  constructor(private http: HttpClient) {}

  // Get attachments for a meeting
  getAttachments(meetingId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/meetings/${meetingId}/attachments`);
  }

  // Upload file for a meeting
  uploadAttachment(meetingId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('meeting_id', meetingId.toString());
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/attachments`, formData);
  }

  // Delete file by ID
  deleteAttachment(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/attachments/${id}`);
  }
}
