import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoFormComponent } from './todo-form.component';
import { TodoDataService } from '../services/todo-data.service';
import { of } from 'rxjs';
import { Todo } from '../todo';

describe('TodoFormComponent', () => {
  let component: TodoFormComponent;
  let fixture: ComponentFixture<TodoFormComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let todoDataService: TodoDataService;

  const mockActivatedRoute = {
    paramMap: of({ get: () => '1' }), // Provide a sample ID for testing.
  };

  const mockTodoDataService = jasmine.createSpyObj('TodoDataService', ['createTodo', 'updateTodo']);

  beforeEach(waitForAsync(() => {
    // Define the routerSpy and configure it to return a Promise for navigate
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    routerSpy.navigate.and.returnValue(Promise.resolve(true)); // Use Promise.resolve

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FontAwesomeTestingModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [TodoFormComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: routerSpy }, // Provide the routerSpy here
        { provide: TodoDataService, useValue: mockTodoDataService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoFormComponent);
    component = fixture.componentInstance;
    todoDataService = TestBed.inject(TodoDataService);

    // Set up initial form values if needed
    component.createTodoForm.get('title').setValue('Initial Title');
    component.createTodoForm.get('description').setValue('Initial Description');
    component.createTodoForm.get('dueDate').setValue('2023-10-15');
  });

  it('should create a new todo', () => {
    const title = 'Test Task';
    const description = 'Test Description';
    const dueDate = '2023-10-15';

    component.createTodoForm.get('title').setValue(title);
    component.createTodoForm.get('description').setValue(description);
    component.createTodoForm.get('dueDate').setValue(dueDate);

    component.createTodo();

    const expectedTodo: Todo = {
      title,
      description,
      dueDate: new Date(dueDate),
    };

    expect(mockTodoDataService.createTodo).toHaveBeenCalledWith(expectedTodo);

    // Ensure that the router navigation Promise is resolved
    fixture.whenStable().then(() => {
      expect(routerSpy.navigate).toHaveBeenCalledWith(['']);
    });
  });
});
