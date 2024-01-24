import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardMovieComponent } from './components/card-movie/card-movie.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BubbleFilterComponent } from './components/bubble-filter/bubble-filter.component';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';
import { LoaderComponent } from './components/loader/loader.component';
import { FeaturedMovieComponent } from './components/featured-movie/featured-movie.component';
import { CardReviewComponent } from './components/card-review/card-review.component';
import { SimilarCardComponent } from './components/similar-card/similar-card.component';

const resources = [
  CardMovieComponent,
  CarouselComponent,
  PaginationComponent,
  BubbleFilterComponent,
  EmptyStateComponent,
  LoaderComponent,
  FeaturedMovieComponent,
  CardReviewComponent,
  SimilarCardComponent
];

@NgModule({
  declarations: [...resources],
  exports: [...resources],
  imports: [
    CommonModule,
    FontAwesomeModule
  ]
})
export class SharedModule { }
