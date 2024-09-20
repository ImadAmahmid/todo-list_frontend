import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [() => inject(AuthService).shouldLoggedIn()]
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [() => inject(AuthService).isLoggedIn()]
    },
    {
        path: '**',
        redirectTo: '/login'
    }
];
