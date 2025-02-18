import { Component } from '@angular/core';
import { HeaderComponent } from "./components/shared/header/header.component";
import { SignInComponent } from "./components/sign-in/sign-in.component";

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, SignInComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FrontEnd';
}
