import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DiscoverMovie } from 'src/app/core/interfaces/discover-movie.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-card-movie',
  templateUrl: './card-movie.component.html',
  styleUrls: ['./card-movie.component.scss']
})
export class CardMovieComponent {
  @Input() movie!: DiscoverMovie;

  readonly baseImageUrl = environment.baseImageUrl;

  constructor(private router: Router) {}

  onGetDateYear(date: string): string {
    return date.split('-')[0];
  }

  onNavigateToDetails(): void {
    this.router.navigate([`movie/${this.movie.id}`]);
  }
}
