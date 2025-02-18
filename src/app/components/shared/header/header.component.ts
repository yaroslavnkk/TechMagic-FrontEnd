import { Component } from "@angular/core";
import { MatToolbarModule } from '@angular/material/toolbar'
@Component({
    selector : 'app-header',
    templateUrl : './header.component.html',
    styleUrl : './header.component.css',
    imports: [MatToolbarModule]
})

export class HeaderComponent{}