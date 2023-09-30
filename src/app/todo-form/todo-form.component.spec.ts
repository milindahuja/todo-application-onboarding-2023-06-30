import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TodoFormComponent} from './todo-form.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {FontAwesomeTestingModule} from "@fortawesome/angular-fontawesome/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('TodoFormComponent', () => {
  let component: TodoFormComponent;
  let fixture: ComponentFixture<TodoFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FontAwesomeTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        TodoFormComponent
      ]
    });
    fixture = TestBed.createComponent(TodoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
