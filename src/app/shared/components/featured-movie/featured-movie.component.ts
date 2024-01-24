import { Component, Input, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject } from 'rxjs';
import { MovieDetail } from 'src/app/core/interfaces/movie-detail.interface';
import { DiscoverService } from 'src/app/core/services/discover/discover.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-featured-movie',
  templateUrl: './featured-movie.component.html',
  styleUrls: ['./featured-movie.component.scss']
})
export class FeaturedMovieComponent implements OnInit {
  readonly TYPE_VIDEO_TRAILLER = 'Trailer';
  readonly BASE_IMAGE_URL = environment.baseImageUrl;
  readonly YOUTUBE = environment.youtube;

  @Input() movieId!: BehaviorSubject<number | null>;

  movie!: MovieDetail | null;
  traillerId!: string;

  constructor(private discoverService: DiscoverService, library: FaIconLibrary) {
    library.addIconPacks(fas);

    this.movieId = new BehaviorSubject<number | null>(null);
  }

  ngOnInit(): void {
    this.onGetMovieDetail();
    this.onGetVideosByMovie();
  }

  onGetMovieDetail(): void {
    this.movieId.subscribe(id => {
      if (id) {
        this.discoverService.getMovieDetail(id).subscribe({
          next: (response) => {
            this.movie = response;
          }
        });
      }
    });
  }

  onGetVideosByMovie(): void {
    this.movieId.subscribe(id => {
      if (id) {
        this.discoverService.getVideosByMovie(id).subscribe({
          next: (response) => {
            this.traillerId = response.results.filter((video) => video.type === this.TYPE_VIDEO_TRAILLER)[0]?.key;
          }
        });
      }
    });
  }

  onGetDateYear(date: string | undefined) {
    return date ? date.split('-')[0] : null;
  };

  onFormatRate(rate: number | undefined): string {
    return Number(rate).toFixed(1);
  }

  onConvertMinutesToHours(minutes: number | undefined): string {
      if (minutes && minutes > 0) {
          const hours = Math.floor(minutes / 60);
          const minutesRemaining = minutes % 60;

          const formatedHour = `${hours}h ${minutesRemaining}min`;

          return formatedHour;
      }

      return '';
  }

  onWatchTrailler(): void {
    window.open(`${this.YOUTUBE}${this.traillerId}`, '_blank');
  }

  onWatchNow(): void {
    window.open(`${this.movie?.homepage}`, '_blank');
  }
}
