import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';

import { MovieDetailsComponent } from './movie-details.component';
import { FeaturedMovieComponent } from 'src/app/shared/components/featured-movie/featured-movie.component';
import { CarouselComponent } from 'src/app/shared/components/carousel/carousel.component';

import { MockComponent, MockModule, MockProvider } from 'ng-mocks';
import { BehaviorSubject, of } from 'rxjs';
import { EmptyStateComponent } from 'src/app/shared/components/empty-state/empty-state.component';
import { DiscoverService } from 'src/app/core/services/discover/discover.service';
import { SIMILAR_MOCK } from 'src/app/shared/mocks/similar.mock';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;
  let discoverService: DiscoverService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieDetailsComponent, MockComponent(FeaturedMovieComponent), MockComponent(CarouselComponent), MockComponent(EmptyStateComponent)],
      imports: [HttpClientTestingModule, MockModule(FontAwesomeModule)],
      providers: [
        MockProvider(FaIconLibrary),
        DiscoverService,
        Router,
        { provide: ActivatedRoute, useValue: { params: of({ id: 12345 } ) }}
      ]
    });

    discoverService = TestBed.inject(DiscoverService);
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get id param from URL', () => {
    const movieIdSpy = spyOn(component.movieId$, 'next');

    component.onGetParams();

    expect(movieIdSpy).toHaveBeenCalledTimes(1);
  });

  it('should be called getSimilarByMovie from DiscoverService', () => {
    const getSimilarByMovieSpy = spyOn(discoverService, 'getSimilarByMovie').and.callThrough();

    component.onGetSimiliar();

    expect(getSimilarByMovieSpy).toHaveBeenCalledWith(12345);
    expect(getSimilarByMovieSpy).toHaveBeenCalledTimes(1);
  });

  it('should be called getReviews from DiscoverService', () => {
    const getReviewsSpy = spyOn(discoverService, 'getReviews').and.callThrough();

    component.onGetReviews();

    expect(getReviewsSpy).toHaveBeenCalledWith(12345);
    expect(getReviewsSpy).toHaveBeenCalledTimes(1);
  });

  it('should be called navigate and movieId$', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const movieIdSpy = spyOn(component.movieId$, 'next');

    component.onSimilarSelected(SIMILAR_MOCK);

    expect(navigateSpy).toHaveBeenCalledWith([`movie/${SIMILAR_MOCK.id}`]);
    expect(movieIdSpy).toHaveBeenCalledWith(SIMILAR_MOCK.id);
  });

  it('should be called navigate and back to home', () => {
    const navigateSpy = spyOn(router, 'navigate');

    component.onBackToHome();

    expect(navigateSpy).toHaveBeenCalledWith(['/home']);
  });
});
