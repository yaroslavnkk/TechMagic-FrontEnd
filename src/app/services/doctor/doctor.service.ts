import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Doctor } from '../../model/doctor.model';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {


  private readonly baseUrl = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.baseUrl}/doctors`).pipe(
      catchError(this.handleError)
    );
  }

  getDoctorById(id : string){
    return this.http.get<Doctor>(`${this.baseUrl}/doctor/${id}`).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error : HttpErrorResponse){
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

}
