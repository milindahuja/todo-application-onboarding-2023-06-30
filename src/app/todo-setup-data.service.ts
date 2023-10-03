import {Injectable} from '@angular/core';
import {TodoDataService} from "./todo-data.service";
import {Todo} from "./todo";
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoSetupDataService {

  constructor(private todoDataService: TodoDataService) {
  }

  public setupTestData(): Observable<void> {
    const defaultTodo: Todo = { title: 'Testtask', description: 'Testtask Beschreibung', dueDate: new Date() };
    
    return this.todoDataService.getCache().pipe(
      switchMap((cacheData: Todo[] | undefined) => {
        if (cacheData && cacheData.length) {
          // If data in cache, update in service
          this.todoDataService.todos = cacheData;
          return of(null);
        } else {
          // else create default todo
          this.todoDataService.createTodo(defaultTodo);
          return of(null);
        }
      })
    );
  }
}
