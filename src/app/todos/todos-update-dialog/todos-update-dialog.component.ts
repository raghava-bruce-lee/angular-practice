import { Component, Inject, signal } from '@angular/core';
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
  templateUrl: './todos-update-dialog.component.html',
  styleUrl: './todos-update-dialog.component.scss'
})
export class TodosUpdateDialogComponent {
  TODO_STATUS = Object.keys(TODO_STATUS);

  dialogTitle = signal('Create');
  todoTitle = signal('');
  todoDescription = signal('');
  todoStatus = signal(TODO_STATUS.NOT_STARTED);

  constructor(@Inject(MAT_DIALOG_DATA) public data: TodosUpdateDialogData) {
    if (data) {
      this.dialogTitle.set(data.dialogTitle);
      this.todoTitle.set(data.todoTitle);
      this.todoDescription.set(data.todoDescription);
      this.todoStatus.set(data.todoStatus);
    }
  }
}
