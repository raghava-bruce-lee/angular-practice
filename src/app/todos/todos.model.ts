export enum TODO_STATUS {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE'
}

export interface Todo {
  _id: string;
  title: string;
  description: string;
  status: TODO_STATUS;
  createdAt: string;
}
