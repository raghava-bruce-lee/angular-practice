import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Welcome',
    data: { title: 'Welcome' },
    children: [
      {
        path: 'todos',
        loadComponent: () =>
          import('../app/todos/todos.component').then((m) => m.TodosComponent),
        title: 'Todos',
        data: { title: 'Todos' },
      },
    ],
  },
];
