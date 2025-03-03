import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Todo, TODO_STATUS } from '../../todos/todos.model';
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

  async createTodoWithApi(title: string, description: string, status: TODO_STATUS) {
    try {
      const response = await firstValueFrom(
        this.httpClient.post<{ todo: Todo }>('todos', { title, description, status })
      );
      return response.todo;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async updateTodoWithApi(id: string, title: string, description: string, status: TODO_STATUS) {
    try {
      const response = await firstValueFrom(
        this.httpClient.put<{ todo: Todo }>(`todos/${id}`, { title, description, status })
      );
      return response.todo;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async deleteTodoWithApi(id: string) {
    try {
      const response = await firstValueFrom(
        this.httpClient.delete<void>(`todos/${id}`, { observe: 'response' })
      );
      return response.status === 200;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
