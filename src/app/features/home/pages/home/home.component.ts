import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, debounceTime } from 'rxjs';
import { DiscoverMovie, QueryParams } from 'src/app/core/interfaces/discover-movie.interface';
import { Genre } from 'src/app/core/interfaces/genre.interface';
import { DiscoverService } from 'src/app/core/services/discover/discover.service';
import { GenresService } from 'src/app/core/services/genres/genres.service';
import { SORT_BY } from 'src/app/shared/utils/sort-by.util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  discoverMovies!: Array<DiscoverMovie>;
  discoverMoviesFiltered$!: BehaviorSubject<Array<DiscoverMovie>>;
  movieId$!: BehaviorSubject<number | null>;

  readonly GENRE_DEFAULT_ID = 999999;

  genres: Array<Genre> = [
    {
      id: this.GENRE_DEFAULT_ID,
      name: 'All',
      enable: true
    }
  ];

  currentPage = 1;
  totalPages!: number;
  searchValue!: string;

  queryParams: QueryParams = {
    include_adult: false,
    include_video: false,
    language: 'en-US',
    page: 1,
    sort_by: 'popularity.desc'
  }

  sortbyList = SORT_BY;
  loading = false;

  constructor(private discoverService: DiscoverService, private genresService: GenresService) {
    this.discoverMoviesFiltered$ = new BehaviorSubject<Array<DiscoverMovie>>([]);
    this.movieId$ = new BehaviorSubject<number | null>(null);
  }

  ngOnInit(): void {
    this.onGetDiscoverMovies();
    this.onGetGenres();
  }

  onGetDiscoverMovies(): void {
    this.loading = true;
    this.discoverService.getMovies(this.queryParams).subscribe({
      next: (response) => {
        const firstMovie = response.results[0];
        
        this.movieId$.next(firstMovie.id);
        this.discoverMovies = [...response.results];
        this.discoverMoviesFiltered$.next(response.results);
        this.totalPages = response.total_pages;

        this.loading = false;
      },
      error: (err) => this.loading = false,
    });
  }

  onGetGenres(): void {
    this.genresService.getGenres().subscribe({
      next: (response) => this.genres = [...this.genres, ...response.genres],
    });
  }

  onSearchListen(): void {
    this.onSearchObservable()
      .pipe(debounceTime(500))
      .subscribe((value) => {
        this.onUpdateMoviesBySearch(value);
      });
  }

  onSearchObservable(): Observable<string> {
    return new Observable((observer) => {
      observer.next(this.searchValue);
    });
  }

  onPageChanged(page: number): void {
    this.queryParams.page = page;
    this.onGetDiscoverMovies();
  }

  onSelectSort(event: any): void {
    const { value } = event?.target;
    this.queryParams.sort_by = value;

    this.onGetDiscoverMovies();
  }

  onFilterChanged(filter: Genre): void {
    this.genres.map((item: Genre) => item.id === filter.id ? item.enable = true : item.enable = false);

    this.onUpdateMoviesByEvent(filter.id);
  }

  onUpdateMoviesByEvent(id: number): void {
    const filtered = this.discoverMovies.filter((movie: DiscoverMovie) => movie.genre_ids.includes(id));

    id !== this.GENRE_DEFAULT_ID ? this.discoverMoviesFiltered$.next(filtered) : this.discoverMoviesFiltered$.next(this.discoverMovies);
  }

  onUpdateMoviesBySearch(value: string): void {
    const filtered = this.discoverMovies.filter((movie: DiscoverMovie) => movie.title.toLowerCase().includes(value));

    value && value !== '' ? this.discoverMoviesFiltered$.next(filtered) : this.discoverMoviesFiltered$.next(this.discoverMovies);
  }

}
