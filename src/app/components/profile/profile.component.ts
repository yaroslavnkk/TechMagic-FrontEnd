import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { RouterModule } from '@angular/router';
import { User } from '../../model/user.model';
import { AuthService } from '../../services/auth/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-profile',
  imports: [HeaderComponent, RouterModule, MatCardModule, MatIconModule, CommonModule, MatListModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
   currentUser : User | null = null;
   constructor( private authService: AuthService){}

   ngOnInit(){
     this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    })
  }

  logout(){
    this.authService.logout();
  }

}
