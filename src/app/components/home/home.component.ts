import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { AuthService } from '../../services/auth/auth.service';
import { Doctor } from '../../model/doctor.model';
import { DoctorService } from '../../services/doctor/doctor.service';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [HeaderComponent, CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  doctors: Doctor[] = [];

  constructor(private doctorService: DoctorService, private authService : AuthService) {}

  ngOnInit() {
    this.loadDoctors();
  }

  loadDoctors() {
    this.doctorService.getDoctors().subscribe(
      (doctors: Doctor[]) => this.doctors = doctors,
      (error: unknown) => console.error('Помилка завантаження лікарів:', error)
    );
  }

  logout() {
    this.authService.logout();
  }
}