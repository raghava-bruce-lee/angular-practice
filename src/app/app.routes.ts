import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    title: 'Welcome',
    data: { title: 'Welcome' },
    canActivate: [authGuard],
    loadComponent: () =>
      import('../app/welcome-page/welcome-page.component').then((m) => m.WelcomePageComponent)
  },
  {
    path: 'login',
    title: 'Login',
    canActivate: [authGuard],
    loadComponent: () => import('../app/login/login.component').then((m) => m.LoginComponent)
  },
  {
    path: 'todos',
    title: 'Todos',
    canActivate: [authGuard],
    loadComponent: () => import('../app/todos/todos.component').then((m) => m.TodosComponent),
    data: { title: 'Todos' }
  },
  {
    path: '**',
    redirectTo: ''
  }
];
