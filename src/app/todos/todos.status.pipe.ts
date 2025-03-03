import { Pipe, PipeTransform } from '@angular/core';
import { TODO_STATUS } from './todos.model';

@Pipe({
  name: 'formatTodoStatus'
})
export class FormatTodoStatusPipe implements PipeTransform {
  transform(status: TODO_STATUS | string): string {
    switch (status) {
      case TODO_STATUS.NOT_STARTED:
        return 'Not Started';
      case TODO_STATUS.IN_PROGRESS:
        return 'In Progress';
      case TODO_STATUS.DONE:
        return 'Done';
      default:
        return status;
    }
  }
}
