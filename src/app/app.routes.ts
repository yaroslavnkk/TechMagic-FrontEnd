import { Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
    {path : 'login', component : SignInComponent},
    {path : 'register', component : SignUpComponent},
    {path : 'home', component : HomeComponent, canActivate : [AuthGuard]}
];
