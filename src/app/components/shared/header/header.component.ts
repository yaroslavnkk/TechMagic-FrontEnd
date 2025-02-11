import { Component } from "@angular/core";
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
@Component({
    selector : 'app-header',
    templateUrl : './header.component.html',
    styleUrl : './header.component.css',
    imports: [MatCardModule, MatIconModule]
})

export class HeaderComponent{}