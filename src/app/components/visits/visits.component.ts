import { Component, OnInit } from '@angular/core';
import {  MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Visit } from '../../model/visit.model';
import { VisitService } from '../../services/visit/visit.service';
import { HeaderComponent } from '../shared/header/header.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { DoctorService } from '../../services/doctor/doctor.service';
import { AuthService } from '../../services/auth/auth.service';
import { Doctor } from '../../model/doctor.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  imports : [HeaderComponent, MatFormFieldModule, MatTableModule, MatIconModule, MatPaginatorModule, CurrencyPipe, DatePipe],
  styleUrls: ['./visits.component.css']
})
export class VisitsComponent implements OnInit {
  displayedColumns: string[] = ['doctor', 'user', 'date', 'diagnosis', 'treatmentCost', 'finalCost', 'actions'];
  dataSource!: MatTableDataSource<Visit>;
  
  doctorsMap = new Map<string, string>(); 
  usersMap = new Map<string, string>();


  constructor(
    private visitService: VisitService,
    private doctorService: DoctorService,
    private authService: AuthService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.loadDoctors();
    this.loadUser();
  }

 
  loadDoctors(): void {
    this.doctorService.getDoctors().subscribe({
      next: (doctors) => {
        doctors.forEach((doctor: Doctor) => {
          this.doctorsMap.set(doctor._id, `${doctor.firstName} ${doctor.lastName}`);
        });
        this.loadVisits(); 
      }
    });
  }

  loadUser(): void {
    this.authService.currentUser.subscribe((user) => {
      if (user) {
        this.usersMap.set(user._id, `${user.userFirstName} ${user.userLastName}`);
      }
    });
  }


  loadVisits(): void {
    this.visitService.getVisits().subscribe({
      next: (visits) => {
      
        visits.forEach((visit) => {
          visit.doctor = this.doctorsMap.get(visit.doctor) || 'Unknown Doctor';
          visit.user = this.usersMap.get(visit.user) || 'Unknown User';
        });
        this.dataSource = new MatTableDataSource(visits);
      },
      error: (error) => {
        console.error('Error loading visits:', error);
      }
    });
  }

  deleteVisit(id: string): void {
    if (confirm('Ви впевнені, що хочете видалити запис?')) {
      this.visitService.deleteVisit(id).subscribe({
        next: () => {
          this.loadVisits();
        },
        error: (error) => {
          console.error('Error deleting visit:', error);
        }
      });
    }
  }

  editVisit(visit: Visit): void {
   this.router.navigate(['/edit-visit', visit._id])
  }
}