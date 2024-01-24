import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DiscoverService } from 'src/app/core/services/discover/discover.service';
import { GenresService } from 'src/app/core/services/genres/genres.service';
import { FeaturedMovieComponent } from 'src/app/shared/components/featured-movie/featured-movie.component';
import { MockComponent } from 'ng-mocks';
import { CarouselComponent } from 'src/app/shared/components/carousel/carousel.component';
import { EmptyStateComponent } from 'src/app/shared/components/empty-state/empty-state.component';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { DISCOVER_MOVIE_MOCK } from 'src/app/shared/mocks/discover-movie.mock';
import { DiscoverMovie } from 'src/app/core/interfaces/discover-movie.interface';
import { Genre } from 'src/app/core/interfaces/genre.interface';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let discoverService: DiscoverService;
  let genresService: GenresService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent, MockComponent(FeaturedMovieComponent), MockComponent(CarouselComponent), MockComponent(EmptyStateComponent)],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [DiscoverService, GenresService]
    });

    discoverService = TestBed.inject(DiscoverService);
    genresService = TestBed.inject(GenresService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be called onGetDiscoverMovies and onGetGenres methods in OnInit', () => {
    const onGetDiscoverMoviesSpy = spyOn(component, 'onGetDiscoverMovies');
    const onGetGenresSpy = spyOn(component, 'onGetGenres');

    component.ngOnInit();

    expect(onGetGenresSpy).toHaveBeenCalledTimes(1);
    expect(onGetDiscoverMoviesSpy).toHaveBeenCalledTimes(1);
  });

  it('should be called movieId$ and discoverMoviesFiltered$ Behavior variables', () => {
    const getMoviesSpy = spyOn(discoverService, 'getMovies').and.returnValue(of({ 
      results: [ DISCOVER_MOVIE_MOCK ],
      page: 1,
      total_pages: 899,
      total_results:1212
    }));

    const movieIdSpy = spyOn(component.movieId$, 'next');
    const discoverMoviesFilteredSpy = spyOn(component.discoverMoviesFiltered$, 'next');

    component.onGetDiscoverMovies();

    expect(getMoviesSpy).toHaveBeenCalledTimes(1);
    expect(movieIdSpy).toHaveBeenCalledTimes(1);
    expect(discoverMoviesFilteredSpy).toHaveBeenCalledTimes(1);
  });

  it('should call onUpdateMoviesBySearch when onSearchListen is called', fakeAsync(() => {
    spyOn(component, 'onUpdateMoviesBySearch');
    
    component.searchValue = 'test';
    component.onSearchListen();

    tick(500);

    expect(component.onUpdateMoviesBySearch).toHaveBeenCalledWith('test');
  }));

  it('should call onUpdateMoviesByEvent when onFilterChanged is called', () => {
    spyOn(component, 'onUpdateMoviesByEvent');

    const genre: Genre = { id: 1, name: 'Action', enable: false };
    component.onFilterChanged(genre);

    expect(component.onUpdateMoviesByEvent).toHaveBeenCalledWith(1);
  });

  it('should update queryParams.page and call onGetDiscoverMovies when onPageChanged is called', () => {
    spyOn(component, 'onGetDiscoverMovies');

    component.onPageChanged(2);

    expect(component.queryParams.page).toBe(2);
    expect(component.onGetDiscoverMovies).toHaveBeenCalled();
  });

  it('should update queryParams.sort_by and call onGetDiscoverMovies when onSelectSort is called', () => {
    spyOn(component, 'onGetDiscoverMovies');
    const event = { target: { value: 'popularity.asc' } };

    component.onSelectSort(event);

    expect(component.queryParams.sort_by).toBe('popularity.asc');
    expect(component.onGetDiscoverMovies).toHaveBeenCalled();
  });

  it('should update discoverMoviesFiltered$ based on genre id when onUpdateMoviesByEvent is called', () => {
    const mockMovies: DiscoverMovie[] = [ DISCOVER_MOVIE_MOCK ];
    const genreId = 12;
    component.discoverMovies = mockMovies;

    component.onUpdateMoviesByEvent(genreId);

    expect(component.discoverMoviesFiltered$.value).toEqual([mockMovies[0]]);
  });

  it('should update discoverMoviesFiltered$ with all movies when genre id is GENRE_DEFAULT_ID when onUpdateMoviesByEvent is called', () => {
    const mockMovies: DiscoverMovie[] = [ DISCOVER_MOVIE_MOCK ];
    component.discoverMovies = mockMovies;

    component.onUpdateMoviesByEvent(component.GENRE_DEFAULT_ID);

    expect(component.discoverMoviesFiltered$.value).toEqual(mockMovies);
  });

  it('should update discoverMoviesFiltered$ based on search value when onUpdateMoviesBySearch is called', () => {
    const mockMovies: DiscoverMovie[] = [ DISCOVER_MOVIE_MOCK ];
    const key = 'vels';

    component.discoverMovies = mockMovies;
    component.onUpdateMoviesBySearch(key);

    expect(component.discoverMoviesFiltered$.value).toEqual([ mockMovies[0] ]);
  });

  it('should update discoverMoviesFiltered$ with all movies when search value is empty when onUpdateMoviesBySearch is called', () => {
    const mockMovies: DiscoverMovie[] = [ DISCOVER_MOVIE_MOCK ];

    component.discoverMovies = mockMovies;
    component.onUpdateMoviesBySearch('');

    expect(component.discoverMoviesFiltered$.value).toEqual(mockMovies);
  });
});
