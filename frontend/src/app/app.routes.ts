import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login').then(m => m.LoginComponent)
  },
  {
    path: 'signup',
    loadComponent: () => import('./components/signup/signup').then(m => m.SignupComponent)
  },
  {
    path: 'employees',
    loadComponent: () => import('./components/employee-list/employee-list').then(m => m.EmployeeListComponent),
    canActivate: [authGuard]
  },
  {
    path: 'employees/add',
    loadComponent: () => import('./components/employee-add/employee-add').then(m => m.EmployeeAddComponent),
    canActivate: [authGuard]
  },
  {
    path: 'employees/:id',
    loadComponent: () => import('./components/employee-view/employee-view').then(m => m.EmployeeViewComponent),
    canActivate: [authGuard]
  },
  {
    path: 'employees/:id/edit',
    loadComponent: () => import('./components/employee-edit/employee-edit').then(m => m.EmployeeEditComponent),
    canActivate: [authGuard]
  },
];