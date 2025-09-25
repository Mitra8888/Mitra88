import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
    {path:'', redirectTo:'/login', pathMatch:'full'},
    {path:'login', component:LoginComponent},
    {path:'home', component:HomeComponent},
    {path:'signup', component:SignupComponent},
    { path: '**', redirectTo: '/login' },
    
];
