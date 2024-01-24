import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Similar } from 'src/app/core/interfaces/similar.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-similar-card',
  templateUrl: './similar-card.component.html',
  styleUrls: ['./similar-card.component.scss']
})
export class SimilarCardComponent {
  readonly BASE_IMAGE_URL = environment.baseImageUrl;
  
  @Output() event = new EventEmitter<Similar>();
  @Input() similar!: Similar;

  onEvent(): void {
    this.event.emit(this.similar);
  }
}
