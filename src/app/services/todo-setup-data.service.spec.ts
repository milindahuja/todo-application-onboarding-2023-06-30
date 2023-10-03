import {TestBed} from '@angular/core/testing';

import {TodoSetupDataService} from './todo-setup-data.service';

describe('TodoSetupDataService', () => {
  let service: TodoSetupDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoSetupDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
