import { TestBed } from '@angular/core/testing';
import { Apollo } from 'apollo-angular';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    // Create Apollo mock
    const spy = jasmine.createSpyObj('Apollo', ['mutate', 'query']);

    TestBed.configureTestingModule({
      providers: [AuthService, { provide: Apollo, useValue: spy }]
    });

    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Add more tests as needed
});
