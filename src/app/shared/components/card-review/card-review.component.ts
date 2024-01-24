import { Component, Input } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Review } from 'src/app/core/interfaces/review.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-card-review',
  templateUrl: './card-review.component.html',
  styleUrls: ['./card-review.component.scss']
})
export class CardReviewComponent {
  @Input() review!: Review;

  readonly baseImageUrl = environment.baseImageUrl;

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }

  onGetInitialsName(name: string): string{
    return `${name[0]}`.toUpperCase();
  }

  
  onFormatRate(rate: number): string {
    return Number(rate).toFixed(1);
  }
}
