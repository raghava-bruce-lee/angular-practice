import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Todo } from '../../todos/todos.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  httpClient = inject(HttpClient);

  async fetchTodosWithApi() {
    try {
      const response = await firstValueFrom(this.httpClient.get<{ todos: Todo[] }>('todos'));
      return response.todos;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
