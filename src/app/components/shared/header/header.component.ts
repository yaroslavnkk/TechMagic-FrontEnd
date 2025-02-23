import { Component } from "@angular/core";
import { MatToolbarModule } from '@angular/material/toolbar'
import { AuthService } from "../../../services/auth/auth.service";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { RouterModule } from "@angular/router";
@Component({
    selector : 'app-header',
    templateUrl : './header.component.html',
    styleUrl : './header.component.css',
    imports: [MatToolbarModule, MatIconModule, CommonModule,  MatButtonModule, RouterModule]
})

export class HeaderComponent{
    constructor(public authService : AuthService){}
}