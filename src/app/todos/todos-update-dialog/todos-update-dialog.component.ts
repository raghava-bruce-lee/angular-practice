import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { TODO_STATUS } from '../todos.model';
import { FormatTodoStatusPipe } from '../todos.status.pipe';
import { useTodosStore } from '../../core/stores/todos';
import { useSpinnerStore } from '../../core/stores/spinner';

interface TodosUpdateDialogData {
  todoId: string;
  dialogTitle: string;
  todoTitle: string;
  todoDescription: string;
  todoStatus: TODO_STATUS;
}

@Component({
  selector: 'app-todos-update-dialog',
  imports: [
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormatTodoStatusPipe
  ],
  templateUrl: './todos-update-dialog.component.html'
})
export class TodosUpdateDialogComponent {
  dialogData = inject<TodosUpdateDialogData>(MAT_DIALOG_DATA);
  todoStore = inject(useTodosStore);
  spinnerStore = inject(useSpinnerStore);

  TODO_STATUS = Object.keys(TODO_STATUS);

  dialogTitle = signal(this.dialogData?.dialogTitle || 'Create');
  todoTitle = signal(this.dialogData?.todoTitle || '');
  todoDescription = signal(this.dialogData?.todoDescription || '');
  todoStatus = signal(this.dialogData?.todoStatus || TODO_STATUS.NOT_STARTED);

  async createTodo() {
    await this.todoStore.createTodo(this.todoTitle(), this.todoDescription(), this.todoStatus());
  }

  async updateTodo() {
    await this.todoStore.updateTodo(
      this.dialogData?.todoId,
      this.todoTitle(),
      this.todoDescription(),
      this.todoStatus()
    );
  }

  async onSubmit() {
    this.spinnerStore.showLoading();

    if (this.dialogTitle() === 'Create') {
      await this.createTodo();
    }
    if (this.dialogTitle() === 'Update') {
      await this.updateTodo();
    }

    this.spinnerStore.hideLoading();
  }
}
