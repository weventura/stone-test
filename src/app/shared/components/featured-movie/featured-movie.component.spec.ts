import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedMovieComponent } from './featured-movie.component';
import { MockModule, MockProvider } from 'ng-mocks';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DiscoverService } from 'src/app/core/services/discover/discover.service';
import { MOVIE_DETAILS_MOCK } from '../../mocks/movie-details.mock';
import { MovieDetail } from 'src/app/core/interfaces/movie-detail.interface';
import { of } from 'rxjs';

describe('FeaturedMovieComponent', () => {
  let component: FeaturedMovieComponent;
  let fixture: ComponentFixture<FeaturedMovieComponent>;
  let discoverService: DiscoverService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeaturedMovieComponent],
      imports: [HttpClientTestingModule, MockModule(FontAwesomeModule)],
      providers: [DiscoverService, MockProvider(FaIconLibrary)]
    });
    
    discoverService = TestBed.inject(DiscoverService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedMovieComponent);
    component = fixture.componentInstance;

    component.movieId.next(MOVIE_DETAILS_MOCK.id);
    component.movie = MOVIE_DETAILS_MOCK;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be called onGetMovieDetail and onGetVideosByMovie methods in OnInit', () => {
    const onGetVideosByMovieSpy = spyOn(component, 'onGetVideosByMovie').and.callThrough();
    const onGetMovieDetailSpy = spyOn(component, 'onGetMovieDetail').and.callThrough();

    component.ngOnInit();

    expect(onGetMovieDetailSpy).toHaveBeenCalledTimes(1);
    expect(onGetVideosByMovieSpy).toHaveBeenCalledTimes(1);
  });

  it('should call discoverService.getMovieDetail and update movie property when onGetMovieDetail is called', () => {
    const mockMovieDetail: MovieDetail = MOVIE_DETAILS_MOCK;

    const getMovieDetailSpy = spyOn(discoverService, 'getMovieDetail').and.returnValue(of(mockMovieDetail));

    component.movieId.next(MOVIE_DETAILS_MOCK.id);
    component.onGetMovieDetail();

    expect(getMovieDetailSpy).toHaveBeenCalledWith(MOVIE_DETAILS_MOCK.id);
    expect(component.movie).toEqual(mockMovieDetail);
  });

  it('should get year correctly', () => {
    const date = '2024-10-28';
    const formatteddate = component.onGetDateYear(date);
    
    expect(typeof formatteddate).toBe('string');
    expect(formatteddate).toBe('2024');
  });

  it('should be called open from window event (onWatchTrailler)', () => {
    const openSpy = spyOn(window, 'open');
    const youtubeId = 'yq787huAAASS';
    
    component.traillerId = youtubeId;

    const url = `${component.YOUTUBE}${component.traillerId}`

    component.onWatchTrailler();

    expect(openSpy).toHaveBeenCalledWith(url, '_blank');
  });

  it('should be called open from window event (onWatchNow)', () => {
    const openSpy = spyOn(window, 'open');

    component.onWatchNow();

    expect(openSpy).toHaveBeenCalledWith(component.movie?.homepage, '_blank');
  });

});
