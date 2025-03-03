import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosConfirmDeleteDialogComponent } from './todos-confirm-delete-dialog.component';

describe('TodosConfirmDeleteDialogComponent', () => {
  let component: TodosConfirmDeleteDialogComponent;
  let fixture: ComponentFixture<TodosConfirmDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodosConfirmDeleteDialogComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TodosConfirmDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
