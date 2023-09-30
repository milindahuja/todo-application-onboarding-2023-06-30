import {Injectable} from '@angular/core';
import {Todo} from "./todo";
import {DataService} from "src/app/data.service";
import { TodoSetupDataService } from "src/app/todo-setup-data.service";

@Injectable({
  providedIn: 'root'
})
export class TodoDataService extends DataService {

  public todos: Todo[];

  private lastId: number;

  constructor(private todoSetupDataService: TodoSetupDataService) {
    super();
    this.setKey('todos')
    this.lastId = 0;
    this.todos = [];
    this.todoSetupDataService.setupTestData();
  }

  getAllTodos(): Todo[] {
    return this.todos;
  }

  createTodo(todo: Todo) {
    this.lastId += 1;
    todo.id = this.lastId;
    this.todos.push(todo);
    this.items = this.todos;
    this.setCache()
  }

  updateTodo(todo: Todo) {
    if (todo.id) {
      const oldTodo = this.getTodoById(todo.id);
      if (oldTodo) {
        this.deleteTodoById(todo.id);
        this.todos.push(todo);
      }
    }
  }

  getTodoById(id: number): Todo | undefined {
    const todos = this.getCache();
      return todos ? todos.find(todo => todo.id === id)  as unknown as Todo : undefined;
  }

  deleteTodoById(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }


}
