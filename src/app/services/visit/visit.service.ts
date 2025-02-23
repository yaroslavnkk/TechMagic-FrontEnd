import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Visit } from '../../model/visit.model';

@Injectable({
  providedIn: 'root'
})
export class VisitService {

  private readonly baseUrl = 'http://localhost:4000';

  constructor(private http : HttpClient) { }

  getVisits() : Observable<Visit[]>{
    return this.http.get<Visit[]>(`${this.baseUrl}/visits`).pipe(
      catchError(this.handleError)
    );
  }

  getVisitById(id : string) : Observable<Visit>{
    return this.http.get<Visit>(`${this.baseUrl}/visit/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createVisit(doctor : string, user : string, date : Date, diagnosis : string, treatmentCost : number, finalCost : number) : Observable<Visit>{
    return this.http.post<Visit>(`${this.baseUrl}/visit`, {doctor,user,date,diagnosis,treatmentCost,finalCost}).pipe(
      catchError(this.handleError)
    );
  }

  deleteVisit(id : string){
    return this.http.delete(`${this.baseUrl}/visit/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  updateVisit(id : string, updatedVisit : Visit) : Observable<Visit>{
    return this.http.put<Visit>(`${this.baseUrl}/visit/${id}`, updatedVisit).pipe(
      catchError(this.handleError)
    );
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
