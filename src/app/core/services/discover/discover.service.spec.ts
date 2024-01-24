import { TestBed } from '@angular/core/testing';

import { DiscoverService } from './discover.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { QueryParams } from '../../interfaces/discover-movie.interface';
import { environment } from 'src/environments/environment';

describe('DiscoverService', () => {
  let service: DiscoverService;
  let httpTestingController: HttpTestingController;

  const ID = 123;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(DiscoverService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should send a GET request to the getMovies() methodt with the provided query parameters', () => {
    const queryParams: QueryParams = {
      include_adult: false,
      include_video: false,
      language: 'en-US',
      page: 1,
      sort_by: 'popularity.desc',
    };

    service.getMovies(queryParams).subscribe();

    const req = httpTestingController.expectOne(
      `${environment.baseUrl}discover/movie?include_adult=${queryParams.include_adult}&include_video=${queryParams.include_video}&language=${queryParams.language}&page=${queryParams.page}&sort_by=${queryParams.sort_by}`
    );

    expect(req.request.method).toBe('GET');

    req.flush({});
  });

  it('should send a GET request to the getMovieDetail() method', () => {
    service.getMovieDetail(ID).subscribe();

    const req = httpTestingController.expectOne(
      `${environment.baseUrl}movie/${ID}`
    );

    expect(req.request.method).toBe('GET');

    req.flush({});
  });

  it('should send a GET request to the getVideosByMovie() method', () => {
    service.getVideosByMovie(ID).subscribe();

    const req = httpTestingController.expectOne(
      `${environment.baseUrl}movie/${ID}/videos?language=en-US`
    );

    expect(req.request.method).toBe('GET');

    req.flush({});
  });

  it('should send a GET request to the getSimilarByMovie() method', () => {
    service.getSimilarByMovie(ID).subscribe();

    const req = httpTestingController.expectOne(
      `${environment.baseUrl}movie/${ID}/similar`
    );

    expect(req.request.method).toBe('GET');

    req.flush({});
  });

  it('should send a GET request to the getReviews() method', () => {
    service.getReviews(ID).subscribe();

    const req = httpTestingController.expectOne(
      `${environment.baseUrl}movie/${ID}/reviews`
    );

    expect(req.request.method).toBe('GET');

    req.flush({});
  });
});
