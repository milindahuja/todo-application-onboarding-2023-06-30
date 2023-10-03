import {Component, OnInit} from '@angular/core';
import {TodoDataService} from "../services/todo-data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Todo} from "../todo";
import {faFeather, faTasks, faCalendarDay} from "@fortawesome/free-solid-svg-icons";
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'todo-application-onboarding-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {

  faFeather = faFeather;
  faTasks = faTasks;
  faCalendarDay = faCalendarDay;

  //task form group
  createTodoForm: FormGroup;
  //task id
  private todoId?: number;
  //existing task
  todo?: Todo;

  constructor(
    private todoDataService: TodoDataService, 
    private router: Router, 
    private route: ActivatedRoute,
    private utilsService: UtilsService
    ) {
    this.createTodoForm = new FormGroup(
      {
        title: new FormControl('', [Validators.required]),
        description: new FormControl(''),
        dueDate: new FormControl('', [Validators.required])
      }
    );
  }

  //setup validators and task on init
  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      const param = paramMap.get('todoId');
      if (param) {
        this.todoId = parseInt(param);
        if (this.todoId != null) {
          this.loadTodoById(this.todoId);
        }
      }
    });
  }

  createTodo() {
    if (!this.createTodoForm.valid) {
      return;
    }

    if (this.todo != null) {
      this.updateExistingTodo();
    } else {
      this.createAndNavigateNewTodo();
    }
  }

  //updates a task
  updateTask() {
    if (this.todo) {
      this.todoDataService.updateTodo(this.todo);
      this.router.navigate(['']);
    }
  }

  //navigates to home page
  toHome() {
    this.router.navigate(['']);
  }

  private loadTodoById(id: number) {
    this.todoDataService.getTodoById(id).subscribe((todo) => {
      this.todo = todo;
      this.populateFormWithTodo();
    });
  }

  private populateFormWithTodo() {
    this.createTodoForm.patchValue({
      title: this.todo?.title,
      description: this.todo?.description,
      dueDate: this.utilsService.getDate(this.todo),
    });
  }

  private updateExistingTodo() {
    this.todo.title = this.createTodoForm.get('title')?.value;
    this.todo.description = this.createTodoForm.get('description')?.value;
    const dueDate = this.createTodoForm.get('dueDate')?.value;
    this.todo.dueDate = new Date(dueDate);
    this.updateTask();
  }

  private createAndNavigateNewTodo() {
    const dueDate = this.createTodoForm.get('dueDate')?.value;
    const newTodo: Todo = {
      title: this.createTodoForm.get('title')?.value,
      description: this.createTodoForm.get('description')?.value,
      dueDate: new Date(dueDate),
    };
    this.todoDataService.createTodo(newTodo);
    this.router.navigate(['']);
  }
}
