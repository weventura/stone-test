import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AuthenticationInterceptor } from './authentication.interceptor';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

describe('AuthenticationInterceptor', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthenticationInterceptor,
          { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
        ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    const interceptor: AuthenticationInterceptor = TestBed.inject(AuthenticationInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('should receive the token', () => {
    const URL = environment.baseUrl + '/api/data';

    httpClient.get(URL).subscribe();

    const httpRequest = httpTestingController.expectOne({
      method: 'GET',
      url: URL
    });

    httpRequest.flush({});
  });
});
