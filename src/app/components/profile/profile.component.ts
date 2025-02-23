import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

}
