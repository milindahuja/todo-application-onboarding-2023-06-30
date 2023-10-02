import {Injectable} from '@angular/core';
import {TodoDataService} from "./todo-data.service";
import {Todo} from "./todo";

@Injectable({
  providedIn: 'root'
})
export class TodoSetupDataService {

  constructor(private todoDataService: TodoDataService) {
  }

  public setupTestData() {
    const defaultTodo: Todo = {title: 'Testtask', description: 'Testtask Beschreibung', dueDate: new Date()};
    if(this.todoDataService.getCache() && this.todoDataService.getCache().length){ 
      this.todoDataService.todos = this.todoDataService.getCache() as unknown as Todo[]
    } else {
      this.todoDataService.createTodo(defaultTodo);
    }
  }
}
