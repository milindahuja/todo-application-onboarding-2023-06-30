import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TodoListComponent} from './todo-list.component';
import {FontAwesomeTestingModule} from "@fortawesome/angular-fontawesome/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FontAwesomeTestingModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [
        TodoListComponent
      ]
    });
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(TodoListComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h3')?.textContent).toContain(
      'Meine Todos'
    );
  });
});
