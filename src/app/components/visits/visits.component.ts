import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-visits',
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './visits.component.html',
  styleUrl: './visits.component.css'
})
export class VisitsComponent {

}
