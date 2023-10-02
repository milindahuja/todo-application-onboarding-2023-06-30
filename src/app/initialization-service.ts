import { Injectable } from '@angular/core';
import { TodoSetupDataService } from './todo-setup-data.service';

@Injectable({
  providedIn: 'root',
})
export class InitializationService {
  constructor(private todoSetupDataService: TodoSetupDataService) {}

  public initializeApp() {
    this.todoSetupDataService.setupTestData();
  }
}
