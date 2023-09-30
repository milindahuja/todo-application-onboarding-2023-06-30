import { Component } from '@angular/core';
import { Todo } from "src/app/todo";
import { Router } from "@angular/router";
import { getTodoFromString } from "src/app/data.service";

@Component({
  selector: 'todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.scss']
})
export class TodoDetailsComponent {

  public todo: Todo;

  constructor(
    private router: Router
  ) {
    const url = this.router.url.split('/')
    const id = url[url.length - 1];
    const todos = window.localStorage.getItem('todos');
    if (todos) {
      let arr = todos.split('----');
      let t = arr.find(t => t.split('///')[0] === id);
      this.todo = getTodoFromString(t)
    }
  }

}
