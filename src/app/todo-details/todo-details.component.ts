import { Component } from '@angular/core';
import { Todo } from "src/app/todo";
import { ActivatedRoute, Router } from "@angular/router";
import { getTodoFromString } from "src/app/data.service";

@Component({
  selector: 'todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.scss']
})
export class TodoDetailsComponent {

  public todo: Todo;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
    const id = this.route.snapshot.params['id'];
    const todos = JSON.parse(window.localStorage.getItem('todos'));
    if (todos) {
      let todoObj = todos.find((item: Todo) => item.id === parseInt(id));
      this.todo = getTodoFromString(todoObj);
    }
  }

  goBack() {
    this.router.navigate(['']);
  }


}
