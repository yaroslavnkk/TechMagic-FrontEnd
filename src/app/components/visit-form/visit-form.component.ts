import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { VisitService } from '../../services/visit/visit.service';
import { DoctorService } from '../../services/doctor/doctor.service';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../model/user.model';
import { MatCardModule } from '@angular/material/card';
import { Doctor } from '../../model/doctor.model';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { DiscountCategory } from '../../model/discount.model';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-visit-form',
  imports: [HeaderComponent,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatLabel,
    CommonModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule],
  templateUrl: './visit-form.component.html',
  styleUrl: './visit-form.component.css'
})
export class VisitFormComponent implements OnInit{

  visitForm! : FormGroup;
  currentUser : User | null = null;
  doctors : Doctor[] = [];
  discountCategories: DiscountCategory[] = [
    { name: 'Senior Citizen', discount: 20 },
    { name: 'Child under 12', discount: 15 },
    { name: 'Disabled', discount: 25 },
    { name: 'No Discount', discount: 0 }
  ];
  isEditMode = false;
  visitId!: string;

  constructor(private visitService : VisitService, private route : ActivatedRoute, private router: Router, private doctorService : DoctorService, private fb : FormBuilder, private authService : AuthService){

  }
  calculateTreatmentCost() : number{
    if(this.visitForm.valid){
      const formValues = this.visitForm.value;
      
      let totalCost = formValues.proceduresCost + formValues.medicationsCost;
      
      if (formValues.specialistConsultation) {
        totalCost += 50; 
      }
      return totalCost;
    }
    return 0;
  }
  calculateFinalCost(): number {
    if (this.visitForm.valid) {
      const formValues = this.visitForm.value;
      
      const totalCost = this.calculateTreatmentCost();

      const selectedDiscount = this.discountCategories.find(
        cat => cat.name === formValues.discountCategory
      )?.discount || 0;
      
      const discountAmount = (totalCost * selectedDiscount) / 100;
      const finalCost = totalCost - discountAmount;
      return finalCost;
    }
    return 0;
  }


  ngOnInit() : void{
    this.visitForm = this.fb.group({
      doctor : ['', Validators.required],
      diagnosis : ['', Validators.required],
      proceduresCost : [0, Validators.required],
      medicationsCost : [0, Validators.required],
      discountCategory : ['', Validators.required],
      specialistConsultation : ['', Validators.required]
    });

  this.authService.currentUser.subscribe(
      (user) => this.currentUser = user
    );

  this.doctorService.getDoctors().subscribe(
    (doctors) => this.doctors = doctors
  );
  this.route.paramMap.subscribe((params) => {
    const id = params.get('id');
    if (id) {
      this.isEditMode = true;
      this.visitId = id;
      this.loadVisitData(id);
    }
  });
  }
  loadVisitData(id: string): void {
    this.visitService.getVisitById(id).subscribe((visit) => {
      this.visitForm.patchValue({
        doctor: visit.doctor,
        diagnosis: visit.diagnosis,
        proceduresCost: visit.treatmentCost - 50,
        medicationsCost: 0, 
        discountCategory: '',
        specialistConsultation: false
      });
    });
  }
  onSubmit(){
    if(this.visitForm.valid){
      const dateOfVisit = new Date();
      const treatmentCost = this.calculateTreatmentCost();
      const finalCost = this.calculateFinalCost();
      if (this.isEditMode) {
        this.visitService.updateVisit(this.visitId, {
          doctor: this.visitForm.value.doctor,
          user: this.currentUser!._id,
          date: dateOfVisit,
          diagnosis: this.visitForm.value.diagnosis,
          treatmentCost: treatmentCost,
          finalCost: finalCost,
          _id: `${this.visitId}`
        }).subscribe({
          next: () => this.router.navigate(['/visits']),
          error: (err) => console.error('Error updating visit', err)
        });
      } else {
        this.visitService.createVisit(
          this.visitForm.value.doctor,
          this.currentUser!._id,
          dateOfVisit,
          this.visitForm.value.diagnosis,
          treatmentCost,
          finalCost
        ).subscribe({
          next: () => this.router.navigate(['/visits']),
          error: (err) => console.error('Error creating visit', err)
        });
      }
}
  }
}