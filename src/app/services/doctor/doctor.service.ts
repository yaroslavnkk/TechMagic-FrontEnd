import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../../model/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private baseUrl = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.baseUrl}/doctors`);
  }

}
