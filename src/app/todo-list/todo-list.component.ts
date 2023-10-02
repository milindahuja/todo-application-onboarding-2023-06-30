import {Component, OnInit} from '@angular/core';
import {TodoDataService} from "../todo-data.service";
import {Router} from "@angular/router";
import { Todo } from "../todo";
import {faTrash, faEdit, faPlus} from "@fortawesome/free-solid-svg-icons";
import { DataService } from "src/app/data.service";


@Component({
  selector: 'todo-application-onboarding-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  providers: [{provide: DataService}]
})
export class TodoListComponent implements OnInit {

  faPlus = faPlus;
  todos: Todo[];

  faEdit = faEdit;
  faTrash = faTrash;


  constructor(private todoDataService: TodoDataService, private router: Router) {
    this.todos = this.todoDataService.getAllTodos();
  }

  ngOnInit() {
    this.loadTodos();
  }

  deleteTodo(todo: Todo) {
    if (todo.id) {
      this.todoDataService.deleteTodoById(todo.id);
      this.loadTodos();
    }
  }

  toCreatePage() {
    this.router.navigate(['create']);
  }

  private loadTodos() {
    this.todos = this.todoDataService.getAllTodos();
  }

  public getDate(todo: any) {
    return todo.dueDate?.getDate().toString().padStart(2, '0') + '.' + (todo.dueDate?.getMonth() + 1).toString().padStart(2, '0') + '.' + todo?.dueDate?.getFullYear();
  }

  isToday(todo: Todo) {
    let today = new Date()
      today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    return todo.dueDate === today;
  }

  sortByName() {
    this.todos = this.todos.sort((a, b) => a.title > b.title ? 0 : 1);
  }

  sortByDate() {
    this.todos = this.todos.sort((a, b) => {
      if (a.dueDate.getFullYear() - b.dueDate.getFullYear() > 0) return 1;
      if (a.dueDate.getFullYear() - b.dueDate.getFullYear() < 0) return -1;
      if (a.dueDate.getMonth() - b.dueDate.getMonth() > 0) return 1;
      if (a.dueDate.getMonth() - b.dueDate.getMonth() < 0) return -1;
      if (a.dueDate.getDate() - b.dueDate.getDate() > 0) return 1;
      if (a.dueDate.getDate() - b.dueDate.getDate() > 0) return -1;
      return 0;
    })
  }
  shorten(description: string) {
    if (description.length < 120) return description;
    else return description.substr(0, 120) + '...';
  }
}
