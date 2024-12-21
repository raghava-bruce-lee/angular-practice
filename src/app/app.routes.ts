import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Welcome',
    data: { title: 'Welcome' },
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
