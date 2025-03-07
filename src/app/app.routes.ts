import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PeopleComponent } from './pages/people/people.component';

export const routes: Routes = [
    {path: "", component:LoginComponent},
    {path: "register", component:RegisterComponent},
    {path: "home", component:PeopleComponent},
];
