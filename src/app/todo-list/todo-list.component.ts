import {Component, OnInit} from '@angular/core';
import {TodoDataService} from "../services/todo-data.service";
import {Router} from "@angular/router";
import { Todo } from "../todo";
import {faTrash, faEdit, faPlus} from "@fortawesome/free-solid-svg-icons";
import { DataService } from "src/app/services/data.service";
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


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
  currentSortOrder: 'asc' | 'desc' = 'asc';


  constructor(
    private todoDataService: TodoDataService, 
    private router: Router
    ) {
    this.todos = this.todoDataService.getAllTodos();
  }

  ngOnInit() {
    this.loadTodos();
  }

  onItemReordered(event: CdkDragDrop<any[]>): void {
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
  }

  deleteTodo(todo: Todo) {
    const confirmDelete = confirm(`Sind Sie sicher, dass Sie "${todo.title}" löschen möchten?`);
    if (todo.id && confirmDelete) {
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

  compareByProperty(prop: string, order: 'asc' | 'desc' = 'asc'): (a: any, b: any) => number {
    return (a: any, b: any) => {
      const valueA = a[prop];
      const valueB = b[prop];

      if (order === 'asc') {
        return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
      } else if (order === 'desc') {
        return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
      }

      return 0;
    };
  }

  sortByProperty(prop: string): void {
    if (this.currentSortOrder === 'asc') {
      this.todos = this.todos.sort(this.compareByProperty(prop, 'asc'));
      this.currentSortOrder = 'desc';
    } else {
      this.todos = this.todos.sort(this.compareByProperty(prop, 'desc'));
      this.currentSortOrder = 'asc';
    }
  }
  
  shorten(description: string) {
    if (description.length < 120) return description;
    else return description.substr(0, 120) + '...';
  }
}
