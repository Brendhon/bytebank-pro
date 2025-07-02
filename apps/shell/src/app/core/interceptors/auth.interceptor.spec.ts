import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { authInterceptor } from './auth.interceptor';

describe('authInterceptor', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let authServiceMock: any;

  beforeEach(() => {
    // Create mock AuthService with configurable token property
    authServiceMock = { token: null };

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting()
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Verify no outstanding requests
  });

  it('should be created', () => {
    expect(authInterceptor).toBeTruthy();
  });

  it('should not add Authorization header when no token is present', async () => {
    // Arrange: ensure token is null
    authServiceMock.token = null;

    // Act: make an HTTP request
    const requestPromise = firstValueFrom(httpClient.get('/api/data'));

    // Intercept the request
    const req = httpTestingController.expectOne('/api/data');

    // Assert: check that no Authorization header was added
    expect(req.request.headers.has('Authorization')).toBeFalse();

    // Complete the request
    req.flush({ data: 'test' });
    await requestPromise;
  });

  it('should add Authorization header with token when token is present', async () => {
    // Arrange: set token value
    const mockToken = 'test-token';
    authServiceMock.token = mockToken;

    // Act: make an HTTP request
    const requestPromise = firstValueFrom(httpClient.get('/api/data'));

    // Intercept the request
    const req = httpTestingController.expectOne('/api/data');

    // Assert: check that the Authorization header was added with the correct token
    expect(req.request.headers.has('Authorization')).toBeTrue();
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${mockToken}`);

    // Complete the request
    req.flush({ data: 'test' });
    await requestPromise;
  });
});
