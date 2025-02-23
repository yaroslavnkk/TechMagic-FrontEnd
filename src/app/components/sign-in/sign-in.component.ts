import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/header/header.component';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    CommonModule,
    HeaderComponent,
    RouterModule],
})

export class SignInComponent implements OnInit {
  signInForm!: FormGroup;
  message : string | null = null;

  constructor(private fb: FormBuilder, private authService : AuthService) {
  }
  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    this.authService.login(this.signInForm.value.email, this.signInForm.value.password)
    .subscribe(data => {
      console.log(data)
    },
    error => {
      console.log(error)
    }
  );
  }
}
