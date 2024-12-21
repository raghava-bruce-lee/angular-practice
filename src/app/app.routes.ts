import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    title: 'Welcome',
    data: { title: 'Welcome' },
    canActivate: [authGuard],
    children: [
      {
        path: 'login',
        loadComponent: () => import('../app/login/login.component').then((m) => m.LoginComponent),
        title: 'Login'
      },
      {
        path: 'todos',
        loadComponent: () => import('../app/todos/todos.component').then((m) => m.TodosComponent),
        title: 'Todos',
        data: { title: 'Todos' }
      }
    ]
  }
];
