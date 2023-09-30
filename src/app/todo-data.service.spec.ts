import {TestBed} from '@angular/core/testing';

import {TodoDataService} from './todo-data.service';

describe('TodoDataService', () => {
  let service: TodoDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoDataService);
  });

  it('creates an instance', () => {
    expect(service).toBeTruthy();
  });

  it('deletes items', () => {
    service['todos'] = [{id: 0, title: 'test', description: 'test', dueDate: new Date()}];
    service.deleteTodoById(0);
    expect(service['todos'].length).toEqual(0);
  });
});
