import { Injectable } from '@angular/core';
import { TodoSetupDataService } from './todo-setup-data.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InitializationService {
  constructor(private todoSetupDataService: TodoSetupDataService) {}

  public initializeApp(): Observable<void> {
    return this.todoSetupDataService.setupTestData();
  }
}
