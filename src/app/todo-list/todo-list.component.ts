import {Component, OnInit} from '@angular/core';
import {TodoDataService} from "../services/todo-data.service";
import {Router} from "@angular/router";
import { Todo } from "../todo";
import {faTrash, faEdit, faPlus} from "@fortawesome/free-solid-svg-icons";
import { DataService } from "src/app/services/data.service";
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { UtilsService } from '../services/utils.service';


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
    private router: Router,
    private utilService: UtilsService
    ) {
    this.todos = this.todoDataService.getAllTodos();
  }

  ngOnInit() {
    this.loadTodos();
  }

  onItemReordered(event: CdkDragDrop<any[]>): void {
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
  }

  deleteTodoConfirm(todo: Todo): void {
    const confirmDelete = confirm(
      `Sind Sie sicher, dass Sie "${todo.title}" löschen möchten?`
    );
    if (confirmDelete) {
      this.deleteTodo(todo);
    }
  }

  deleteTodo(todo: Todo): void {
    if (todo.id) {
      this.todoDataService.deleteTodoById(todo.id);
      this.loadTodos();
    }
  }

  toCreatePage() {
    this.router.navigate(['create']);
  }

  getDate(todo: any) {
    return this.utilService.getDate(todo);
  }

  isToday(todo: Todo) {
    let today = new Date()
      today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    return todo.dueDate === today;
  }

  sortByProperty(prop: string): void {
    this.currentSortOrder = this.currentSortOrder === 'asc' ? 'desc' : 'asc';
    this.todos.sort(this.compareByProperty(prop, this.currentSortOrder));
  }
  
  shorten(property: string) {
    return this.utilService.shorten(property);
  }

  private loadTodos(): void {
    this.todos = this.todoDataService.getAllTodos();
  }

  private compareByProperty(
    prop: string,
    order: 'asc' | 'desc'
  ): (a: Todo, b: Todo) => number {
    return (a: Todo, b: Todo) => {
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
}
