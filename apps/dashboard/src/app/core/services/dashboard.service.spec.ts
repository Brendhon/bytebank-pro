import { TestBed } from '@angular/core/testing';
import { Apollo } from 'apollo-angular';
import { DashboardService } from './dashboard.service';

describe('DashboardService', () => {
  let service: DashboardService;

  beforeEach(() => {
    // Create Apollo mock
    const apolloSpy = jasmine.createSpyObj('Apollo', ['mutate', 'query']);

    TestBed.configureTestingModule({
      providers: [DashboardService, { provide: Apollo, useValue: apolloSpy }]
    });
    service = TestBed.inject(DashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
