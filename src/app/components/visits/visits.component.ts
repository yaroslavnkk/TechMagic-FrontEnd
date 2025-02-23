import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-visits',
  imports: [HeaderComponent, RouterModule, CommonModule],
  templateUrl: './visits.component.html',
  styleUrl: './visits.component.css'
})
export class VisitsComponent {


  // eslint-disable-next-line @typescript-eslint/no-empty-function
  getVisits(){}
}
