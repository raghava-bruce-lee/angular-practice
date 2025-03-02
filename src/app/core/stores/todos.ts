import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Todo } from '../../todos/todos.model';
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
      }
    };
  })
);
