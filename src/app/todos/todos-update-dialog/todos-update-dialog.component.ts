import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { TODO_STATUS } from '../todos.model';
import { FormatTodoStatusPipe } from '../todos.status.pipe';

interface TodosUpdateDialogData {
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

  TODO_STATUS = Object.keys(TODO_STATUS);

  dialogTitle = signal(this.dialogData?.dialogTitle || 'Create');
  todoTitle = signal(this.dialogData?.todoTitle || '');
  todoDescription = signal(this.dialogData?.todoDescription || '');
  todoStatus = signal(this.dialogData?.todoStatus || TODO_STATUS.NOT_STARTED);
}
