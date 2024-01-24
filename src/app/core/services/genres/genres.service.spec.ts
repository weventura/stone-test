import { TestBed } from '@angular/core/testing';

import { GenresService } from './genres.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';

describe('GenresService', () => {
  let service: GenresService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(GenresService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a GET request to the getGenres() method', () => {
    service.getGenres().subscribe();

    const req = httpTestingController.expectOne(
      `${environment.baseUrl}genre/movie/list`
    );

    expect(req.request.method).toBe('GET');

    req.flush({});
  });
});
