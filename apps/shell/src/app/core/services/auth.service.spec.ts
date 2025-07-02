import { TestBed } from '@angular/core/testing';
import { Apollo } from 'apollo-angular';
import { of } from 'rxjs';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let apolloSpy: jasmine.SpyObj<Apollo>;

  beforeEach(() => {
    // Create Apollo mock
    const spy = jasmine.createSpyObj('Apollo', ['mutate', 'query']);

    TestBed.configureTestingModule({
      providers: [AuthService, { provide: Apollo, useValue: spy }]
    });

    service = TestBed.inject(AuthService);
    apolloSpy = TestBed.inject(Apollo) as jasmine.SpyObj<Apollo>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Add more tests as needed
});
