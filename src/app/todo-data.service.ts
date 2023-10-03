import { Injectable } from '@angular/core';
import { Todo } from "./todo";
import { DataService } from "src/app/data.service";
//import { TodoSetupDataService } from "src/app/todo-setup-data.service";

@Injectable({
  providedIn: 'root'
})
export class TodoDataService extends DataService {

  public todos: Todo[];

  //private lastId: number;

  constructor() {
    super();
    this.setKey('todos');
    this.todos = [];
  }

  getAllTodos(): Todo[] {
    return this.todos;
  }

  createTodo(todo: Todo) {
    todo.id = this.generateTodoId();
    this.todos.push(todo);
    this.items = this.todos;
    this.setCache();
  }

  updateTodo(todo: Todo) {
    if (todo.id) {
      const oldTodoIndex = this.todos.findIndex(item => item.id === todo.id);
      if (oldTodoIndex !== -1) {
        this.todos[oldTodoIndex] = todo;
      }
      this.updateCache();
    }
  }

  updateCache() {
    this.items = this.todos;
    this.setCache();
  }

  getTodoById(id: number): Todo | undefined {
    const todos = this.getCache();
    return todos ? todos.find(todo => todo.id === id) as unknown as Todo : undefined;
  }

  deleteTodoById(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.items = this.todos;
    this.updateCache();
  }

  generateTodoId() {
    if (this.todos.length === 0) {
      return null; 
    }
    const largestId = this.todos.reduce((maxId, obj) => {
      return obj.id > maxId ? obj.id : maxId;
    }, -1);

    return largestId+1;
  }
}
