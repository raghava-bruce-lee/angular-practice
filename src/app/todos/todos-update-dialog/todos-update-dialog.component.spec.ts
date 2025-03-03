import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosUpdateDialogComponent } from './todos-update-dialog.component';

describe('TodosUpdateDialogComponent', () => {
  let component: TodosUpdateDialogComponent;
  let fixture: ComponentFixture<TodosUpdateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodosUpdateDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodosUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
