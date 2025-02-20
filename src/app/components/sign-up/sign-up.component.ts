import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HeaderComponent } from '../shared/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule,
     FormsModule,
      CommonModule,
      MatFormFieldModule,
      MatInputModule,
      HeaderComponent,
      MatButtonModule,
      MatCardModule,
      RouterOutlet],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;
  ngOnInit(): void {
    this.signUpForm = this.fb.group({
        firstName : ['', Validators.required],
        middleName : ['', Validators.required],
        lastName : ['', Validators.required],
        birthDate : ['', Validators.required],
        email : ['', [Validators.required, Validators.email]],
        password : ['', [Validators.required, Validators.minLength(6)]]
    });

  }
  constructor(private fb : FormBuilder, private authService : AuthService){}

  onSubmit(){
    if(this.signUpForm.valid){
    this.authService.register(this.signUpForm.value.firstName,
       this.signUpForm.value.middleName,
       this.signUpForm.value.lastName,
       this.signUpForm.value.birthDate,
       this.signUpForm.value.email,
       this.signUpForm.value.password
      ).subscribe(
        data => {
          console.log(data)
        },
        error => {
          console.log(error)
        }
      );
    }
    }

}
