import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject } from 'rxjs';
import { Review } from 'src/app/core/interfaces/review.interface';
import { Similar } from 'src/app/core/interfaces/similar.interface';
import { DiscoverService } from 'src/app/core/services/discover/discover.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movieId$!: BehaviorSubject<number | null>;
  reviews: Array<Review> = [];
  similars: Array<Similar> = [];

  constructor(private discoverService: DiscoverService, private activatedRoute: ActivatedRoute, private router: Router, library: FaIconLibrary) {
    this.movieId$ = new BehaviorSubject<number | null>(null);
    library.addIconPacks(fas);
  }

  ngOnInit(): void {
    this.onGetParams();
    this.onGetReviews();
    this.onGetSimiliar();
  }

  onGetParams(): void {
    this.activatedRoute.params.subscribe(params => {
        const { id } = params;
        this.movieId$.next(id);
      }
    );
  }

  onGetSimiliar(): void {
    this.movieId$.subscribe(id => {
      if (id) {
        this.discoverService.getSimilarByMovie(id).subscribe({
          next: (response) => {
            this.similars = response.results;
          },
        });
      }
    });
  }
  
  onGetReviews(): void {
    this.movieId$.subscribe(id => {
      if (id) {
        this.discoverService.getReviews(id).subscribe({
          next: (response) => {
            this.reviews = response.results;
          },
        });
      }
    });
 
  }

  onSimilarSelected(similar: Similar): void {
    this.router.navigate([`movie/${similar.id}`]);
    this.movieId$.next(similar.id);
  }

  onBackToHome(): void {
    this.router.navigate(['/home']);
  }
}
