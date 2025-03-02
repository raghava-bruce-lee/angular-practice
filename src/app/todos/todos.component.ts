import { AfterViewInit, Component, computed, inject, OnInit, viewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { useTodosStore } from '../core/stores/todos';
import { useSpinnerStore } from '../core/stores/spinner';
import { Todo } from './todos.model';
import { MatDialog } from '@angular/material/dialog';
import { TodosUpdateDialogComponent } from './todos-update-dialog/todos-update-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { DatePipe } from '@angular/common';
import { FormatTodoStatusPipe } from './todos.status.pipe';

@Component({
  selector: 'app-todos',
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    DatePipe,
    FormatTodoStatusPipe
  ],
  templateUrl: './todos.component.html'
})
export class TodosComponent implements OnInit, AfterViewInit {
  readonly spinnerStore = inject(useSpinnerStore);
  readonly todosStore = inject(useTodosStore);
  readonly dialog = inject(MatDialog);

  paginator = viewChild(MatPaginator);
  sort = viewChild(MatSort);

  displayedColumns: string[] = ['title', 'description', 'status', 'createdAt', 'actions'];
  dataSource: MatTableDataSource<Todo>;
  todoList = computed(() => this.todosStore.todos());

  constructor() {
    this.dataSource = new MatTableDataSource(this.todosStore.todos());
  }

  async ngOnInit() {
    await this.todosStore.fetchTodos();
    this.dataSource.data = this.todosStore.todos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator() ?? null;
    this.dataSource.sort = this.sort() ?? null;
  }

  openCreateDialog() {
    this.dialog.open(TodosUpdateDialogComponent, {
      width: '500px'
    });
  }

  openEditDialog(id: string) {
    const todo = this.todosStore.todos().find((todo) => todo._id === id);

    if (todo) {
      this.dialog.open(TodosUpdateDialogComponent, {
        width: '500px',
        data: {
          dialogTitle: 'Edit',
          todoTitle: todo.title,
          todoDescription: todo.description,
          todoStatus: todo.status
        }
      });
    }
  }

  openDeleteConfirmDialog(id: string) {
    console.log(id);
  }
}
