import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { App } from '@/app';
import { Apollo } from 'apollo-angular';

describe('App', () => {
  beforeEach(async () => {
    // Create Apollo mock
    const apolloSpy = jasmine.createSpyObj('Apollo', ['mutate', 'query']);

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideZonelessChangeDetection(), { provide: Apollo, useValue: apolloSpy }]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });
});
