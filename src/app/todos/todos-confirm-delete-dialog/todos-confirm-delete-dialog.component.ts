import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { useTodosStore } from '../../core/stores/todos';
import { useSpinnerStore } from '../../core/stores/spinner';

@Component({
  selector: 'app-todos-confirm-delete-dialog',
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './todos-confirm-delete-dialog.component.html'
})
export class TodosConfirmDeleteDialogComponent {
  todoId = inject<{ todoId: string }>(MAT_DIALOG_DATA).todoId;
  todosStore = inject(useTodosStore);
  spinnerStore = inject(useSpinnerStore);

  async onConfirmDelete() {
    this.spinnerStore.showLoading();
    await this.todosStore.deleteTodo(this.todoId);
    this.spinnerStore.hideLoading();
  }
}
