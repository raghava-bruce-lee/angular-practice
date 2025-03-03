import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Todo, TODO_STATUS } from '../../todos/todos.model';
import { inject } from '@angular/core';
import { TodosService } from '../services/todos.service';

interface TodosState {
  todos: Todo[];
}

const initialState: TodosState = {
  todos: []
};

export const useTodosStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => {
    const todosService = inject(TodosService);

    return {
      async fetchTodos() {
        if (store.todos().length) return;

        const todos = await todosService.fetchTodosWithApi();
        patchState(store, { todos: todos ?? [] });
      },

      async createTodo(title: string, description: string, status: TODO_STATUS) {
        const todo = await todosService.createTodoWithApi(title, description, status);
        if (todo) patchState(store, { todos: [...store.todos(), todo] });
      },

      async updateTodo(id: string, title: string, description: string, status: TODO_STATUS) {
        const updatedTodo = await todosService.updateTodoWithApi(id, title, description, status);
        if (updatedTodo) {
          const todos = store.todos().map((todo) => (todo._id === id ? updatedTodo : todo));
          patchState(store, { todos });
        }
      },

      async deleteTodo(id: string) {
        const success = await todosService.deleteTodoWithApi(id);
        if (success) {
          const todos = store.todos().filter((todo) => todo._id !== id);
          patchState(store, { todos });
        }
      }
    };
  })
);
